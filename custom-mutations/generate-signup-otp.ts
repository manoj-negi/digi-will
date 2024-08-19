import { KeystoneContext } from '@keystone-6/core/types';
import { customAlphabet } from 'nanoid';
import { sendOtpMail } from "../utils/mail";
export const generateSignupOtpMutation = `
generateSignupOtp(name: String, email: String!, phone: String, pincode: String, city: String, state: String, country: String, address: String,organization:String): generateSignupOtpType
`;
export const generateSignupOtpType = `
  type generateSignupOtpType {   
    message:String!
    email:String
    isVerified:Boolean
  }
`;
export async function generateSignupOtp(
    root: any,
    { email, name, phone, pincode, city, state, country, address, organization }: { name: string, email: string, phone: string, pincode: string, city: string, state: string, country: string, address: string, organization: String },
    context: KeystoneContext
) {
    const sudo = context.sudo();
    const isUser = await sudo.query.User.findOne({ where: { email }, query: 'id name isVerified email isAdmin city state country address pincode subscription { plan { id video { srNo name id url { url }}}  }' });
    if (email) {
        if (!isUser) {
            var password = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefg@ijklmnopqrstuvwxyz0123456789!@#$';
            var charactersLength = characters.length;
            for (var i = 0; i < 6; i++) {
                password += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            password = 'W' + password + '!';
            const newUser: any = await sudo.db.User.createOne({
                data: { name, email, password, pincode, phone, city, state, country, address, organization }
            });
            const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const nanoid = customAlphabet(alphabet, 6);
            const otp = nanoid();
            let response = await sudo.query.OneTimePassword.createOne({
                data: { user: { connect: { id: newUser.id } }, otp, email }, query: 'id otp'
            })
            sendOtpMail(email, newUser.name, response.otp)
            return { email, message: "Otp sent successfully" }
        }else{
            throw { message: 'User is not verified', isVerified: isUser.isVerified }
        }
    }
    return { message: "User not found", email: "" }
}