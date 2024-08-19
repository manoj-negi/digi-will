import { text, checkbox, relationship } from '@keystone-6/core/fields';
import { list } from './lib';
import { access } from '../lib/access';
import { defaultAccess } from '../lib/access';

export const OneTimePassword = list({
  access:{
    operation: {
      ...defaultAccess,
      query: access.isAdmin
    }
  },
  ui: {
    isHidden: ({ session }) => (session.data.isAdmin ? false : true),
  },
  fields: {
    otp: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
      isFilterable: true,
    }),
    email: text({ validation: { isRequired: true } }),
    isUsed: checkbox({ defaultValue: false }),
    user: relationship({ ref: 'User' }),
  },
});
