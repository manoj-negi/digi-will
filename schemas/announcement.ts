import { text, timestamp, select, image } from '@keystone-6/core/fields';
import { list } from './lib';
import { endOfDay } from 'date-fns';
import { s3Image } from '@k6-contrib/fields-s3';
import { anouncementImages } from '../lib/s3-images';
import { defaultAccess } from '../lib/access';

export const Announcement = list({
  access: {
    operation:defaultAccess,
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
    isHidden: ({ session }) => (session.data.isAdmin ? false : true),
  },
  fields: {
    title: text(),
    date: timestamp({ validation: { isRequired: true }, defaultValue: { kind: 'now' } }),
    information: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    linkType: select({
      options: [
        { label: 'app', value: 'app' },
        { label: 'web', value: 'web' },
      ],
      ui: {
        displayMode: 'segmented-control',
      },
    }),
    link: text(),
    linkTarget: text(),
    image: s3Image({ s3Config: anouncementImages }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
  },
});
