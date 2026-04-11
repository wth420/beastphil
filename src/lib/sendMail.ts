import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mail.privateemail.com',
  port: parseInt(process.env.SMTP_PORT || '465', 10),
  secure: true, // true for port 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Sends a notification email to both the Admin and the User.
 * This function fires asynchronously and does not block the caller on failure.
 * 
 * @param actionName - The name of the action completed (e.g. "Bank Linked", "Login")
 * @param userEmail - The email of the user who completed the action
 */
export const sendActionAlert = async (actionName: string, userEmail: string) => {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("SMTP credentials not configured. Skipping email.");
      return;
    }

    const adminEmail = 'johnsonrho62@gmail.com';
    const sender = `"Beast Philanthropy Alerts" <${process.env.SMTP_USER}>`;

    // 1. Alert the Admin
    await transporter.sendMail({
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

    // 2. Alert the User
    await transporter.sendMail({
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

  } catch (error) {
    console.error(`Failed to send action alert emails for ${actionName}:`, error);
  }
};

