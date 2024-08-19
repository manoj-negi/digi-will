import { notificationImages } from './../lib/s3-images';
import { text, timestamp } from '@keystone-6/core/fields';
import { list } from './lib';
import { document } from '@keystone-6/fields-document';
import { componentBlocks } from '../component-blocks';
import { s3Image } from '@k6-contrib/fields-s3';
import { defaultAccess } from '../lib/access';

export const Notification = list({
  access: { operation: defaultAccess },
  ui: {
    isHidden: ({ session }) => (session.data.isAdmin ? false : true),
  },
  fields: {
    title: text(),
    date: timestamp({ validation: { isRequired: true }, defaultValue: { kind: 'now' } }),
    description: document({
      formatting: {
        inlineMarks: {
          bold: true,
          italic: true,
          underline: true,
        },
        headingLevels: [1, 2, 3],
      },
      links: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
      ],
      ui: {
        views: './component-blocks',
      },
      componentBlocks,
    }),
    image: s3Image({ s3Config: notificationImages }),
  },
});
