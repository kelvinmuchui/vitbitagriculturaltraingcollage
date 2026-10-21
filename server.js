import 'dotenv/config';
import express from 'express';
import path from 'path';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';

const app = express();
const port = Number(process.env.PORT || 3001);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: '10mb' }));

app.post('/api/application', async (req, res) => {
  try {
    const payload = req.body || {};
    const appData = {
      fullName: payload.fullName || 'Not provided',
      email: payload.email || 'Not provided',
      phone: payload.phone || 'Not provided',
      nationalId: payload.nationalId || 'Not provided',
      dateOfBirth: payload.dateOfBirth || 'Not provided',
      address: payload.address || 'Not provided',
      parentName: payload.parentName || 'Not provided',
      parentPhone: payload.parentPhone || 'Not provided',
      parentRelationship: payload.parentRelationship || 'Not provided',
      courseName: payload.courseName || payload.courseId || 'Not provided',
      courseId: payload.courseId || 'Not provided',
      priorExperience: payload.priorExperience || 'Not provided',
      academicGrade: payload.academicGrade || 'Not provided',
      motivation: payload.motivation || 'Not provided',
      generatedCode: payload.generatedCode || 'Not provided',
      submissionTime: payload.submissionTime || new Date().toISOString(),
    };

    const recipient = process.env.EMAIL_TO || 'vbitschoolofcoffeeagribusiness@gmail.com';
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const host = process.env.EMAIL_HOST || 'smtp.gmail.com';
    const portNumber = Number(process.env.EMAIL_PORT || 587);
    const secure = process.env.EMAIL_SECURE === 'true' || process.env.EMAIL_SECURE === '1';

    if (!user || !pass) {
      return res.status(503).json({
        ok: false,
        error: 'Email server is not configured. Set EMAIL_USER and EMAIL_PASS in the environment to enable automatic email delivery.'
      });
    }

    const transporter = nodemailer.createTransport({
      host,
      port: portNumber,
      secure,
      auth: { user, pass }
    });

    const html = `
      <h2>New VIBIT Admission Application</h2>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <tr><td><strong>Applicant</strong></td><td>${appData.fullName}</td></tr>
        <tr><td><strong>Email</strong></td><td>${appData.email}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${appData.phone}</td></tr>
        <tr><td><strong>National ID</strong></td><td>${appData.nationalId}</td></tr>
        <tr><td><strong>Date of Birth</strong></td><td>${appData.dateOfBirth}</td></tr>
        <tr><td><strong>Address</strong></td><td>${appData.address}</td></tr>
        <tr><td><strong>Parent / Guardian</strong></td><td>${appData.parentName}</td></tr>
        <tr><td><strong>Parent Phone</strong></td><td>${appData.parentPhone}</td></tr>
        <tr><td><strong>Relationship</strong></td><td>${appData.parentRelationship}</td></tr>
        <tr><td><strong>Course</strong></td><td>${appData.courseName}</td></tr>
        <tr><td><strong>Course ID</strong></td><td>${appData.courseId}</td></tr>
        <tr><td><strong>Prior Experience</strong></td><td>${appData.priorExperience}</td></tr>
        <tr><td><strong>Academic Grade</strong></td><td>${appData.academicGrade}</td></tr>
        <tr><td><strong>Motivation</strong></td><td>${appData.motivation}</td></tr>
        <tr><td><strong>Application Code</strong></td><td>${appData.generatedCode}</td></tr>
        <tr><td><strong>Submission Time</strong></td><td>${appData.submissionTime}</td></tr>
      </table>
    `;

    await transporter.sendMail({
      from: `${process.env.EMAIL_FROM || 'VIBIT Admissions'} <${user}>`,
      to: recipient,
      subject: `New VIBIT Admission Application: ${appData.fullName} (${appData.generatedCode})`,
      html,
      text: Object.entries(appData)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n')
    });

    return res.json({ ok: true, message: 'Application email sent successfully.' });
  } catch (error) {
    console.error('Application email failed:', error);
    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown email error'
    });
  }
});

const distDir = path.join(__dirname, 'dist');
app.use(express.static(distDir));
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ ok: false, error: 'Not found' });
  }
  res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`VIBIT server listening on http://localhost:${port}`);
});
