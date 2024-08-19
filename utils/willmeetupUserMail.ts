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

export async function sendWillMeetUpUserMail({ item }: any) {
  await sendMail(
    item.email,
    'Request to join #WILLMEETUP - WILL Forum ',
    `<p>Dear ${item.name} </p>
    <p>Congratulations!</p></br>
    <p>
    Your request to join <strong>#WILLMEETUP</strong> has been successfully approved:</br></br>
    Welcome to the important WILL Forum mission</br>
    for Women in Leadership — and WILL-A! App</br>
    will be your companion and guide on this</br>
    journey!</br></br>
    Please also keep checking your WILL-A! App for regular Motivation Alerts:</br></br>
    All the best:</br></br>  
    <p>WILL Forum Mission</p> 
    <a href="https://willforumonline.com">https://willforumonline.com</a>`,
    true,
    ''
  );
}
