import { text, timestamp } from '@keystone-6/core/fields';
import { list } from './lib';
import { endOfDay } from 'date-fns';
import { defaultAccess } from '../lib/access';

export const Quote = list({
  access: {
    operation: defaultAccess,
    filter: {
      query: async ({ session }) => {
        let todayDate = endOfDay(new Date());
        if (!session?.data?.isAdmin) {
          return { date: { lte: todayDate } };
        } else {
          return true;
        }
      },
    },
  },
  ui: {
    isHidden: ({ session, context }) => (session.data.isAdmin ? false : true),
  },
  fields: {
    quote: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    date: timestamp({ validation: { isRequired: true } }),
  },
});
