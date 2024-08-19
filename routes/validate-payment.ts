const nodeCCAvenue = require('node-ccavenue');
const ccav = new nodeCCAvenue.Configure({
  working_key: process.env.WORKING_KEY,
  merchant_id: process.env.MERCHANT_ID,
});
export const ValidatePayment = (req: any, res: any) => {
  const { encResp } = req.body;
  const decryptedJsonResponse = ccav.redirectResponseToJson(encResp);
  console.log(
    `decryptedJsonResponse from ccav after payment and before adding subscription ${decryptedJsonResponse} `
  );
  res.redirect(`/ccav/success/${encResp}`);
};
