import process from 'process';
import { createTransport } from 'nodemailer';

async function sendMail(to: string, subject: string, text: string, useHtml = false, bcc: any) {
  const transporter = createTransport({
    //@ts-ignore
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_SECRET,
    },
  });

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: `${to}`,
    subject,
    ...(useHtml ? { html: text } : { text }),
    bcc,
  });
}

export async function bulkMail(html: any, bcc: any) {
  await sendMail(process.env.MAIL_WILLMEETUP_TO, 'mail', html, true, bcc);
}
