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

export async function sendCredentialsMail(
  to: string,
  password: string,
  name: String,
  email: String,
  level: String
) {
  await sendMail(
    to,
    'Level 1 Registration - WILL Forum',
    `<p>Dear ${name}</p>
    <p>Greetings!</p>
    <p>Welcome to the distinguished WILL Women in Leadership Certification Program! </br></br>
    Your payment for <strong>${level}</strong>  for WILL Certification program has been processed successfully. </br>
    Please find your WILL Leader credentials for the Program below: </br></br>
    User Name: ${email} </br>
    Password: ${password} </br></br>
    Note: Your WILL Leader credentials are confidential. Please do not share with anyone. </br></br>
    Wish you all the best in your pursuit of Leadership Progress ! </br>
    </p></br>
    <p>Regards</p>
    <h4>CEO WILL Forum India </h4></br>
    <a href="https://willforumonline.com ">https://willforumonline.com </a>
    `,
    true,
    ''
  );
}

export async function sendBuyPlanMail(
  to: string,
  name: String,
  level: String,
  order_number: String
) {
  await sendMail(
    to,
    `${level} Registration - WILL Forum`,
    `<p>Dear ${name}</p>
    <p>Congratulation!</p></br>
    <p> Welcome to the advanced ${level} of the distinguished WILL Women in Leadership Certification Program!</br></br> 
    Your payment for ${level} for WILL Certification program has been processed successfully. </br></br>
    Order Number: ${order_number}</br> </br>         
    Note: You may continue to use your WILL Leader User-and password for moving forward on ${level}. </br>
    Wish you all the best in your pursuit of advanced Leadership Progress ! </p></br>
    <p>Regards</p> 
    <h4>CEO WILL Forum India </h4>
    <a href="https://willforumonline.com ">https://willforumonline.com </a>
    </p>`,
    true,
    ''
  );
}
export async function paymentReceivedMail(
  name: String,
  level: String,
  Payment_confirmation_number: String,
  address: String,
  organization: String,
  phone: String,
  country: String,
  amount: String,
  city: String,
  state: String,
  pincode: String,
  order_number: String
) {
  await sendMail(
    process.env.MAIL_WILLMEETUP_TO,
    `${name} enrols for ${level}`,
    `<p>Dear Admin,</p></br>
    <p>There is an enrolment of ${level} and its details are as follows: </p>
    <table style="width:100%; border:0px">
      <tr>
        <td style="border:0px">User name:</td>
        <td style="border:0px">${name}</td>
      </tr>
      <tr>
        <td style="border:0px">Amount:</td>
        <td style="border:0px">${amount}</td>
      </tr>
      <tr>
      <td style="border:0px">Order Number:</td>
      <td style="border:0px">${order_number}</td>
    </tr>
    <tr>
      <td style="border:0px">Payment Confirmation Number:</td>
      <td style="border:0px">${Payment_confirmation_number}</td>
    </tr>
    <tr>
      <td style="border:0px">Phone:</td>
      <td style="border:0px">${phone}</td>
    </tr>
    <tr>
    <td style="border:0px">Address:</td>
    <td style="border:0px">${address}</td>
  </tr>
  <tr>
    <td style="border:0px">City:</td>
    <td style="border:0px">${city}</td>
  </tr>
  <tr>
    <td style="border:0px">State:</td>
    <td style="border:0px">${state}</td>
  </tr>
  <tr>
    <td style="border:0px">Pincode:</td>
    <td style="border:0px">${pincode}</td>
  </tr>
  <tr>
    <td style="border:0px">Country:</td>
    <td style="border:0px">${country}</td>
  </tr>
  <tr>
    <td style="border:0px">Organization:</td>
    <td style="border:0px">${organization}</td>
  </tr>
  </table></br>
    <p>
    Regards</br>
   <h4>-WILL Forum App</h4>
    </p>`,
    true,
    ''
  );
}

export async function sendOtpMail(to: string, name: string, otp: string) {
  await sendMail(
    to,
    'Signin/Signup - WILL Forum',
    `<p>Dear ${name}</p>
    <p>Your OTP is</p>
    <h2 style="background: #00466a;margin: 0; width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
    <p>Regards</p>
    <h4>CEO WILL Forum India </h4></br>
    <a href="https://willforumonline.com ">https://willforumonline.com </a>
    `,
    true,
    ''
  );
}
