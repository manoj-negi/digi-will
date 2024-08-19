import { KeystoneContext } from '@keystone-6/core/types';
const nodeCCAvenue = require('node-ccavenue');
import { customAlphabet } from 'nanoid';
export const encRequest = `createEncData( amount: Float!, billing_name: String ): encRequestType`;
export const encRequestType = `
  type encRequestType {
      encData: String!
  }
`;
export async function createEncData(
  root: any,
  { amount, billing_name }: { amount: any; billing_name: String },
  context: KeystoneContext
) {
  const ccav = new nodeCCAvenue.Configure({
    working_key: process.env.WORKING_KEY,
    merchant_id: process.env.MERCHANT_ID,
  });

  const alphabet = '123456789ABCDEFGHJKLMNOPQRSTUVWXYZ';
  const nanoid = customAlphabet(alphabet, 10);
  const orderId = await nanoid();
  let orderParams = {};
  const emails = [
    'sumitsharma7667@gmail.com',
    'singhgautam@gmail.com',
    'test-abc@mail.com',
    'test-cab@mail.com',
    'test-cba@mail.com',
    'test-dca@mail.com',
    'teste-cad@mail.com',
  ];
  if (emails.includes(context?.session?.data?.email)) {
    orderParams = {
      order_id: orderId,
      currency: 'INR',
      amount: 1,
      redirect_url: process.env.REDIRECT_URL,
      billing_name: billing_name,
    };
    console.log(`Payment initated by ${billing_name} At ${new Date()} for Amount 1 `);
  } else {
    orderParams = {
      order_id: orderId,
      currency: 'INR',
      amount: amount,
      redirect_url: process.env.REDIRECT_URL,
      billing_name: billing_name,
    };
    console.log(`Payment initated by ${billing_name} At ${new Date()} for Amount ${amount} `);
  }
  const encryptedOrder = ccav.getEncryptedOrder(orderParams);
  return { encData: encryptedOrder };
}
