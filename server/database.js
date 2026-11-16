import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomBytes, randomUUID } from 'node:crypto';

const serverDirectory = path.dirname(fileURLToPath(import.meta.url));
const databasePath = path.resolve(process.env.DB_PATH || path.join(serverDirectory, '..', 'data', 'applications.sqlite'));
fs.mkdirSync(path.dirname(databasePath), { recursive: true });

export const database = new Database(databasePath);
database.pragma('journal_mode = WAL');
database.pragma('foreign_keys = ON');
database.pragma('busy_timeout = 5000');
database.exec(`
  CREATE TABLE IF NOT EXISTS applications (
    id TEXT PRIMARY KEY,
    generated_code TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    national_id TEXT NOT NULL,
    date_of_birth TEXT NOT NULL,
    address TEXT NOT NULL,
    parent_name TEXT NOT NULL,
    parent_phone TEXT NOT NULL,
    parent_relationship TEXT NOT NULL,
    course_id TEXT NOT NULL,
    course_name TEXT NOT NULL,
    prior_experience TEXT NOT NULL,
    academic_grade TEXT NOT NULL,
    motivation TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending',
    timestamp TEXT NOT NULL,
    files_count INTEGER NOT NULL DEFAULT 0,
    interview_date TEXT,
    interview_time TEXT,
    admin_email_status TEXT NOT NULL DEFAULT 'not_configured',
    student_email_status TEXT NOT NULL DEFAULT 'not_configured',
    email_error TEXT
  );
  CREATE INDEX IF NOT EXISTS applications_timestamp_idx ON applications(timestamp DESC);
  CREATE INDEX IF NOT EXISTS applications_status_idx ON applications(status);
  CREATE TABLE IF NOT EXISTS application_documents (
    id TEXT PRIMARY KEY,
    application_id TEXT NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    field_name TEXT NOT NULL,
    file_name TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    size INTEGER NOT NULL,
    content BLOB NOT NULL
  );
`);

const listDocuments = database.prepare(`
  SELECT id, field_name AS fieldName, file_name AS fileName, mime_type AS mimeType, size
  FROM application_documents
  WHERE application_id = ?
  ORDER BY rowid
`);

const toApplication = (row) => row ? ({
  id: row.id,
  generatedCode: row.generated_code,
  fullName: row.full_name,
  email: row.email,
  phone: row.phone,
  nationalId: row.national_id,
  dateOfBirth: row.date_of_birth,
  address: row.address,
  parentName: row.parent_name,
  parentPhone: row.parent_phone,
  parentRelationship: row.parent_relationship,
  courseId: row.course_id,
  courseName: row.course_name,
  priorExperience: row.prior_experience,
  academicGrade: row.academic_grade,
  motivation: row.motivation,
  status: row.status,
  timestamp: row.timestamp,
  filesCount: row.files_count,
  interviewDate: row.interview_date || undefined,
  interviewTime: row.interview_time || undefined,
  adminEmailStatus: row.admin_email_status,
  studentEmailStatus: row.student_email_status,
  emailError: row.email_error || '',
  documentsUploaded: listDocuments.all(row.id),
}) : null;

const selectApplication = database.prepare('SELECT * FROM applications WHERE id = ?');

const insertApplication = database.transaction(({ application, documents }) => {
  const id = randomUUID();
  const generatedCode = `VIBIT-${new Date().getFullYear()}-${randomBytes(4).toString('hex').toUpperCase()}`;
  const timestamp = new Date().toISOString();

  database.prepare(`
    INSERT INTO applications (
      id, generated_code, full_name, email, phone, national_id, date_of_birth,
      address, parent_name, parent_phone, parent_relationship, course_id,
      course_name, prior_experience, academic_grade, motivation, status,
      timestamp, files_count
    ) VALUES (
      @id, @generatedCode, @fullName, @email, @phone, @nationalId, @dateOfBirth,
      @address, @parentName, @parentPhone, @parentRelationship, @courseId,
      @courseName, @priorExperience, @academicGrade, @motivation, 'Pending',
      @timestamp, @filesCount
    )
  `).run({
    id,
    generatedCode,
    timestamp,
    filesCount: documents.length,
    ...application,
  });

  const insertDocument = database.prepare(`
    INSERT INTO application_documents (
      id, application_id, field_name, file_name, mime_type, size, content
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  documents.forEach((document) => {
    insertDocument.run(
      randomUUID(),
      id,
      document.fieldName,
      document.originalname,
      document.mimetype,
      document.size,
      document.buffer,
    );
  });

  return toApplication(selectApplication.get(id));
});

export const createApplication = (application, documents) => insertApplication({ application, documents });

export const getApplication = (id) => toApplication(selectApplication.get(id));

export const listApplications = () => {
  const rows = database.prepare('SELECT * FROM applications ORDER BY timestamp DESC').all();
  const documentsByApplication = new Map();
  database.prepare(`
    SELECT application_id AS applicationId, id, field_name AS fieldName,
      file_name AS fileName, mime_type AS mimeType, size
    FROM application_documents
    ORDER BY rowid
  `).all().forEach((document) => {
    const applicationDocuments = documentsByApplication.get(document.applicationId) || [];
    applicationDocuments.push({
      id: document.id,
      fieldName: document.fieldName,
      fileName: document.fileName,
      mimeType: document.mimeType,
      size: document.size,
    });
    documentsByApplication.set(document.applicationId, applicationDocuments);
  });
  return rows.map((row) => ({
    ...toApplication(row),
    documentsUploaded: documentsByApplication.get(row.id) || [],
  }));
};

export const updateApplicationStatus = (id, status, interviewDate, interviewTime) => {
  const result = database.prepare(`
    UPDATE applications SET status = ?, interview_date = ?, interview_time = ?
    WHERE id = ?
  `).run(status, interviewDate || null, interviewTime || null, id);

  if (!result.changes) return null;
  return toApplication(selectApplication.get(id));
};

export const updateEmailStatuses = (id, adminStatus, studentStatus, error) => {
  database.prepare(`
    UPDATE applications
    SET admin_email_status = ?, student_email_status = ?, email_error = ?
    WHERE id = ?
  `).run(adminStatus, studentStatus, error || null, id);
  return getApplication(id);
};

export const getApplicationDocument = (id, documentId) => database.prepare(`
  SELECT file_name AS fileName, mime_type AS mimeType, content
  FROM application_documents
  WHERE application_id = ? AND id = ?
`).get(id, documentId) || null;

export const deleteApplication = (id) => database.prepare('DELETE FROM applications WHERE id = ?').run(id).changes > 0;
