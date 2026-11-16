import emailjs from '@emailjs/browser';

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
  documentNames?: string[];
}

interface EmailDeliveryResult {
  admin: EmailDeliveryStatus;
  student: EmailDeliveryStatus;
  error: string;
}

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const applicationTemplateId = import.meta.env.VITE_EMAILJS_APPLICATION_TEMPLATE_ID;
const confirmationTemplateId = import.meta.env.VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID;

const isApplicationEmailConfigured = () => (
  Boolean(serviceId && publicKey && applicationTemplateId)
);

const sendTemplate = async (templateId: string, params: Record<string, string>) => (
  emailjs.send(serviceId, templateId, params, { publicKey })
);

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'object' && error !== null && 'text' in error && typeof error.text === 'string') {
    return error.text;
  }
  return 'EmailJS send failed.';
};

export const sendApplicationEmails = async (
  application: ApplicationEmailData,
): Promise<EmailDeliveryResult> => {
  if (!isApplicationEmailConfigured()) {
    return {
      admin: 'not_configured',
      student: 'not_configured',
      error: 'EmailJS is not configured. Add the service ID, public key, and application template ID to the environment.',
    };
  }

  const templateParams = {
    applicant_name: application.fullName,
    applicant_email: application.email,
    applicant_phone: application.phone,
    national_id: application.nationalId,
    date_of_birth: application.dateOfBirth,
    address: application.address,
    parent_name: application.parentName,
    parent_phone: application.parentPhone,
    parent_relationship: application.parentRelationship,
    course_name: application.courseName,
    prior_experience: application.priorExperience,
    academic_grade: application.academicGrade,
    motivation: application.motivation,
    application_code: application.generatedCode,
    submitted_at: application.timestamp,
    document_names: application.documentNames?.join(', ') || 'No documents uploaded',
  };
  let admin: EmailDeliveryStatus = 'failed';
  let student: EmailDeliveryStatus = 'failed';
  const errors: string[] = [];

  try {
    await sendTemplate(applicationTemplateId, templateParams);
    admin = 'sent';
  } catch (error) {
    errors.push(`School notification: ${getErrorMessage(error)}`);
  }

  if (confirmationTemplateId) {
    await new Promise((resolve) => window.setTimeout(resolve, 1100));
    try {
      await sendTemplate(confirmationTemplateId, {
        applicant_name: application.fullName,
        applicant_email: application.email,
        course_name: application.courseName,
        application_code: application.generatedCode,
        submitted_at: application.timestamp,
      });
      student = 'sent';
    } catch (error) {
      errors.push(`Applicant confirmation: ${getErrorMessage(error)}`);
    }
  } else {
    student = 'not_configured';
    errors.push('Applicant confirmation template is not configured.');
  }

  return { admin, student, error: errors.join(' ') };
};
