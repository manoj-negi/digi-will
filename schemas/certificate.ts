import { relationship, timestamp, file } from '@keystone-6/core/fields';
import { access, defaultAccess } from '../lib/access';

import { list } from './lib';
import { certificates } from '../lib/s3-images';
import { s3File } from '@k6-contrib/fields-s3';

export const Certificate = list({
  ui: {
    isHidden: ({ session }) => (session.data.isAdmin ? false : true),
  },
  access: {
    operation: {
      ...defaultAccess,
      create: access.isLoggedIn,
    },
    filter: {
      query: access.userIsAdminOrSelfOrOwnerFilter,
    },
  },
  fields: {
    user: relationship({ ref: 'User.certificate' }),
    certificate: s3File({ s3Config: certificates }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
  },
});
