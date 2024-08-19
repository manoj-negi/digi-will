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

export async function sendWillMeetUpMail({ item }: any) {
  await sendMail(
    process.env.MAIL_WILLMEETUP_TO,
    `${item?.name} has requested to join #WILLMEETUP`,
    `<p>Dear Admin,</p></br>
    <p>We have a new request to join <strong>#WILLMEETUP</strong></br></br>
    Here are the details of form response.  </p>
    <table style="width:100%; border:0px">
    <tr>
      <td style="border:0px">Name:</td>
      <td style="border:0px">${item?.name}</td>
    </tr>
    <tr>
      <td style="border:0px">Email:</td>
      <td style="border:0px">${item?.email}</td>
    </tr>
    <tr>
    <td style="border:0px">Contact No:</td>
    <td style="border:0px">${item?.phoneNumber}</td>
  </tr>
  <tr>
    <td style="border:0px">Company/ Organization:</td>
    <td style="border:0px">${item?.organization}</td>
  </tr>
    </table
    <p>Regards</p> 
    <h4>Team WILL Forum </h4>`,
    true,
    ''
  );
}
