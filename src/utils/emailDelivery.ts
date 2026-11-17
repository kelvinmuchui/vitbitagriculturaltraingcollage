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

export interface EmailDeliveryResult {
  admin: EmailDeliveryStatus;
  student: EmailDeliveryStatus;
  error: string;
  needsActivation?: boolean;
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

export const sendApplicationEmails = async (
  application: ApplicationEmailData,
): Promise<EmailDeliveryResult> => {
  const modeLabel = application.applyMode === 'full'
    ? 'Full Detailed Academic Form'
    : '1-Minute Quick Apply';
  const endpoint = `https://formsubmit.co/ajax/${SCHOOL_EMAIL}`;
  const submittedTime = (() => {
    try {
      return new Date(application.timestamp).toLocaleString();
    } catch {
      return application.timestamp;
    }
  })();

  const payload = {
    _subject: `[VIBIT ADMISSION] ${modeLabel}: ${application.fullName} - ${application.courseName} (${application.generatedCode})`,
    _template: 'table',
    _captcha: 'false',
    _replyto: application.email || SCHOOL_EMAIL,
    _autoresponse:
      `Dear ${application.fullName},\n\n` +
      `Thank you for applying to VIBIT Agricultural Training College (TVETA Reg: ${TVET_REG_NUMBER}).\n\n` +
      `Your Official Admission Code: ${application.generatedCode}\n` +
      `Course Selected: ${application.courseName}\n\n` +
      `Our admissions office has received your details and will contact you via ${application.phone} or WhatsApp (+254 708 137 992 / +254 759 065 090).\n\n` +
      `Warm regards,\nAdmissions Registrar\nVIBIT Agricultural Training College\nLeomar Court, 45 Westlands Road, Nairobi`,
    Application_Mode: modeLabel,
    Official_Admission_Code: application.generatedCode,
    TVET_Registration_No: TVET_REG_NUMBER,
    Applicant_Full_Name: application.fullName,
    Applicant_Email: application.email,
    Applicant_Phone: application.phone,
    Selected_Course: application.courseName,
    Town_Or_Address: application.address || 'Kenya',
    National_ID_Or_Passport: application.nationalId || 'To provide on campus',
    Date_Of_Birth: application.dateOfBirth || 'Not specified',
    Guardian_Name: application.parentName || 'Not specified',
    Guardian_Phone: application.parentPhone || 'Not specified',
    Guardian_Relationship: application.parentRelationship || 'Not specified',
    Academic_Grade: application.academicGrade || 'Open Practical',
    Prior_Experience: application.priorExperience || 'none',
    Motivation_Or_Notes: application.motivation || 'Direct enrollment applicant',
    Uploaded_Documents: application.documentNames?.length ? application.documentNames.join(', ') : 'None (to submit on campus)',
    Submitted_At: submittedTime,
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json().catch(() => null);
    const isSuccess = response.ok && (data?.success === true || data?.success === 'true');

    if (isSuccess) {
      return {
        admin: 'sent',
        student: 'sent',
        error: '',
      };
    }

    const message = extractErrorMessage(
      data,
      `Email gateway returned HTTP ${response.status}.`,
    );
    const needsActivation = /activat/i.test(message);

    return {
      admin: 'failed',
      student: 'failed',
      needsActivation,
      error: needsActivation
        ? `One-time inbox activation required: check ${SCHOOL_EMAIL} (including Spam) and click the FormSubmit activation link once to enable automatic delivery.`
        : message,
    };
  } catch (error) {
    return {
      admin: 'failed',
      student: 'failed',
      error: `Could not reach email gateway: ${extractErrorMessage(error, 'Email send failed.')}`,
    };
  }
};
