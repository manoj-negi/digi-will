// import { KeystoneContext } from '@keystone-6/core/types';
// import { razorpayInstance } from '../lib/razor-pay';
// import { customAlphabet } from 'nanoid';
// export const orederId = `createOrder( amount: Float! ): orderIdType`;
// export const orderIdType = `
//   type orderIdType {
//       id: String!
//   }
// `;
// export async function createOrder(
//   root: any,
//   { amount }: { amount: any },
//   context: KeystoneContext
// ) {
//   const alphabet = '123456789ABCDEFGHJKLMNOPQRSTUVWXYZ';
//   const nanoid = customAlphabet(alphabet, 10);
//   const receipt = await nanoid();
//   let res = await razorpayInstance.orders.create(
//     { amount: amount, currency: 'INR', receipt: receipt, notes: { access: 'to all' } }
//   );
//   return { id: res.id }
// }
