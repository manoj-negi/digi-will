import { text, relationship, password, checkbox } from '@keystone-6/core/fields';
import { access } from '../lib/access';

import { list } from './lib';

export const User = list({
  ui: {
    isHidden: ({ session }) => (session.data.isAdmin ? false : true),
    listView: {
      initialColumns: ['name', 'email', 'isAdmin'],
    },
  },
  access: {
    operation: {
      create: access.isAdmin,
      update: access.isLoggedIn,
      delete: access.isAdmin,
      query: access.isLoggedIn,
    },
    filter: {
      query: access.userIsAdminOrSelfOrOwnerFilter,
      update: access.userIsAdminOrSelfOrOwnerFilter,
    }
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
      isFilterable: true,
    }),
    username: text(),
    azureId: text(),
    phone: text(),
    pincode: text(),
    city: text(),
    state: text(),
    country: text(),
    address: text(),
    organization: text(),
    password: password({ validation: { isRequired: true } }),
    isAdmin: checkbox(),
    isVerified: checkbox(),
    subscription: relationship({ ref: 'Subscription.user', many: true }),
    certificate: relationship({ ref: 'Certificate.user', many: true }),
  },
});
