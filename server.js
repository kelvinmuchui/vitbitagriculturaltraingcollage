import 'dotenv/config';
import crypto from 'node:crypto';
import express from 'express';
import multer from 'multer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  createApplication,
  deleteApplication,
  getApplicationDocument,
  listApplications,
  updateApplicationStatus,
  updateEmailStatuses,
} from './server/database.js';

const app = express();
const port = Number(process.env.PORT || 3001);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const allowedStatuses = new Set(['Pending', 'Interview Scheduled', 'Approved', 'Rejected', 'Archived']);
const allowedEmailStatuses = new Set(['sent', 'failed', 'not_configured']);
const activeAdminSessions = new Map();
const loginAttempts = new Map();
const submissionAttempts = new Map();

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

app.use(express.json({ limit: '100kb' }));
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Cache-Control', 'no-store');
  next();
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_UPLOAD_BYTES,
    files: 3,
    fields: 24,
    parts: 27,
    fieldSize: 10 * 1024,
  },
  fileFilter: (_req, file, callback) => {
    const allowedTypes = new Set(['application/pdf', 'image/jpeg', 'image/png']);
    if (!allowedTypes.has(file.mimetype)) {
      callback(new Error('Documents must be PDF, JPG, or PNG files.'));
      return;
    }
    callback(null, true);
  },
});

const isAdminConfigured = () => (
  Boolean(process.env.ADMIN_PASSWORD) &&
  process.env.ADMIN_PASSWORD.length >= 12 &&
  Boolean(process.env.ADMIN_SESSION_SECRET) &&
  process.env.ADMIN_SESSION_SECRET.length >= 32
);

const setAdminCookie = (res, value, maxAge) => {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader(
    'Set-Cookie',
    `vibit_admin=${value}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}${secure}`,
  );
};

const signatureForSession = (expiry, nonce) => crypto
  .createHmac('sha256', process.env.ADMIN_SESSION_SECRET)
  .update(`${expiry}.${nonce}`)
  .digest('hex');

const requireAdmin = (req, res, next) => {
  if (!isAdminConfigured()) {
    return res.status(503).json({ ok: false, error: 'Admin access is not configured on this server.' });
  }

  const cookies = Object.fromEntries(
    (req.headers.cookie || '')
      .split(';')
      .map((cookie) => cookie.trim().split(/=(.*)/s, 2))
      .filter(([name, value]) => name && value !== undefined),
  );
  const [expiry, nonce, signature] = (cookies.vibit_admin || '').split('.');
  const expected = expiry && nonce ? signatureForSession(expiry, nonce) : '';
  const validSignature = signature && expected &&
    signature.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));

  if (
    !validSignature ||
    Number(expiry) <= Date.now() ||
    activeAdminSessions.get(nonce) !== Number(expiry)
  ) {
    return res.status(401).json({
      ok: false,
      configured: true,
      authenticated: false,
      error: 'Please sign in to access the registrar portal.',
    });
  }

  req.adminSessionNonce = nonce;
  next();
};

const isRateLimited = (map, key, limit, windowMs) => {
  const now = Date.now();
  if (map.size > 10000) {
    for (const [entryKey, timestamps] of map) {
      if (!timestamps.some((timestamp) => now - timestamp < windowMs)) map.delete(entryKey);
    }
  }
  const attempts = (map.get(key) || []).filter((timestamp) => now - timestamp < windowMs);
  if (attempts.length >= limit) {
    map.set(key, attempts);
    return true;
  }
  attempts.push(now);
  map.set(key, attempts);
  return false;
};

const validEmail = (email) => (
  typeof email === 'string' &&
  email.length <= 254 &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
);

const validateApplication = (body) => {
  const application = {
    fullName: String(body.fullName || '').trim(),
    email: String(body.email || '').trim().toLowerCase(),
    phone: String(body.phone || '').trim(),
    nationalId: String(body.nationalId || 'To provide on campus').trim(),
    dateOfBirth: String(body.dateOfBirth || 'Not specified').trim(),
    address: String(body.address || 'Kenya').trim(),
    parentName: String(body.parentName || 'Not specified').trim(),
    parentPhone: String(body.parentPhone || 'Not specified').trim(),
    parentRelationship: String(body.parentRelationship || 'Not specified').trim(),
    courseId: String(body.courseId || '').trim(),
    courseName: String(body.courseName || '').trim(),
    priorExperience: String(body.priorExperience || 'none').trim(),
    academicGrade: String(body.academicGrade || 'Open Practical').trim(),
    motivation: String(body.motivation || 'Direct enrollment applicant').trim(),
  };
  const limits = {
    fullName: 120,
    phone: 40,
    nationalId: 80,
    dateOfBirth: 40,
    address: 240,
    parentName: 120,
    parentPhone: 40,
    parentRelationship: 80,
    courseId: 100,
    courseName: 200,
    priorExperience: 80,
    academicGrade: 80,
    motivation: 5000,
  };
  const errors = [];

  if (application.fullName.length < 2) errors.push('Enter your full name.');
  if (!validEmail(application.email)) errors.push('Enter a valid email address for your confirmation.');
  if (application.phone.length < 6 || application.phone.length > limits.phone) errors.push('Enter a valid phone number.');
  if (!application.courseId || !application.courseName) errors.push('Select a course.');

  for (const [field, maxLength] of Object.entries(limits)) {
    if (application[field].length > maxLength) {
      errors.push(`${field} must be ${maxLength} characters or fewer.`);
    }
  }

  return { application, errors };
};

const verifyUploadedFiles = (files) => {
  const signatures = {
    'application/pdf': (buffer) => buffer.subarray(0, 5).toString() === '%PDF-',
    'image/jpeg': (buffer) => buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff,
    'image/png': (buffer) => buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])),
  };

  return files.map((file) => {
    if (!signatures[file.mimetype]?.(file.buffer)) {
      throw new Error(`The file "${file.originalname}" does not match its declared file type.`);
    }
    return {
      ...file,
      fieldName: file.fieldname,
      originalname: path.basename(file.originalname.replace(/\\/g, '/')).replace(/[\r\n"]/g, '').slice(0, 180),
    };
  });
};

app.get('/api/admin/session', (req, res) => {
  if (!isAdminConfigured()) {
    return res.json({ ok: true, configured: false, authenticated: false });
  }
  return requireAdmin(req, res, () => res.json({ ok: true, configured: true, authenticated: true }));
});

app.post('/api/admin/login', (req, res) => {
  if (!isAdminConfigured()) {
    return res.status(503).json({
      ok: false,
      error: 'Admin access is not configured. Set a 12-character ADMIN_PASSWORD and 32-character ADMIN_SESSION_SECRET on the server.',
    });
  }
  if (isRateLimited(loginAttempts, req.ip, 8, 15 * 60 * 1000)) {
    return res.status(429).json({ ok: false, error: 'Too many sign-in attempts. Try again in 15 minutes.' });
  }

  const submittedPassword = typeof req.body?.password === 'string' ? req.body.password : '';
  const configuredPassword = Buffer.from(process.env.ADMIN_PASSWORD);
  const providedPassword = Buffer.from(submittedPassword);
  const validPassword = configuredPassword.length === providedPassword.length &&
    crypto.timingSafeEqual(configuredPassword, providedPassword);

  if (!validPassword) {
    return res.status(401).json({ ok: false, error: 'The admin password is incorrect.' });
  }

  const expiry = Date.now() + 8 * 60 * 60 * 1000;
  const nonce = crypto.randomBytes(24).toString('hex');
  for (const [sessionNonce, sessionExpiry] of activeAdminSessions) {
    if (sessionExpiry <= Date.now()) activeAdminSessions.delete(sessionNonce);
  }
  activeAdminSessions.set(nonce, expiry);
  setAdminCookie(res, `${expiry}.${nonce}.${signatureForSession(expiry, nonce)}`, 8 * 60 * 60);
  return res.json({ ok: true });
});

app.post('/api/admin/logout', requireAdmin, (req, res) => {
  activeAdminSessions.delete(req.adminSessionNonce);
  setAdminCookie(res, '', 0);
  return res.json({ ok: true });
});

app.post(
  '/api/applications',
  (req, res, next) => {
    if (isRateLimited(submissionAttempts, req.ip, 10, 60 * 60 * 1000)) {
      return res.status(429).json({ ok: false, error: 'Too many applications were submitted from this connection. Please contact admissions.' });
    }
    return next();
  },
  upload.fields([
    { name: 'enrollmentFormFile', maxCount: 1 },
    { name: 'idPassportFile', maxCount: 1 },
    { name: 'kcseCertFile', maxCount: 1 },
  ]),
  async (req, res, next) => {
    try {
      const { application, errors } = validateApplication(req.body || {});
      if (errors.length) {
        return res.status(400).json({ ok: false, error: errors.join(' ') });
      }

      const uploadedFiles = Object.values(req.files || {}).flat();
      const documents = verifyUploadedFiles(uploadedFiles);
      const savedApplication = createApplication(application, documents);
      const savedWithPendingEmail = updateEmailStatuses(savedApplication.id, 'pending', 'pending', '');

      return res.status(201).json({
        ok: true,
        application: {
          id: savedWithPendingEmail.id,
          generatedCode: savedWithPendingEmail.generatedCode,
          timestamp: savedWithPendingEmail.timestamp,
          adminEmailStatus: savedWithPendingEmail.adminEmailStatus,
          studentEmailStatus: savedWithPendingEmail.studentEmailStatus,
        },
      });
    } catch (error) {
      return next(error);
    }
  },
);

const saveEmailStatuses = (id, body, res) => {
  const { admin, student, error = '' } = body || {};
  if (!allowedEmailStatuses.has(admin) || !allowedEmailStatuses.has(student) || typeof error !== 'string') {
    return res.status(400).json({ ok: false, error: 'Email delivery statuses are invalid.' });
  }
  const application = updateEmailStatuses(id, admin, student, error.slice(0, 1000));
  if (!application) return res.status(404).json({ ok: false, error: 'Application not found.' });
  return res.json({ ok: true, application });
};

app.patch('/api/applications/:id/email-status', (req, res) => (
  saveEmailStatuses(req.params.id, req.body, res)
));

app.get('/api/admin/applications', requireAdmin, (_req, res) => {
  res.json({ ok: true, applications: listApplications() });
});

app.patch('/api/admin/applications/:id', requireAdmin, (req, res) => {
  const { status, interviewDate, interviewTime } = req.body || {};
  if (!allowedStatuses.has(status)) {
    return res.status(400).json({ ok: false, error: 'Choose a valid application status.' });
  }
  if (status === 'Interview Scheduled' && (!interviewDate || !interviewTime)) {
    return res.status(400).json({ ok: false, error: 'An interview date and time are required.' });
  }
  const application = updateApplicationStatus(req.params.id, status, interviewDate, interviewTime);
  if (!application) return res.status(404).json({ ok: false, error: 'Application not found.' });
  return res.json({ ok: true, application });
});

app.delete('/api/admin/applications/:id', requireAdmin, (req, res) => {
  if (!deleteApplication(req.params.id)) {
    return res.status(404).json({ ok: false, error: 'Application not found.' });
  }
  return res.json({ ok: true });
});

app.patch('/api/admin/applications/:id/email-status', requireAdmin, (req, res) => (
  saveEmailStatuses(req.params.id, req.body, res)
));

app.get('/api/admin/applications/:id/documents/:documentId', requireAdmin, (req, res) => {
  const document = getApplicationDocument(req.params.id, req.params.documentId);
  if (!document) return res.status(404).json({ ok: false, error: 'Document not found.' });
  res.setHeader('Content-Type', document.mimeType);
  res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(document.fileName)}`);
  return res.send(document.content);
});

const distDirectory = path.join(__dirname, 'dist');
app.use(express.static(distDirectory));
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ ok: false, error: 'Not found' });
  }
  return res.sendFile(path.join(distDirectory, 'index.html'));
});

app.use((error, _req, res, _next) => {
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ ok: false, error: 'The request contains invalid JSON.' });
  }
  if (error.type === 'entity.too.large') {
    return res.status(413).json({ ok: false, error: 'The request body is too large.' });
  }
  if (error instanceof multer.MulterError) {
    const status = error.code === 'LIMIT_FILE_SIZE' ? 413 : 400;
    return res.status(status).json({
      ok: false,
      error: error.code === 'LIMIT_FILE_SIZE'
        ? 'Each document must be 5 MB or smaller.'
        : 'The uploaded documents exceeded the allowed upload limits.',
    });
  }
  if (error.message === 'Only PDF, JPG, or PNG files are allowed.') {
    return res.status(400).json({ ok: false, error: error.message });
  }
  if (error.message.startsWith('The file "') || error.message.startsWith('Documents must be')) {
    return res.status(400).json({ ok: false, error: error.message });
  }
  console.error('Unhandled application API error:', error);
  return res.status(500).json({ ok: false, error: 'The application could not be processed. Please try again or contact admissions.' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`VIBIT server listening on port ${port}`);
  if (!isAdminConfigured()) console.warn('Admin portal is locked until ADMIN_PASSWORD and ADMIN_SESSION_SECRET are configured.');
});
