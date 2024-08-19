import { BaseListTypeInfo, ListFilterAccessControl } from '@keystone-6/core/types';

// TODO: Can we generate this type based on withItemData in the main config?
export type Session = {
  itemId: string;
  listKey: string;
  data: {
    id: string;
    name: string;
    isAdmin: boolean;
  };
};

export type AccessArgs = {
  session?: Session;
  item?: any;
};

export type ListAccessArgs = {
  itemId?: string;
  session?: Session;
  listKey?: string;
};

export const userIsAdminOrSelfOrOwnerFilter: ListFilterAccessControl<
  'query' | 'update',
  BaseListTypeInfo
> = ({ session, listKey }: ListAccessArgs) => {
  // no access to not logged in user
  if (!session) return false;

  // if admin return true
  if (!!session?.data?.isAdmin) return true;

  // if the user is self
  if (listKey === 'User') {
    return { id: { equals: session.itemId } };
  }

  return { user: { id: { equals: session.itemId } } };
};

export const access = {
  isAdmin: ({ session }: AccessArgs) => Boolean(session?.data?.isAdmin),
  isLoggedIn: ({ session }: AccessArgs) => Boolean(session?.data),
  userIsAdminOrSelfOrOwnerFilter,
};

export const defaultAccess = {
  query: () => true,
  update: access.isAdmin,
  create: access.isAdmin,
  delete: access.isAdmin,
};
