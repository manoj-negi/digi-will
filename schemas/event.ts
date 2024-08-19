import { text, timestamp } from '@keystone-6/core/fields';
import { list } from './lib';
import { defaultAccess } from '../lib/access';
import { s3Image } from '@k6-contrib/fields-s3';
import { eventImages } from '../lib/s3-images';

export const Event = list({
  access: {
    operation: defaultAccess,
  },
  ui: {
    isHidden: ({ session }) => (session.data.isAdmin ? false : true),
  },
  fields: {
    title: text(),
    subTitle: text(),
    startDate: timestamp({ defaultValue: { kind: 'now' } }),
    endDate: timestamp({ defaultValue: { kind: 'now' } }),
    url: text(),
    information: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    image: s3Image({ s3Config: eventImages }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
  },
});
