import nodemailer from 'nodemailer';

export const SCHOOL_EMAIL = 'vbitschoolofcoffeeagribusiness@gmail.com';
export const TVET_REG_NUMBER = 'TVATA/PRIVATE/TVC/0158/2026';

export const getGmailConfig = () => {
  const user = (process.env.GMAIL_USER || process.env.EMAIL_USER || SCHOOL_EMAIL).trim();
  const pass = (process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASS || '').replace(/\s+/g, '');
  const recipient = (process.env.SCHOOL_ADMISSIONS_EMAIL || SCHOOL_EMAIL).trim();
  return {
    user,
    pass,
    recipient,
    isConfigured: Boolean(user && pass),
  };
};

const createTransporter = (user, pass) => nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user,
    pass,
  },
});

const escapeHtml = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const formatTimestamp = (timestamp) => {
  try {
    return new Date(timestamp).toLocaleString('en-KE', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Africa/Nairobi',
    });
  } catch {
    return String(timestamp || new Date().toISOString());
  }
};

const toNodemailerAttachments = (documents = []) => documents
  .filter((doc) => doc && (doc.buffer || doc.content))
  .map((doc) => ({
    filename: doc.originalname || doc.fileName || 'attachment',
    content: doc.buffer || doc.content,
    contentType: doc.mimetype || doc.mimeType || 'application/octet-stream',
  }));

export const sendApplicationEmailsViaGmail = async (application, documents = []) => {
  const config = getGmailConfig();
  if (!config.isConfigured) {
    return {
      admin: 'not_configured',
      student: 'not_configured',
      error: 'Gmail SMTP is not configured yet. Set GMAIL_USER and your 16-character Google App Password in GMAIL_APP_PASSWORD on the server.',
    };
  }

  const applicantEmail = String(application.email || '').trim();
  const modeLabel = application.applyMode === 'full'
    ? 'Full Detailed Academic Form'
    : '1-Minute Quick Apply';
  const submittedAt = formatTimestamp(application.timestamp);
  const documentNames = documents
    .map((doc) => doc.originalname || doc.fileName)
    .filter(Boolean);
  const docsDisplay = documentNames.length > 0
    ? documentNames.join(', ')
    : 'None (to submit on campus)';

  const rows = [
    ['Application Mode', modeLabel],
    ['Official Admission Code', application.generatedCode],
    ['TVET Authority Reg. No.', TVET_REG_NUMBER],
    ['Submitted At', submittedAt],
    ['Applicant Full Name', application.fullName],
    ['Phone Number', application.phone],
    ['Email Address', applicantEmail],
    ['Selected Course', application.courseName],
    ['Town / Address', application.address || 'Kenya'],
    ['National ID / Passport', application.nationalId || 'To provide on campus'],
    ['Date of Birth', application.dateOfBirth || 'Not specified'],
    ['Academic Grade', application.academicGrade || 'Open Practical'],
    ['Prior Experience', application.priorExperience || 'none'],
    ['Guardian Name', application.parentName || 'Not specified'],
    ['Guardian Phone', application.parentPhone || 'Not specified'],
    ['Guardian Relationship', application.parentRelationship || 'Not specified'],
    ['Motivation / Notes', application.motivation || 'Direct enrollment applicant'],
    ['Attached Documents', docsDisplay],
  ];

  const adminText = [
    'VIBIT AGRICULTURAL TRAINING COLLEGE — NEW ADMISSION APPLICATION',
    `TVET Authority Reg: ${TVET_REG_NUMBER}`,
    '================================================================',
    ...rows.map(([label, value]) => `${label}: ${value}`),
  ].join('\n');

  const adminHtml = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #2E221C; max-width: 680px; margin: 0 auto; border: 1px solid #e5ddd3; border-radius: 12px; overflow: hidden;">
      <div style="background: #2E221C; color: #FAF6F0; padding: 20px 24px; border-bottom: 4px solid #C28A4E;">
        <p style="margin: 0; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: #C28A4E; font-weight: bold;">VIBIT Agricultural Training College</p>
        <h2 style="margin: 6px 0 4px 0; font-size: 20px;">New Student Admission Application</h2>
        <p style="margin: 0; font-size: 12px; color: #d6ccc2;">TVET Reg: ${escapeHtml(TVET_REG_NUMBER)} &bull; Code: <strong>${escapeHtml(application.generatedCode)}</strong></p>
      </div>
      <div style="padding: 20px 24px; background: #ffffff;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tbody>
            ${rows.map(([label, value], idx) => `
              <tr style="background: ${idx % 2 === 0 ? '#FAF6F0' : '#ffffff'};">
                <td style="padding: 9px 12px; font-weight: bold; width: 38%; border-bottom: 1px solid #eee5dc; vertical-align: top;">${escapeHtml(label)}</td>
                <td style="padding: 9px 12px; border-bottom: 1px solid #eee5dc; vertical-align: top;">${escapeHtml(value)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <div style="background: #FAF6F0; padding: 14px 24px; font-size: 11px; color: #6e5f57; border-top: 1px solid #e5ddd3;">
        Sent automatically from the VIBIT Admissions Portal via Nodemailer &amp; Gmail SMTP. Reply directly to contact the applicant at ${escapeHtml(applicantEmail)}.
      </div>
    </div>
  `;

  const studentSummaryRows = [
    ['Official Admission Code', application.generatedCode],
    ['Applicant Full Name', application.fullName],
    ['Email Address', applicantEmail],
    ['Phone Number', application.phone],
    ['Program Selected', application.courseName],
    ['Application Mode', modeLabel],
    ['Town / Address', application.address || 'Kenya'],
    ['Submitted At', submittedAt],
  ];

  const studentText = [
    `Dear ${application.fullName},`,
    '',
    `Thank you for applying to VIBIT Agricultural Training College (TVETA Reg: ${TVET_REG_NUMBER}).`,
    'This confirmation was sent to the email address you provided in your application.',
    '',
    ...studentSummaryRows.map(([label, value]) => `${label}: ${value}`),
    '',
    `Our admissions registrar has received your details and will contact you via ${application.phone} or WhatsApp (+254 708 137 992 / +254 759 065 090).`,
    '',
    'Warm regards,',
    'Admissions Registrar',
    'VIBIT Agricultural Training College',
    'Leomar Court, 45 Westlands Road, Nairobi',
    `Email: ${SCHOOL_EMAIL}`,
  ].join('\n');

  const studentHtml = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #2E221C; max-width: 620px; margin: 0 auto; border: 1px solid #e5ddd3; border-radius: 12px; overflow: hidden;">
      <div style="background: #2E221C; color: #FAF6F0; padding: 20px 24px; border-bottom: 4px solid #C28A4E;">
        <p style="margin: 0; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: #C28A4E; font-weight: bold;">VIBIT Agricultural Training College</p>
        <h2 style="margin: 6px 0 4px 0; font-size: 20px;">Application Confirmation</h2>
        <p style="margin: 0; font-size: 12px; color: #d6ccc2;">TVET Authority Reg: ${escapeHtml(TVET_REG_NUMBER)}</p>
      </div>
      <div style="padding: 22px 24px; background: #ffffff; font-size: 14px; line-height: 1.6;">
        <p style="margin-top: 0;">Dear <strong>${escapeHtml(application.fullName)}</strong>,</p>
        <p>Thank you for applying to <strong>VIBIT Agricultural Training College</strong>. We have received your admission application and sent this confirmation to <strong>${escapeHtml(applicantEmail)}</strong>.</p>
        <div style="background: #FAF6F0; border: 1px solid #C28A4E; border-radius: 10px; padding: 14px 16px; margin: 16px 0;">
          <p style="margin: 0 0 6px 0; font-size: 12px; text-transform: uppercase; color: #8E7C74; font-weight: bold;">Your Official Admission Code</p>
          <p style="margin: 0; font-size: 22px; font-weight: bold; letter-spacing: 1px; color: #2E221C;">${escapeHtml(application.generatedCode)}</p>
          <p style="margin: 8px 0 0 0; font-size: 13px;"><strong>Selected Course:</strong> ${escapeHtml(application.courseName)}</p>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin: 14px 0;">
          <tbody>
            ${studentSummaryRows.map(([label, value], idx) => `
              <tr style="background: ${idx % 2 === 0 ? '#FAF6F0' : '#ffffff'};">
                <td style="padding: 8px 10px; font-weight: bold; width: 42%; border-bottom: 1px solid #eee5dc;">${escapeHtml(label)}</td>
                <td style="padding: 8px 10px; border-bottom: 1px solid #eee5dc;">${escapeHtml(value)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <p>Our admissions officer will reach out to you shortly via <strong>${escapeHtml(application.phone)}</strong> or WhatsApp.</p>
        <p style="margin-bottom: 0; font-size: 13px; color: #5b4d46;">
          <strong>Admissions Desk:</strong> 0708 137992 / 0759 065 090<br />
          <strong>Campus:</strong> Leomar Court, 45 Westlands Road, Nairobi<br />
          <strong>Email:</strong> ${escapeHtml(SCHOOL_EMAIL)}
        </p>
      </div>
    </div>
  `;

  const transporter = createTransporter(config.user, config.pass);
  const attachments = toNodemailerAttachments(documents);

  let adminStatus = 'failed';
  let studentStatus = 'failed';
  const errors = [];

  try {
    await transporter.sendMail({
      from: `"VIBIT Admissions Portal" <${config.user}>`,
      to: config.recipient,
      replyTo: applicantEmail || config.user,
      subject: `[VIBIT ADMISSION] ${modeLabel}: ${application.fullName} - ${application.courseName} (${application.generatedCode})`,
      text: adminText,
      html: adminHtml,
      attachments,
    });
    adminStatus = 'sent';
  } catch (error) {
    console.error('Nodemailer school notification failed:', error);
    errors.push(error instanceof Error ? error.message : 'Failed to send school notification email.');
  }

  if (!applicantEmail) {
    errors.push('Applicant email address is missing.');
  } else {
    try {
      await transporter.sendMail({
        from: `"VIBIT Agricultural Training College" <${config.user}>`,
        to: applicantEmail,
        replyTo: config.recipient,
        subject: `VIBIT Admission Confirmation — ${application.generatedCode}`,
        text: studentText,
        html: studentHtml,
      });
      studentStatus = 'sent';
    } catch (error) {
      console.error('Nodemailer applicant confirmation failed:', error);
      errors.push(error instanceof Error ? error.message : 'Failed to send applicant confirmation email.');
    }
  }

  return {
    admin: adminStatus,
    student: studentStatus,
    adminRecipient: config.recipient,
    studentRecipient: applicantEmail,
    error: errors.join(' '),
  };
};

export const sendContactInquiryViaGmail = async ({ name, email, subject, message }) => {
  const senderEmail = String(email || '').trim();
  const config = getGmailConfig();
  if (!config.isConfigured) {
    return {
      status: 'not_configured',
      admin: 'not_configured',
      sender: 'not_configured',
      email: senderEmail,
      error: 'Gmail SMTP is not configured yet. Set GMAIL_USER and GMAIL_APP_PASSWORD on the server.',
    };
  }

  const transporter = createTransporter(config.user, config.pass);
  const text = [
    'VIBIT AGRICULTURAL TRAINING COLLEGE — WEBSITE INQUIRY',
    `TVET Authority Reg: ${TVET_REG_NUMBER}`,
    '================================================================',
    `Name: ${name}`,
    `Email: ${senderEmail}`,
    `Topic: ${subject}`,
    '',
    'Message:',
    message,
  ].join('\n');

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #2E221C; max-width: 620px; margin: 0 auto; border: 1px solid #e5ddd3; border-radius: 12px; overflow: hidden;">
      <div style="background: #2E221C; color: #FAF6F0; padding: 18px 22px; border-bottom: 4px solid #C28A4E;">
        <p style="margin: 0; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: #C28A4E; font-weight: bold;">VIBIT Website Contact Inquiry</p>
        <h2 style="margin: 6px 0 0 0; font-size: 18px;">Topic: ${escapeHtml(subject)}</h2>
      </div>
      <div style="padding: 20px 22px; background: #ffffff; font-size: 14px; line-height: 1.6;">
        <p style="margin-top: 0;"><strong>From:</strong> ${escapeHtml(name)} (&lt;${escapeHtml(senderEmail)}&gt;)</p>
        <div style="background: #FAF6F0; border-left: 4px solid #C28A4E; padding: 12px 14px; white-space: pre-wrap;">${escapeHtml(message)}</div>
      </div>
    </div>
  `;

  const confirmationText = [
    `Dear ${name},`,
    '',
    'Thank you for contacting VIBIT Agricultural Training College.',
    `We have received your inquiry ("${subject}") and sent this confirmation to ${senderEmail}.`,
    '',
    'Your message:',
    message,
    '',
    'Our registrar team will respond within 24 working hours. For urgent inquiries, call or WhatsApp +254 708 137 992 / +254 759 065 090.',
    '',
    'Warm regards,',
    'VIBIT Registrar Desk',
    `TVET Authority Reg: ${TVET_REG_NUMBER}`,
    `Email: ${SCHOOL_EMAIL}`,
  ].join('\n');

  const confirmationHtml = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #2E221C; max-width: 620px; margin: 0 auto; border: 1px solid #e5ddd3; border-radius: 12px; overflow: hidden;">
      <div style="background: #2E221C; color: #FAF6F0; padding: 18px 22px; border-bottom: 4px solid #C28A4E;">
        <p style="margin: 0; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: #C28A4E; font-weight: bold;">VIBIT Agricultural Training College</p>
        <h2 style="margin: 6px 0 0 0; font-size: 18px;">Inquiry Confirmation</h2>
      </div>
      <div style="padding: 20px 22px; background: #ffffff; font-size: 14px; line-height: 1.6;">
        <p style="margin-top: 0;">Dear <strong>${escapeHtml(name)}</strong>,</p>
        <p>We have received your inquiry regarding <strong>${escapeHtml(subject)}</strong> and sent this confirmation to <strong>${escapeHtml(senderEmail)}</strong>.</p>
        <div style="background: #FAF6F0; border-left: 4px solid #C28A4E; padding: 12px 14px; white-space: pre-wrap; margin: 14px 0;">${escapeHtml(message)}</div>
        <p style="font-size: 13px; color: #5b4d46; margin-bottom: 0;">
          Our registrar desk will reply shortly. You can also reach us via WhatsApp or phone on <strong>0708 137992 / 0759 065 090</strong>.<br />
          TVET Reg: ${escapeHtml(TVET_REG_NUMBER)}
        </p>
      </div>
    </div>
  `;

  let adminStatus = 'failed';
  let senderStatus = 'failed';
  const errors = [];

  try {
    await transporter.sendMail({
      from: `"VIBIT Website Contact" <${config.user}>`,
      to: config.recipient,
      replyTo: senderEmail,
      subject: `[VIBIT INQUIRY] ${subject} from ${name}`,
      text,
      html,
    });
    adminStatus = 'sent';
  } catch (error) {
    console.error('Nodemailer contact inquiry failed:', error);
    errors.push(error instanceof Error ? error.message : 'Failed to deliver inquiry email.');
  }

  if (senderEmail) {
    try {
      await transporter.sendMail({
        from: `"VIBIT Agricultural Training College" <${config.user}>`,
        to: senderEmail,
        replyTo: config.recipient,
        subject: `VIBIT Inquiry Confirmation — ${subject}`,
        text: confirmationText,
        html: confirmationHtml,
      });
      senderStatus = 'sent';
    } catch (error) {
      console.error('Nodemailer contact confirmation failed:', error);
      errors.push(error instanceof Error ? error.message : 'Failed to send inquiry confirmation email.');
    }
  }

  return {
    status: adminStatus,
    admin: adminStatus,
    sender: senderStatus,
    email: senderEmail,
    error: errors.join(' '),
  };
};

export const sendNewsletterConfirmationViaGmail = async (email) => {
  const subscriberEmail = String(email || '').trim();
  const config = getGmailConfig();
  if (!config.isConfigured) {
    return {
      status: 'not_configured',
      email: subscriberEmail,
      error: 'Gmail SMTP is not configured yet.',
    };
  }

  const transporter = createTransporter(config.user, config.pass);
  const text = [
    'Welcome to the VIBIT Agricultural Training College Newsletter!',
    '',
    `This confirmation was sent to ${subscriberEmail}.`,
    'You will receive bi-weekly coffee market trends, agricultural research digests, and upcoming intake alerts.',
    '',
    `Admissions & Registrar: 0708 137992 / 0759 065 090`,
    `Email: ${SCHOOL_EMAIL}`,
    `TVET Reg: ${TVET_REG_NUMBER}`,
  ].join('\n');

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #2E221C; max-width: 600px; margin: 0 auto; border: 1px solid #e5ddd3; border-radius: 12px; overflow: hidden;">
      <div style="background: #2E221C; color: #FAF6F0; padding: 18px 22px; border-bottom: 4px solid #C28A4E;">
        <p style="margin: 0; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: #C28A4E; font-weight: bold;">VIBIT Agricultural Training College</p>
        <h2 style="margin: 6px 0 0 0; font-size: 18px;">Newsletter Subscription Confirmed</h2>
      </div>
      <div style="padding: 20px 22px; background: #ffffff; font-size: 14px; line-height: 1.6;">
        <p style="margin-top: 0;">Thank you for subscribing to the <strong>VIBIT Industry Newsletter</strong>.</p>
        <p>This confirmation has been sent to <strong>${escapeHtml(subscriberEmail)}</strong>. Watch your inbox for coffee value-chain digests, cupping workshops, and intake announcements.</p>
        <p style="font-size: 12px; color: #5b4d46; margin-bottom: 0;">
          Leomar Court, 45 Westlands Road, Nairobi &bull; 0708 137992 / 0759 065 090<br />
          TVET Reg: ${escapeHtml(TVET_REG_NUMBER)}
        </p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"VIBIT Agricultural Training College" <${config.user}>`,
      to: subscriberEmail,
      replyTo: config.recipient,
      subject: 'Welcome to VIBIT Agricultural Training College — Subscription Confirmed',
      text,
      html,
    });
    return { status: 'sent', email: subscriberEmail, error: '' };
  } catch (error) {
    console.error('Nodemailer newsletter confirmation failed:', error);
    return {
      status: 'failed',
      email: subscriberEmail,
      error: error instanceof Error ? error.message : 'Failed to send newsletter confirmation.',
    };
  }
};
