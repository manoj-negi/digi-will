import { text, relationship, select, integer, checkbox } from '@keystone-6/core/fields';
import { defaultAccess } from '../lib/access';
import { s3Image, s3File } from '@k6-contrib/fields-s3';
import { list } from './lib';
import { videoThumbnail, videosConfig } from '../lib/s3-images';

export const Video = list({
  access: {
    operation: defaultAccess,
    filter: {
      query: async ({ session, context, listKey }: any) => {
        if (session?.data?.isAdmin) {
          return true;
        }
        if (!session?.data?.isAdmin) {
          let plans: any = [];
          session?.data?.subscription?.map((item: any) => {
            plans.push(item.plan.id);
          });
          return {
            OR: [{ plan: { id: { in: plans } } }, { isPublic: { equals: true } }],
          };
        }
      },
    }
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    srNo: integer(),
    video_type: select({
      options: [
        { label: 'Cloud', value: 'cloud' },
        { label: 'Youtube', value: 'youtube' },
      ],
      ui: {
        displayMode: 'segmented-control',
      },
      defaultValue: 'youtube',
    }),
    isPublic: checkbox(),
    isFeatured: checkbox(),
    videoId: text(),
    url: s3File({ s3Config: videosConfig }),
    thumbnail: s3Image({ s3Config: videoThumbnail }),
    plan: relationship({ ref: 'Plan.video' }),
  },
  hooks: {
    resolveInput: async ({ listKey, operation, inputData, item, resolvedData, context }) => {
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
