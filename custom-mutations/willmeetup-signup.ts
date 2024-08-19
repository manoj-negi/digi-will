import { KeystoneContext } from '@keystone-6/core/types';
import { customAlphabet } from 'nanoid';
import { sendOtpMail } from "../utils/mail";

export const generateOtpReturnType = `
  type generateOtpType {   
    email:String
  }
`;

export const willmeetupSignupType = `
willmeetupSignup( name: String, email: String, phone: String, organization:String): User`;
export async function willmeetupSignup(
    root: any,
    {
        name,
        email,
        phone,
      organization,
    }: {
        name: string;
        email: string;
        phone: string;
        organization: String;
    },
    context: KeystoneContext
) {
    const sudo = context.sudo();
    if (name && email) {
        try {
            // ***** If User already exist *** //
            const user = await sudo.db.User.findOne({
                where: { email: email },
                query: 'name email',
            });
            if (user) {
                throw new Error("User already exist with this email")
            }
            else {
                var password = '';
                var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefg@ijklmnopqrstuvwxyz0123456789!@#$';
                var charactersLength = characters.length;
                for (var i = 0; i < 6; i++) {
                    password += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                password = 'W' + password + '!';
                const newUser: any = await sudo.db.User.createOne({
                    data: { name, email, password, phone, organization }
                });
                const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                const nanoid = customAlphabet(alphabet, 6);
                const otp = nanoid();
                let response = await sudo.query.OneTimePassword.createOne({
                    data: { user: { connect: { id: newUser.id } }, otp, email }, query: 'id otp'
                })
                sendOtpMail(email, newUser.name, response.otp)
                return { email, user: newUser }
            }

        } catch (error) {
            console.log('error in verifying payment', error);
            throw new Error(error.message)
        }
    }
    return null;
}
