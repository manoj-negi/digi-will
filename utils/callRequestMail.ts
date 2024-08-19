import process from 'process';
import { createTransport } from 'nodemailer';

async function sendMail(
  to: string,
  subject: string,
  text: string,
  useHtml = false,
  attachment: String
) {
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
  });
}

export async function sendCallRequestMail({ item }: any) {
  await sendMail(
    process.env.MAIL_CALL_REQUEST_TO,
    'WILL Forum Greetings!',
    `<p>Greetings! </p>
    <p>We have a new request for Call A mentor </br>
    Here are the details of form response. </p>
    <p>Name - ${item?.name || ''}</br>
    Email - ${item?.email || ''}</br>
    Contact No. - ${item?.phoneNumber || ''}</br>
    Message - ${item?.message || ''}</br>
    Time - ${item?.time || ''}</p>
    <p>Regards</p> 
    <h4>Team WILL Forum </h4>`,
    true,
    ''
  );
}
