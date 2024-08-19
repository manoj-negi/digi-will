import { text, timestamp, checkbox, select } from '@keystone-6/core/fields';
import { list } from './lib';
import { allowAll } from '@keystone-6/core/access';
import { s3Image } from '@k6-contrib/fields-s3';
import { BannerImages } from '../lib/s3-images';

export const Banner = list({
  access: allowAll,
  ui: {
    isHidden: ({ session }) => (session.data.isAdmin ? false : true),
  },
  fields: {
    name: text(),
    banner_type: select({
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
      ],
      ui: {
        displayMode: 'segmented-control',
      },
      defaultValue: 'image',
    }),
    videoId: text(),
    image: s3Image({ s3Config: BannerImages }),
    active: checkbox(),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
  },
  hooks: {
    resolveInput: async ({ operation, resolvedData }) => {
      /* ... */
      if (operation == 'create' || operation == 'update') {
        if (resolvedData?.videoId?.split('v=')[1]) {
          let video_id = resolvedData?.videoId?.split('v=')[1];
          let ampersandPosition = video_id.indexOf('&');
          if (ampersandPosition != -1) {
            video_id = video_id.substring(0, ampersandPosition);
          }
          resolvedData.videoId = video_id;
        }
      }
      return resolvedData;
    },
  },
});
