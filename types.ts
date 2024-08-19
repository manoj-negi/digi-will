export type Session = {
  itemId: string;
  listKey: string;
  data: {
    isAdmin: boolean;
  };
};

export type AccessArgs = {
  session?: Session;
  item?: any;
};

export type AccessControl = {
  [key: string]: (args: AccessArgs) => any;
};

export type ListAccessArgs = {
  itemId?: string;
  session?: Session;
};
