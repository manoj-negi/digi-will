// import { KeystoneContext } from '@keystone-6/core/types';
// import { sendCredentialsMail } from '../utils/mail';
// const { Client } = require("@microsoft/microsoft-graph-client");
// const { TokenCredentialAuthenticationProvider } = require("@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials");
// const { ClientSecretCredential } = require("@azure/identity");

// // Load credentials from environment variables
// const credential = new ClientSecretCredential(
//   process.env.AZURE_CLIENT_ID,
//   process.env.AZURE_TENANT_ID,
//   process.env.AZURE_CLIENT_SECRET
// );
// const authProvider = new TokenCredentialAuthenticationProvider(credential, {
//   scopes: "https://graph.microsoft.com/.default"
// });

// export async function adUser(
//   root: any,
//   { data }: { data: any },
//   context: KeystoneContext
// ) {
//   const { name, email, phone, city, address, plan, amount } = data;
//   let newEmail = email.split("@")[0] + phone.substring(6, 10) + '@wn04q.onmicrosoft.com';
//   const client = Client.initWithMiddleware({
//     debugLogging: true,
//     authProvider
//   });

//   let password = 'xWwvJ]6NMw+bWH-d' + generateRandomPassword();
//   const user = {
//     accountEnabled: true,
//     displayName: name,
//     mailNickname: name,
//     userPrincipalName: newEmail,
//     passwordProfile: {
//       forceChangePasswordNextSignIn: true,
//       password: password
//     },
//     usageLocation: 'IN',
//   };

//   const userDetails = await client.api('/users').post(user);

//   const license = {
//     addLicenses: [
//       {
//         disabledPlans: [],
//         skuId: "c42b9cae-ea4f-4ab7-9717-81576235ccac"
//       }
//     ],
//     removeLicenses: []
//   };

//   if (userDetails) {
//     await client.api(`/users/${newEmail}/assignLicense`).post(license);

//     const newUser = await context.sudo().db.User.createOne({
//       data: { name, email: newEmail, password, city, address }
//     });

//     await sendCredentialsMail(email, password, name, newEmail);

//     const result = await context.sudo().db.Subscription.createOne({
//       data: {
//         plan: { connect: { id: plan } },
//         user: { connect: { id: newUser.id } },
//         amount
//       },
//     });

//     let res = await razorpayInstance.orders.create({
//       amount: result.amount,
//       currency: 'INR',
//       receipt: result.id,
//       notes: { access: 'to all' }
//     });

//     if (res) {
//       await context.sudo().db.Subscription.updateOne({
//         where: { id: result.id },
//         data: {
//           paymentId: res.id,
//           paymentStatus: res.status,
//         },
//       });
//     }

//     return await context.sudo().db.Subscription.findOne({
//       where: { id: result.id },
//     });
//   }
// }

// function generateRandomPassword() {
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefg@ijklmnopqrstuvwxyz0123456789@#$';
//   let password = '';
//   for (let i = 0; i < 4; i++) {
//     password += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return password;
// }
