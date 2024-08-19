
import { Context } from '.keystone/types';
export const authMutations = `
  verifyOtp(email:String! otp:String!): AuthType
`;
export const AuthType = `
  type AuthType {
    token: String!
    user: User!
  }
`;

export async function verifyOtp(
  root: any,
  { email, otp }: { email: string; otp: string },
  context: Context
) {
  const sudo = context.sudo();
  if (email && otp) {
    let otpResponse = await sudo.query.OneTimePassword.findOne({
      where: { otp },
      query: 'id user {id name email isVerified isAdmin subscription { plan { id } }} isUsed',
    });
    //******** */ If otp is not found on db
    if (!otpResponse) {
      throw new Error('Wrong otp');
    }
    //******** */ If otp is used
    if (otpResponse.isUsed) {
      throw new Error('otp is used');
    }
    // ******** If otp ise unused
    if (!otpResponse.isUsed) {
      let user = await sudo.db.User.findOne({
        where: { id: otpResponse.user.id },
        // query:
        //   'id name username  email isAdmin city state country address pincode subscription { id }', // plan { id video { srNo name id url { url }}}  
      });

      await sudo.query.OneTimePassword.updateOne({ where: { otp }, data: { isUsed: true } });
      await sudo.query.User.updateOne({ where: { id: otpResponse.user.id }, data: { isVerified: true } });
      context.session = { ...context.session, listKey: 'User', itemId: user?.id, data: otpResponse.user };
      const newToken = await context.sessionStrategy?.start({ data: { listKey: 'User', itemId: user?.id }, context });
      if (newToken) {
        return { user, token: newToken };
      }
    }
  }
  return null;
}
