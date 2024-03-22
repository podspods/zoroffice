import React from 'react';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import {
  markAllAsRead,
  markAsRead,
  markAsUnRead,
  toggleRead
} from './notifications.store';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import { Notification, ToolbarButton } from './notifications.type';

export const PAGE_NAME = 'Notification';
export const REFRESH = 'Refresh';
export const MARK = 'Mark';
export const MARK_AS_READ = 'Mark as read';
export const MARK_AS_UNREAD = 'Mark as unread';
export const MARK_ALL_AS_READ = 'Mark all as read';
export const LEVEL = 'Level';
export const READ = 'Read';
export const NOT_READ = 'not read';
export const NOTIFICATIONS = 'Notifications';
export const INSERTED_AT = 'Inserted at';
export const FIELD_INSERTED_AT = 'insertedAt';
export const FIELD_LEVEL = 'level';
export const FIELD_MESSAGE = 'message';
export const FIELD_READ = 'read';


export const SHOWING = 'Showing';
export const TO = 'to';
export const OF = 'of';
export const NEXT = 'Next';
export const HOURS_AGO = 'Hours ago';
export const DAYS_AGO = 'Days ago';
export const SEARCH = 'Search';
export const DELETE = 'delete';
export const FETCHING = 'fetching in progress ...';
export const FETCHING_DONE = 'fetching success';

export const SUCCESS_COLOR = 'green';
export const ERROR_COLOR = 'red';
export const INFO_COLOR = 'blue';
export const SUCCESS = 'success';
export const ERROR = 'error';
export const INFO = 'info';
export const ALL = 'all';
export const LOADING = 'loading';
export const NEVER = 'never';

export const URL_HOST = 'localhost';
export const URL_PROTOCOLE = 'https';
export const URL_PORT = '3450';

export const SUCCESS_TEXT = SUCCESS;
export const ERROR_TEXT = ERROR;
export const INFO_TEXT = INFO;
export const ALL_TEXT = ALL;

export const ID_COMPONENT = 10000;
export const ID_MARK_AS_READ = ID_COMPONENT + 1;
export const ID_MARK_AS_UNREAD = ID_COMPONENT + 2;
export const ALL_LEVEL = 0;
export const SUCCESS_LEVEL = ALL_LEVEL + 1;
export const ERROR_LEVEL = ALL_LEVEL + 2;
export const INFO_LEVEL = ALL_LEVEL + 3;

export const PAGINATION_STEP = [5, 10, 25, 50, 100];

export const optionList = [MARK_AS_UNREAD, MARK_AS_UNREAD];

// export const toolbarElement = [
//   {
//     label: MARK_AS_READ,
//     disable: false,
//     onClick: markAsRead
//   },
//   {
//     label: MARK_AS_UNREAD,
//     disable: false,
//     onClick: markAsUnRead
//   },
//   {
//     label: MARK_ALL_AS_READ,
//     disable: false,
//     onClick: markAllAsRead
//   }
// ];

// export const levelList: Item[] = [
//   { id: ALL_LEVEL, label: '    ' + ALL_TEXT + '    ' },
//   { id: getLevelId(SUCCESS), label: SUCCESS_TEXT },
//   { id: getLevelId(INFO), label: INFO_TEXT },
//   { id: getLevelId(ERROR), label: ERROR_TEXT}
// ];
export const leftActionList: RowAction<Notification>[] = [
  {
    label: MARK_AS_READ,
    icon: <PlusIcon />,
    onClick: (params) => void toggleRead(params[0].id, true),
    disable: () => true
  },
  {
    label: MARK_AS_UNREAD,
    icon: <PlusIcon />,
    onClick: (params) => void toggleRead(params[0].id, false),
    disable: () => true
  }
];
