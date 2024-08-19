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

export async function sendCallRequestUserMail({ item }: any) {
  await sendMail(
    item?.email,
    'WILL Forum',
    `<p>Dear ${item?.name || ''} </p>
    <p>Greetings!</p> 
    <p>Your request for connecting with a WILL mentor for a 30 minutes guidance session has been received!</br>
    This Feature gives you the opportunity to discuss and receive guidance from our distinguished WILL Mentors at just Rs. 299 per 30 minute session.</br> 
    Kindly click here to continue to make your payment Online: <a target="_blank" href="${
      process.env.CALL_REQUEST_PAYMENT_LINK || ''
    }">${process.env.CALL_REQUEST_PAYMENT_LINK || ''}</a> </br>
    You will receive a Confirmed Session Call Time one of our WILL Mentors within 24 hours of the payment confirmation.</br> 
    Please check the Option box below for Mentor requirement:  </br>
    <input type="checkbox"> Dial Courage </br> 
    <input type="checkbox"> Dial Conviction </br> 
    <input type="checkbox"> Dial Confidence </br> 
    <input type="checkbox"> Dial Self-Branding </br> 
    <input type="checkbox"> Dial Networking </br> 
    <input type="checkbox"> Dial Work-Life Balance </br> 
    <input type="checkbox"> Dial Power of Self </br> 
    <input type="checkbox"> Dial Wellness </br> 
    <p>All the best!</p> 
    <h4>CEO WILL Forum India </h4>`,
    true,
    ''
  );
}
