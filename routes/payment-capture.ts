import type { KeystoneContext } from '@keystone-6/core/types';
const nodeCCAvenue = require('node-ccavenue');
import { customAlphabet } from 'nanoid';
const ccav = new nodeCCAvenue.Configure({
  working_key: process.env.WORKING_KEY,
  merchant_id: process.env.MERCHANT_ID,
});
export const paymentCapture = async (req: any, res: any) => {
  const userId = req.query.userId;
  const planId = req.query.planId;
  const context = (req as any).context as KeystoneContext;
  const sudo = context.sudo();
  const userDetails = await sudo.query.User.findOne({
    where: {
      id: userId,
    },
    query: 'id name email azureId',
  });
  const planDetails = await sudo.query.Plan.findOne({
    where: {
      id: planId,
    },
    query: 'id name price',
  });
  const alphabet = '123456789ABCDEFGHJKLMNOPQRSTUVWXYZ';
  const nanoid = customAlphabet(alphabet, 10);
  const orderId = await nanoid();
  const orderParams = {
    order_id: orderId,
    currency: 'INR',
    amount: planDetails.price,
    redirect_url: encodeURIComponent(process.env.redirectUrl),
    billing_name: userDetails.name,
  };
  const encryptedOrder = ccav.getEncryptedOrder(orderParams);
  console.log('encryptedOrder', ccav.redirectResponseToJson(encryptedOrder));
  //   res.render(__dirname + "/payment-pages/payment.html", {name:name});
  res.render('../payment-pages/payment.html', {
    encReq: encryptedOrder,
    accessCode: process.env.ACCESS_CODE,
  });
  //    res.sendFile( `payment-pages/payment.html`, { root: '.' })
};
