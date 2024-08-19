import { text, timestamp } from '@keystone-6/core/fields';
import { list } from './lib';
import { s3Image } from '@k6-contrib/fields-s3';
import { bulletinImages } from '../lib/s3-images';
import { defaultAccess } from '../lib/access';

export const Bulletin = list({
  access: { operation: defaultAccess },
  ui: {
    isHidden: ({ session, context }) => (session.data.isAdmin ? false : true),
  },
  fields: {
    title: text(),
    subTitle: text(),
    url: text(),
    image: s3Image({ s3Config: bulletinImages }),
    information: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
  },
});
