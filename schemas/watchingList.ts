import { text, relationship, select } from '@keystone-6/core/fields';
import { access, defaultAccess } from '../lib/access';

import { list } from './lib';

export const WatchingList = list({
  ui: {
    isHidden: ({ session, context }) => (session.data.isAdmin ? false : true),
  },
  access: {
    operation: {
      ...defaultAccess,
      create: access.isLoggedIn,
      update: access.isLoggedIn,
    },
    filter: {
      query: access.userIsAdminOrSelfOrOwnerFilter,
      update: access.userIsAdminOrSelfOrOwnerFilter,
    },
  },
  fields: {
    video: relationship({ ref: 'Video' }),
    user: relationship({ ref: 'User' }),
    duration: text(),
    watchtime: text(),
    status: select({
      options: [
        { label: 'InProgress', value: 'InProgress' },
        { label: 'Complete', value: 'Complete' },
      ],
      ui: {
        displayMode: 'segmented-control',
      },
      defaultValue: 'InProgress',
    }),
  },
});
