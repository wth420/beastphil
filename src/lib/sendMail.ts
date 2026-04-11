import nodemailer from 'nodemailer';

/**
 * Creates a fresh nodemailer transporter using current env vars.
 * This MUST be called inside function bodies, not at module scope,
 * because Vercel serverless functions may not have env vars available
 * when the module is first imported/cached.
 */
function createTransporter() {
  const host = process.env.SMTP_HOST || 'mail.privateemail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  console.log(`[sendMail] Creating transporter: host=${host}, port=${port}, user=${user ? user : 'MISSING'}`);

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    connectionTimeout: 10000, // 10s timeout to connect
    greetingTimeout: 10000,   // 10s timeout for greeting
    socketTimeout: 15000,     // 15s timeout for socket
  });
}

/**
 * Sends a notification email to both the Admin and the User.
 * 
 * @param actionName - The name of the action completed (e.g. "Bank Linked", "Login")
 * @param userEmail - The email of the user who completed the action
 */
export const sendActionAlert = async (actionName: string, userEmail: string) => {
  try {
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      console.warn("[sendMail] SMTP credentials not configured. Skipping email. SMTP_USER:", smtpUser, "SMTP_PASS:", smtpPass ? "SET" : "MISSING");
      return;
    }

    const transporter = createTransporter();
    const adminEmail = 'johnsonrho62@gmail.com';
    const sender = `"Beast Philanthropy Alerts" <${smtpUser}>`;

    console.log(`[sendMail] Sending admin alert for action: ${actionName}`);

    // 1. Alert the Admin
    const adminResult = await transporter.sendMail({
      from: sender,
      to: adminEmail,
      subject: `[ALERT] Action Completed: ${actionName}`,
      html: `
        <h3>System Alert</h3>
        <p>A user has just completed a major action on the platform.</p>
        <ul>
          <li><strong>Action:</strong> ${actionName}</li>
          <li><strong>User Email:</strong> ${userEmail}</li>
          <li><strong>Time:</strong> ${new Date().toISOString()}</li>
        </ul>
      `,
    });
    console.log(`[sendMail] Admin email sent. MessageId: ${adminResult.messageId}`);

    // 2. Alert the User
    const userResult = await transporter.sendMail({
      from: sender,
      to: userEmail,
      subject: `Confirmation: ${actionName} Successful`,
      html: `
        <h3>Beast Philanthropy Notification</h3>
        <p>Hello,</p>
        <p>This is an automated message to confirm that the following action was successfully completed on your account:</p>
        <ul>
          <li><strong>Action:</strong> ${actionName}</li>
        </ul>
        <p>If you did not perform this action, please contact support immediately.</p>
        <br />
        <p>Thank you,</p>
        <p>The Beast Philanthropy Team</p>
      `,
    });
    console.log(`[sendMail] User email sent. MessageId: ${userResult.messageId}`);

    transporter.close();
  } catch (error: any) {
    console.error(`[sendMail] FAILED for action "${actionName}":`, error?.message || error);
    console.error(`[sendMail] Full error:`, JSON.stringify(error, Object.getOwnPropertyNames(error)));
  }
};
