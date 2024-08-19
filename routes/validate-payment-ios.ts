import type { KeystoneContext } from '@keystone-6/core/types';
const nodeCCAvenue = require('node-ccavenue');
const ccav = new nodeCCAvenue.Configure({
  working_key: process.env.WORKING_KEY,
  merchant_id: process.env.MERCHANT_ID,
});
// const context = (req as any).context as KeystoneContext;
//     const sudo = context.sudo()

export const ValidatePaymentIos = (req: any, res: any) => {
  const { encResp } = req.body;
  const decryptedJsonResponse = ccav.redirectResponseToJson(encResp);
  // res.redirect( `/ccav/success/${encResp}`)
  // if(true){
  //   const subscription: any = await sudo.db.Subscription.createOne({
  //       data: { amount, paymentId, paymentStatus, user: { connect: { id: newUser.id } }, plan: { connect: { id: planId } } }
  //     });
  // }
};
