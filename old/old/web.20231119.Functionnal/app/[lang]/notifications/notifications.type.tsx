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
  hostname?: TypeDefinition;
  tr?: TypeDefinition;
  n?: TypeDefinition;
  nb?: TypeDefinition;
  sn?: TypeDefinition;
  p?: TypeDefinition;
  url?: TypeDefinition;
  // profile?: TypeDefinition;
  // tm?: TypeDefinition;
  // node?: TypeDefinition;
  // nodeView?: TypeDefinition;
  // fileTranslation?: TypeDefinition;
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

export type ZNotificationDisplay = {
  id: string;
  level: string;
  read: boolean;
  // message: JSX.Element;
  message: string;
  insertedAt: string;
};

export enum notificationsRoute {
  // LIST = '/notifications/list',
  // READ = '/notification/read',
  // UNREAD = '/notification/unread',
  // READ_ALL = '/notification/read/all',
  LIST = '/node/notifications/list',
  READ = '/node/notification/read',
  UNREAD = '/node/notification/unread',
  READ_ALL = '/node/notification/read/all'
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

export const typeRoute = {
  profile: '/profilesManagement',
  tm: '/resourcesManagement/translationMemory/',
  tr: '/advancedConfiguration/translationResources/',
  node: '/advancedConfiguration/computingNode/',
  nodeView: '/advancedConfiguration/computingNode/view/',
  fileTranslation: '/translationTools/file/'
};

