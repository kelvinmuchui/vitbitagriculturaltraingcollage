export const SCHOOL_EMAIL = 'vbitschoolofcoffeeagribusiness@gmail.com';
export const TVET_REG_NUMBER = 'TVATA/PRIVATE/TVC/0158/2026';

export type EmailDeliveryStatus = 'sent' | 'failed' | 'not_configured' | 'pending';

export interface ApplicationEmailData {
  fullName: string;
  email: string;
  phone: string;
  nationalId: string;
  dateOfBirth: string;
  address: string;
  parentName: string;
  parentPhone: string;
  parentRelationship: string;
  courseName: string;
  priorExperience: string;
  academicGrade: string;
  motivation: string;
  generatedCode: string;
  timestamp: string;
  applyMode?: 'quick' | 'full';
  documentNames?: string[];
}

export const extractErrorMessage = (
  error: unknown,
  fallback = 'An unexpected error occurred.',
  depth = 0,
): string => {
  if (depth > 3 || error === null || error === undefined) return fallback;
  if (typeof error === 'string') {
    const trimmed = error.trim();
    return trimmed && trimmed !== '[object Object]' ? trimmed : fallback;
  }
  if (typeof error === 'number' || typeof error === 'boolean') {
    return String(error);
  }
  if (error instanceof Error) {
    const msg = error.message?.trim();
    if (msg && msg !== '[object Object]') return msg;
    if ('cause' in error && error.cause !== undefined) {
      return extractErrorMessage(error.cause, fallback, depth + 1);
    }
    return fallback;
  }
  if (Array.isArray(error)) {
    const parts = error
      .map((item) => extractErrorMessage(item, '', depth + 1))
      .filter(Boolean);
    return parts.length ? parts.join(' ') : fallback;
  }
  if (typeof error === 'object') {
    const record = error as Record<string, unknown>;
    for (const key of ['message', 'error', 'text', 'detail', 'details', 'reason', 'statusText']) {
      if (record[key] !== undefined) {
        const extracted = extractErrorMessage(record[key], '', depth + 1);
        if (extracted) return extracted;
      }
    }
    try {
      const serialized = JSON.stringify(record);
      if (serialized && serialized !== '{}') return serialized;
    } catch {
      // Ignore circular reference errors
    }
  }
  return fallback;
};

export const buildApplicationMailtoHref = (application: ApplicationEmailData): string => {
  const modeLabel = application.applyMode === 'full' ? 'Full Detailed Application' : '1-Minute Quick Apply';
  const subject = `[VIBIT ADMISSION] ${modeLabel}: ${application.fullName} - ${application.courseName} (${application.generatedCode})`;
  const lines = [
    'VIBIT AGRICULTURAL TRAINING COLLEGE - ADMISSION APPLICATION',
    `TVET Authority Reg: ${TVET_REG_NUMBER}`,
    '------------------------------------------------------------',
    `Application Mode: ${modeLabel}`,
    `Admission Code: ${application.generatedCode}`,
    `Submitted At: ${new Date(application.timestamp).toLocaleString()}`,
    '',
    'APPLICANT DETAILS',
    `Full Name: ${application.fullName}`,
    `Phone Number: ${application.phone}`,
    `Email Address: ${application.email}`,
    `Town / Address: ${application.address || 'Not provided'}`,
    `National ID / Passport: ${application.nationalId || 'To provide on campus'}`,
    `Date of Birth: ${application.dateOfBirth || 'Not specified'}`,
    '',
    'PROGRAM & ACADEMICS',
    `Course Selected: ${application.courseName}`,
    `Academic Grade: ${application.academicGrade || 'Open Practical'}`,
    `Prior Experience: ${application.priorExperience || 'none'}`,
    '',
    'EMERGENCY CONTACT / GUARDIAN',
    `Guardian Name: ${application.parentName || 'Not specified'}`,
    `Guardian Phone: ${application.parentPhone || 'Not specified'}`,
    `Relationship: ${application.parentRelationship || 'Not specified'}`,
    '',
    'MOTIVATION / NOTES',
    `${application.motivation || 'Direct enrollment applicant'}`,
    '',
    `Documents Attached Online: ${application.documentNames?.length ? application.documentNames.join(', ') : 'None (to submit on campus)'}`,
  ];
  return `mailto:${SCHOOL_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
};

export const buildContactMailtoHref = (inquiry: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string => {
  const subject = `[VIBIT INQUIRY] ${inquiry.subject} from ${inquiry.name}`;
  const body = [
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Topic: ${inquiry.subject}`,
    '',
    inquiry.message,
  ].join('\n');
  return `mailto:${SCHOOL_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
