import { KeystoneContext } from '@keystone-6/core/types';
import { customAlphabet } from 'nanoid';
import { sendOtpMail } from '../utils/mail';
export const generateOtpMutation = `
generateOtp(email: String!): generateOtpType
`;
export const generateOtpType = `
  type generateOtpType {   
    message:String!
    email:String
  }
`;
export async function generateOtp(
  root: any,
  { email }: { email: string },
  context: KeystoneContext
) {
  const sudo = context.sudo();
  if (email) {
    let user = await sudo.query.User.findOne({
      where: { email },
      query:
        'id name  email isAdmin city state country address pincode subscription { plan { id video { srNo name id url { url }}}  }',
    });
    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }
    if (user) {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const nanoid = customAlphabet(alphabet, 6);
      const otp = nanoid();
      let response = await sudo.query.OneTimePassword.createOne({
        data: { user: { connect: { id: user.id } }, otp, email },
        query: 'id otp',
      });
      sendOtpMail(email, user.name, response.otp);
      return { email, message: 'Otp sent successfully' };
    }
  }
  return { message: 'User not found', email: '' };
}
