import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import { NotificationInput, Status, TypeRoute } from './type';
import ButtonMarkAsRead from './components/ButtonMarkAsRead';
import ButtonMarkAsUnRead from './components/ButtonMarkAsUnRead';

export const PAGE_NAME = 'Notification';
export const REFRESH = 'Refresh';
export const MARK = 'Mark';
export const MARK_AS_READ = 'Mark as read';
export const MARK_AS_UNREAD = 'Mark as unread';
export const MARK_ALL_AS_READ = 'Mark all as read';
export const LEVEL = 'Level';
export const READ = 'Read';
export const UNREAD = 'Unread';
export const NOTIFICATIONS = 'Notifications';
export const INSERTED_AT = 'Inserted at';
export const SEARCH = 'Search';

export const ERROR = 'Error';
export const INFO = 'info';
export const ALL = 'all';
export const LOADING = 'loading';
export const NEVER = 'never';

export const URL_HOST = 'localhost';
export const URL_PROTOCOLE = 'https';
export const URL_PORT = '3450';
export const SPACE = '&#20;';
export const ALL_LEVEL = 'all Level';
export const DURATION_SEARCH = 1000; // in milliseconds
export const PAGINATION_STEP = [5, 10, 25, 50, 100];
export const actionList: RowAction<NotificationInput>[] = [
  ButtonMarkAsRead(),
  ButtonMarkAsUnRead()
];

export const LEVEL_LIST: Status[] = [
  Status.ALL,
  Status.SUCCESS,
  Status.ERROR,
  Status.INFO,
  Status.DEFAULT
];

export const typeRoute: TypeRoute[] = [
  { tag: 'profiler', value: '/profilesManagement/' },
  { tag: 'tm', value: '/resourcesManagement/translationMemory/' },
  { tag: 'tr', value: '/advancedConfiguration/translationResources/' },
  { tag: 'node', value: '/advancedConfiguration/computingNode/' },
  { tag: 'nodeView', value: '/advancedConfiguration/computingNode/view/' },
  { tag: 'fileTranslation', value: '/translationTools/file/' }
];
