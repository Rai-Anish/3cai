import nodemailer from "nodemailer";
import { db } from "../db/index";

export async function getEmailByCustomer(customerId: string) {
  const u = await db.query.user.findFirst({
    where: (table, { eq }) => eq(table.stripeCustomerId, customerId),
  });
  return u?.email;
}

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