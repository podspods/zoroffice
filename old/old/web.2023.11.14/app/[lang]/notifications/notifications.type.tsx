import { ReactNode } from 'react';

type TypeDefinition = {
  type: string;
  value: string | number;
  label?: string;
};
type Data = {
  filename?: TypeDefinition;
  type?: TypeDefinition;
  id?: TypeDefinition;
  upgradeId?: TypeDefinition;
  err?: TypeDefinition;
};

type Str = {
  display: string;
  data: Data;
  v: number;
};

export type Notification = {
  id: string;
  insertedAt: string;
  level: string;
  str?: Str;
  read: boolean;
  pushed?: boolean;
};

export enum notificationsRoute {
  // LIST = '/notifications/list',
  // READ = '/notification/read',
  // UNREAD = '/notification/unread',
  // READ_ALL = '/notification/read/all',
  LIST = '/node/notifications/list',
  READ = '/node/notification/read',
  UNREAD = '/node/notification/unread',
  READ_ALL = '/node/notification/read/all',
}

export type ToolbarButton = {
  id: number;
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  disable?: () => boolean;
};

export enum NotificationColumn {
  LEVEL = 'level',
  READ = 'read',
  MESSAGE = 'message',
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
  DEFAULT = 'default'
}