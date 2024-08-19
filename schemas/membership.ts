import { text, select } from '@keystone-6/core/fields';
import { defaultAccess } from '../lib/access';

import { list } from './lib';

export const Membership = list({
  ui: {
    isHidden: ({ session }) => (session.data.isAdmin ? false : true),
  },
  access: {
    operation: {
      ...defaultAccess,
      create: () => true,
    },
  },
  fields: {
    location: select({
      options: [
        { label: 'India', value: 'India' },
        { label: 'Global', value: 'Global' },
      ],
      ui: {
        displayMode: 'segmented-control',
      },
      defaultValue: 'India',
    }),
    type: select({
      options: [
        { label: 'Individual', value: 'individual' },
        { label: 'Corporate', value: 'corporate' },
      ],
      ui: {
        displayMode: 'segmented-control',
      },
      defaultValue: 'India',
    }),
    name: text(),
    phone: text(),
    email: text(),
    designation: text(),
    company: text(),
    pincode: text(),
    city: text(),
    state: text(),
    country: text(),
    address: text(),
  },
});
