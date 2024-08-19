import { text } from '@keystone-6/core/fields';
import { list } from './lib';
import { access, defaultAccess } from '../lib/access';
import { sendWillMeetUpMail } from '../utils/willmeetupMail';
import { sendWillMeetUpUserMail } from '../utils/willmeetupUserMail';
export const WillMeetUp = list({
  ui: {
    isHidden: ({ session, context }) => (session.data.isAdmin ? false : true),
  },
  access: {
    operation: {
      ...defaultAccess,
      create: () => true,
    },
  },
  fields: {
    name: text(),
    email: text(),
    phoneNumber: text(),
    organization: text({ validation: { isRequired: true } }),
    // willMeetUpId: text()
  },
  hooks: {
    // resolveInput: async ({
    //   operation,
    //   resolvedData,
    //   context,
    // }) => {
    //   if(operation=='create'){
    //    const countArray = await (await context.sudo().db.WillMeetUp.findMany()).length
    //     resolvedData.willMeetUpId= `WillMeetUp-${countArray+1}`
    //   }
    //   return resolvedData;
    // },
    afterOperation: async ({ operation, item }) => {
      if (operation == 'create') {
        await sendWillMeetUpMail({ item });
        await sendWillMeetUpUserMail({ item });
      }
    },
  },
});
