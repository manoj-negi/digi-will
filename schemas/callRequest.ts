import { text } from '@keystone-6/core/fields';
import { list } from './lib';
import { access, defaultAccess } from '../lib/access';
import { sendCallRequestMail } from '../utils/callRequestMail';
import { sendCallRequestUserMail } from '../utils/callRequestUserMail';

export const CallRequest = list({
  ui: {
    isHidden: ({ session }) => (session.data.isAdmin ? false : true),
  },
  access: {
    operation: { ...defaultAccess, create: () => true },
  },
  fields: {
    name: text(),
    email: text(),
    phoneNumber: text(),
    message: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    time: text(),
  },
  hooks: {
    afterOperation: async ({ operation, item }) => {
      if (operation == 'create') {
        await sendCallRequestMail({ item });
        await sendCallRequestUserMail({ item });
      }
    },
  },
});
