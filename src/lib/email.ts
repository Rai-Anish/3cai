import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendEmail = async ({ to, subject, html }: { to: string; subject: string; html: string }) => {
  return await transporter.sendMail({
    from: `"3CAI Support" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  });
};