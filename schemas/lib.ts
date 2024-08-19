import { configureTracking } from '@k6-contrib/list-plugins';
import { BaseFields, ListConfig, list as listOrig } from '@keystone-6/core';
import { BaseListTypeInfo } from '@keystone-6/core/types';

import { access, defaultAccess } from '../lib/access';

export const withTracking = configureTracking({
  atTrackingOptions: { isIndexed: true },
});

/**
 * default list config with tracking and admin access only, use access to override it, by default every thing is orderable and filterable
 */
export function list<
  Fields extends BaseFields<ListTypeInfo>,
  ListTypeInfo extends BaseListTypeInfo
>(config: ListConfig<ListTypeInfo, Fields>): ListConfig<ListTypeInfo, any> {
  return listOrig(
    withTracking({
      access: {
        operation: defaultAccess,
      },
      ...(config as any),
    })
  );
}
