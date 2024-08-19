import { text, relationship, timestamp, float } from '@keystone-6/core/fields';
import { access, defaultAccess } from '../lib/access';

import { list } from './lib';

export const Subscription = list({
  ui: {
    isHidden: ({ session, context }) => (session.data.isAdmin ? false : true),
  },
  access: {
    operation: defaultAccess,
    filter: {
      query: access.userIsAdminOrSelfOrOwnerFilter,
    },
  },
  fields: {
    plan: relationship({ ref: 'Plan.subscription' }),
    user: relationship({ ref: 'User.subscription' }),
    paymentStatus: text(),
    paymentId: text(),
    amount: float({ validation: { isRequired: true } }),
    transactionDate: timestamp({ defaultValue: { kind: 'now' } }),
  },
});
