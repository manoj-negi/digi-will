import type { KeystoneContext } from '@keystone-6/core/types';
import { Request, Response } from 'express';
const nodeCCAvenue = require('node-ccavenue');
import { customAlphabet } from 'nanoid';

const ccav = new nodeCCAvenue.Configure({
  working_key: process.env.WORKING_KEY as string, // Type assertion
  merchant_id: process.env.MERCHANT_ID as string, // Type assertion
});

export const paymentCapture = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    const planId = req.query.planId as string;
    const context = (req as any).context as KeystoneContext;
    const sudo = context.sudo();

    const userDetails = await sudo.query.User.findOne({
      where: { id: userId },
      query: 'id name email azureId',
    });

    if (!userDetails) {
      return res.status(404).send('User not found');
    }

    const planDetails = await sudo.query.Plan.findOne({
      where: { id: planId },
      query: 'id name price',
    });

    if (!planDetails) {
      return res.status(404).send('Plan not found');
    }

    const alphabet = '123456789ABCDEFGHJKLMNOPQRSTUVWXYZ';
    const nanoid = customAlphabet(alphabet, 10);
    const orderId = nanoid();

    // const redirectUrl = process.env.REDIRECT_URL;
    const redirectUrl = process.env.REDIRECT_URL;
    if (!redirectUrl) {
      throw new Error('Redirect URL is not defined in environment variables');
    }
    
    const orderParams = {
      order_id: orderId,
      currency: 'INR',
      amount: planDetails.price,
      redirect_url: redirectUrl,
      billing_name: userDetails.name,
    };

    console.log("order params============================",orderParams)

    const encryptedOrder = ccav.getEncryptedOrder(orderParams);
    console.log('encryptedOrder', ccav.redirectResponseToJson(encryptedOrder));

    res.render('../payment-pages/payment.html', {
      encReq: encryptedOrder,
      accessCode: process.env.ACCESS_CODE as string,
    });
  } catch (error) {
    console.error('Error occurred while processing payment:', error);
    res.status(500).send('Internal server error');
  }
};
