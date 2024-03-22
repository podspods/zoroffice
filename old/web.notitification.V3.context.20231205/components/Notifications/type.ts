
type TypeDefinition = {
  type: string;
  value: string | number;
  label?: string;
};

type Data = {
  [key: string]: TypeDefinition | undefined;
  filename?: TypeDefinition;
  type?: TypeDefinition;
  id?: TypeDefinition;
  upgradeId?: TypeDefinition;
  err?: TypeDefinition;
  hostname?: TypeDefinition;
  tr?: TypeDefinition;
  n?: TypeDefinition;
  nb?: TypeDefinition;
  sn?: TypeDefinition;
  p?: TypeDefinition;
  url?: TypeDefinition;
};

export type Str = {
  display: string;
  data: Data;
  v: number;
};

export type NotificationInput = {
  id: string;
  insertedAt: string;
  level: string;
  str?: Str;
  read: boolean;
  pushed?: boolean;
};

export enum notificationsRoute {
  LIST = '/node/notifications/list',
  READ = '/node/notification/read',
  UNREAD = '/node/notification/unread',
  READ_ALL = '/node/notification/read/all'
}

export enum NotificationColumn {
  LEVEL = 'level',
  READ = 'read',
  MESSAGE = 'message',
  STR = 'str',
  INSERTED_AT = 'insertedAt'
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}

export enum Status {
  SUCCESS = 'success',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  ERROR = 'error',
  INFO = 'info',
  DEFAULT = 'default',
  ALL = 'all level'
}

export type TypeRoute = {
  tag: string;
  value: string;
};
