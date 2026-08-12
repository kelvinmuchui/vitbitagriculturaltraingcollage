/**
 * Utility to generate and download the official VIBIT College Enrollment Confirmation Form
 * matching the official 5-page college acceptance form structure.
 */

export function downloadEnrollmentConfirmationForm(studentData?: {
  fullName?: string;
  email?: string;
  phone?: string;
  courseName?: string;
  nationalId?: string;
  dateOfBirth?: string;
  address?: string;
  parentName?: string;
  parentPhone?: string;
}) {
  const name = studentData?.fullName || '.........................................................................';
  const email = studentData?.email || '.........................................................................';
  const phone = studentData?.phone || '.........................................................................';
  const course = studentData?.courseName || '.........................................................................';
  const nationalId = studentData?.nationalId || '.........................................................................';
  const dob = studentData?.dateOfBirth || '.........................................................................';
  const address = studentData?.address || '.........................................................................';
  const parentName = studentData?.parentName || '.........................................................................';
  const parentPhone = studentData?.parentPhone || '.........................................................................';

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>VIBIT College Enrollment Confirmation Form</title>
  <style>
    @media print {
      body { padding: 0; margin: 0; background: #fff; }
      .no-print { display: none; }
      .page-break { page-break-after: always; }
    }
    body {
      font-family: 'Times New Roman', Times, serif;
      color: #111;
      background: #fdfbf7;
      margin: 0;
      padding: 30px;
      line-height: 1.6;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: #fff;
      padding: 40px;
      border: 1px solid #dcd3c9;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      position: relative;
    }
    .watermark {
      position: absolute;
      top: 35%;
      left: 20%;
      font-size: 140px;
      color: rgba(182, 23, 30, 0.05);
      font-weight: bold;
      transform: rotate(-30deg);
      user-select: none;
      pointer-events: none;
    }
    .header {
      text-align: center;
      border-bottom: 3px double #b6171e;
      padding-bottom: 15px;
      margin-bottom: 25px;
    }
    .header-logo-text {
      font-size: 22px;
      font-weight: bold;
      color: #2E221C;
      letter-spacing: 1px;
      margin: 0;
      text-transform: uppercase;
    }
    .header-sub {
      font-size: 12px;
      color: #555;
      margin-top: 5px;
      font-family: Arial, sans-serif;
    }
    .header-sub strong { color: #b6171e; }
    .form-title {
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      text-decoration: underline;
      margin: 25px 0 20px 0;
      color: #111;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .section {
      margin-bottom: 25px;
      background: #faf8f5;
      border: 1px solid #e8e1d7;
      padding: 20px;
      border-radius: 6px;
    }
    .section-header {
      font-size: 15px;
      font-weight: bold;
      color: #2E221C;
      border-bottom: 2px solid #C28A4E;
      padding-bottom: 5px;
      margin-bottom: 15px;
      text-transform: uppercase;
      font-family: Arial, sans-serif;
    }
    .field-row {
      margin-bottom: 14px;
      font-size: 14px;
    }
    .field-label {
      font-weight: bold;
      display: inline-block;
      width: 240px;
      color: #333;
      font-family: Arial, sans-serif;
      font-size: 13px;
    }
    .field-value {
      display: inline-block;
      border-bottom: 1px dotted #444;
      min-width: 350px;
      padding-left: 5px;
      font-weight: 600;
      color: #000;
    }
    .conditions-list {
      font-size: 13px;
      padding-left: 20px;
      color: #222;
      font-family: Arial, sans-serif;
    }
    .conditions-list li {
      margin-bottom: 10px;
      line-height: 1.5;
    }
    .sig-grid {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
    }
    .sig-box {
      width: 45%;
      border-top: 1px solid #333;
      padding-top: 8px;
      font-size: 12px;
      font-family: Arial, sans-serif;
    }
    .office-box {
      background: #f0ede6;
      border: 1.5px dashed #8E7C74;
      padding: 20px;
      border-radius: 6px;
      margin-top: 25px;
    }
    .print-bar {
      text-align: center;
      margin-bottom: 20px;
    }
    .print-btn {
      background: #b6171e;
      color: #fff;
      border: none;
      padding: 12px 28px;
      font-size: 14px;
      font-weight: bold;
      border-radius: 8px;
      cursor: pointer;
      font-family: Arial, sans-serif;
      box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    }
    .print-btn:hover { background: #8e1016; }
  </style>
</head>
<body>

  <div class="print-bar no-print">
    <button onclick="window.print()" class="print-btn">🖨️ Print or Save as PDF</button>
  </div>

  <div class="container">
    <div class="watermark">VIBIT</div>

    <!-- HEADER -->
    <div class="header">
      <h1 class="header-logo-text">VIBIT School of Coffee & Agribusiness</h1>
      <p class="header-sub">
        <strong>VIBIT Agricultural Training College</strong><br>
        P. O. Box 14700-00800 Nairobi | Mobile: +254 708 137992 | Email: vbitschoolofcoffeeagribusiness@gmail.com<br>
        Website: www.vbitschoolofagribusiness.co.ke
      </p>
    </div>

    <!-- TITLE -->
    <div class="form-title">
      College Acceptance & Enrollment Confirmation Form
    </div>

    <!-- SECTION 1: STUDENT INFO -->
    <div class="section">
      <div class="section-header">Section 1: Student Personal Information</div>
      <div class="field-row">
        <span class="field-label">Full Legal Name:</span>
        <span class="field-value">${name}</span>
      </div>
      <div class="field-row">
        <span class="field-label">Date of Birth:</span>
        <span class="field-value">${dob}</span>
      </div>
      <div class="field-row">
        <span class="field-label">National ID / Passport Number:</span>
        <span class="field-value">${nationalId}</span>
      </div>
      <div class="field-row">
        <span class="field-label">Permanent Address:</span>
        <span class="field-value">${address}</span>
      </div>
      <div class="field-row">
        <span class="field-label">Phone Number:</span>
        <span class="field-value">${phone}</span>
      </div>
      <div class="field-row">
        <span class="field-label">Email Address:</span>
        <span class="field-value">${email}</span>
      </div>
    </div>

    <!-- SECTION 2: ADMISSION DETAILS -->
    <div class="section">
      <div class="section-header">Section 2: Admission Details</div>
      <div class="field-row">
        <span class="field-label">Program of Study:</span>
        <span class="field-value">${course}</span>
      </div>
      <div class="field-row">
        <span class="field-label">Level of Study:</span>
        <span class="field-value">Certificate / Artisan / Diploma</span>
      </div>
      <div class="field-row">
        <span class="field-label">Admission Term / Intake:</span>
        <span class="field-value">Academic Intake 2024 / 2025</span>
      </div>
    </div>

    <!-- SECTION 3: FINANCIAL INFORMATION -->
    <div class="section">
      <div class="section-header">Section 3: Financial Information</div>
      <div class="field-row">
        <span class="field-label">Tuition & Lab Fees:</span>
        <span class="field-value">As specified in official fee schedule</span>
      </div>
      <div class="field-row">
        <span class="field-label">Accepted Payment Methods:</span>
        <span class="field-value">M-Pesa Paybill / Direct Bank Deposit / Banker's Cheque</span>
      </div>
    </div>

    <!-- SECTION 4: CONDITIONS OF ADMISSION -->
    <div class="section">
      <div class="section-header">Section 4: Conditions of Admission</div>
      <p style="font-size: 13px; font-family: Arial, sans-serif; margin-bottom: 10px;">
        By accepting this offer and submitting this confirmation form, the student agrees to:
      </p>
      <ol class="conditions-list">
        <li>Submit all required academic and identification documents (National ID/Passport photo, KCSE certificate or result slip) before enrollment.</li>
        <li>Abide by all rules, regulations, and institutional policies of VIBIT School of Coffee & Agribusiness.</li>
        <li>Attend mandatory orientation and laboratory practical sessions.</li>
        <li>Maintain satisfactory academic performance as outlined in the student handbook.</li>
      </ol>
    </div>

    <!-- SECTION 5: STUDENT CONFIRMATION -->
    <div class="section">
      <div class="section-header">Section 5: Student Confirmation</div>
      <p style="font-size: 13px; font-family: Arial, sans-serif;">
        I hereby accept the offer of admission to VIBIT Agricultural Training College for the program listed above and confirm that all details provided are accurate.
      </p>
      <div class="sig-grid">
        <div class="sig-box">
          Signature of Student<br><br>
          Date: ................................................
        </div>
        <div class="sig-box">
          Student Full Name<br><br>
          ${name}
        </div>
      </div>
    </div>

    <!-- SECTION 6: PARENT / GUARDIAN CONSENT -->
    <div class="section">
      <div class="section-header">Section 6: Parent / Guardian Details & Consent</div>
      <div class="field-row">
        <span class="field-label">Parent / Guardian Full Name:</span>
        <span class="field-value">${parentName}</span>
      </div>
      <div class="field-row">
        <span class="field-label">Parent / Guardian Contact Phone:</span>
        <span class="field-value">${parentPhone}</span>
      </div>
      <p style="font-size: 13px; font-family: Arial, sans-serif; margin-top: 15px;">
        I, as the parent / guardian, consent to the admission of my child / ward to VIBIT Agricultural Training College.
      </p>
      <div class="sig-grid">
        <div class="sig-box">
          Signature of Parent / Guardian<br><br>
          Date: ................................................
        </div>
      </div>
    </div>

    <!-- SECTION 7: OFFICE USE ONLY -->
    <div class="office-box">
      <div class="section-header" style="border-color: #8E7C74;">Section 7: Office Use Only</div>
      <div class="field-row">
        <span class="field-label">Admission Officer Name:</span>
        <span class="field-value">.........................................................................</span>
      </div>
      <div class="field-row">
        <span class="field-label">Date Received:</span>
        <span class="field-value">.........................................................................</span>
      </div>
      <div class="field-row">
        <span class="field-label">Admission Status:</span>
        <span class="field-value">CONFIRMED / PENDING</span>
      </div>
      <div class="field-row" style="margin-top: 15px;">
        <span class="field-label">Officer Signature:</span>
        <span class="field-value">.........................................................................</span>
      </div>
    </div>

  </div>

</body>
</html>`;

  // Open formatted document in new printable window
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  } else {
    // Fallback blob download if popups are blocked
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VIBIT_College_Enrollment_Confirmation_Form.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
