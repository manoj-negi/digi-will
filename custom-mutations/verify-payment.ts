import { KeystoneContext } from '@keystone-6/core/types';

import { sendBuyPlanMail, paymentReceivedMail } from '../utils/mail';
const nodeCCAvenue = require('node-ccavenue');
const ccav = new nodeCCAvenue.Configure({
  working_key: process.env.WORKING_KEY,
  merchant_id: process.env.MERCHANT_ID,
});

export const paymentVerify = `
verifyPayment( encRes:String, amount:Float!, paymentStatus:String!, planId: String!, name: String, email: String, phone: String, pincode: String, city: String, state: String, country: String, address: String,organization:String, userId: String): User`;

export async function verifyPayment(
  root: any,
  {
    encRes,
    amount,
    paymentStatus,
    planId,
    name,
    email,
    phone,
    pincode,
    city,
    state,
    country,
    address,
    organization,
    userId,
  }: {
    encRes: string;
    amount: any;
    paymentStatus: string;
    planId: string;
    name: string;
    email: string;
    phone: string;
    pincode: string;
    city: string;
    state: string;
    country: string;
    address: string;
    organization: String;
    userId: string;
  },
  context: KeystoneContext
) {
  const decryptedJsonResponse = ccav.redirectResponseToJson(encRes);
  console.log(
    `Payment status : ${decryptedJsonResponse.order_status},  PaymentId : ${decryptedJsonResponse?.bank_ref_no},  Billing_Name : ${name}`
  );
  const sudo = context.sudo();
  if (decryptedJsonResponse.order_status === 'Success') {
    let paymentId = decryptedJsonResponse?.bank_ref_no;
    try {
      // ***** If User already exist *** //
      if (userId) {
        await sudo.db.Subscription.createOne({
          data: {
            amount,
            paymentId,
            paymentStatus,
            user: { connect: { id: userId } },
            plan: { connect: { id: planId } },
          },
        });
        const plan: any = await sudo.db.Plan.findOne({
          where: { id: planId },
          query: 'name',
        });
        const user: any = await sudo.db.User.findOne({
          where: { id: userId },
          query: 'name email',
        });
        const emails = [
          'sumitsharma7667@gmail.com',
          'singhgautam@gmail.com',
          'test-abc@mail.com',
          'test-cab@mail.com',
          'test-cba@mail.com',
          'test-dca@mail.com',
          'teste-cad@mail.com',
        ];
        if (!emails.includes(user.email)) {
          await sendBuyPlanMail(user.email, user.name, plan?.name, decryptedJsonResponse?.order_id);
          await paymentReceivedMail(
            user.name,
            plan?.name,
            decryptedJsonResponse?.bank_ref_no,
            user.address,
            user.organization,
            user.phone,
            user.country,
            amount,
            user.city,
            user.state,
            user.pincode,
            decryptedJsonResponse?.order_id
          );
        }
      } else {
        throw 'User not found';
      }
    } catch (error: any) {
      console.log('error in verifying payment', error);
      throw new Error(error.message);
    }
  }
  return null;
}
