import { text, timestamp, select } from '@keystone-6/core/fields';
import { access, defaultAccess } from '../lib/access';

import { list } from './lib';

export const Config = list({
  ui: {
    isHidden: ({ session, context }) => (session.data.isAdmin ? false : true),
  },
  access: {
    operation: {
      ...defaultAccess,
      create: access.isAdmin,
    },
  },
  fields: {
    key: select({
      options: [
        { label: 'Container', value: 'Container' },
        { label: 'License', value: 'License' },
      ],
      isIndexed: 'unique',
      validation: { isRequired: true },
    }),
    value: text({ validation: { isRequired: true } }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
  },
});
