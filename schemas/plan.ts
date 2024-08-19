import { text, relationship, select, float, integer } from '@keystone-6/core/fields';

import { list } from './lib';

export const Plan = list({
  ui: {
    isHidden: ({ session, context }) => (session.data.isAdmin ? false : true),
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    srNo: integer(),
    random: select({
      options: [
        { label: 'True', value: 'True' },
        { label: 'False', value: 'False' },
      ],
      ui: {
        displayMode: 'segmented-control',
      },
      defaultValue: 'False',
    }),
    price: float({ validation: { isRequired: true } }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    subscription: relationship({ ref: 'Subscription.plan', many: true }),
    video: relationship({ ref: 'Video.plan', many: true }),
  },
});
