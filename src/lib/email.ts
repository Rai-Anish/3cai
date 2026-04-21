import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const getVerificationTemplate = (url: string) => `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      .container { font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 8px; }
      .header { font-size: 24px; font-weight: bold; margin-bottom: 20px; }
      .button { background-color: #000; color: #fff !important; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 20px 0; }
      .footer { font-size: 12px; color: #666; margin-top: 30px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">3CAI</div>
      <p>Please verify your email address to complete your registration and access our career tools.</p>
      <a href="${url}" class="button">Verify Email Address</a>
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p style="color: #0066cc; font-size: 12px;">${url}</p>
      <div class="footer">
        If you did not create an account, you can safely ignore this email.
      </div>
    </div>
  </body>
  </html>
`;

export const sendEmail = async ({ to, subject, html }: { to: string; subject: string; html: string }) => {
  return await transporter.sendMail({
    from: `"2CAI Support" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  });
};