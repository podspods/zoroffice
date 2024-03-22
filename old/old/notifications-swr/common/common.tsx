import {
  BaseButtonColor,
  COLOR_ERROR,
  COLOR_INFO,
  COLOR_NORMAL,
  ERROR_LEVEL,
  INFO,
  INFO_LEVEL,
  SUCCESS,
  SUCCESS_LEVEL
} from './constant';
import {
  loadNotification,
  toggleRead
} from '../store/notifications.store';
import jsonData from '../data/data.json';
<<<<<<< Updated upstream
=======
import useSWR from 'swr';




>>>>>>> Stashed changes

export type Notification = {
  id: string;
  mark: string;
  level: string;
  levelColor: string;
  levelId: number;
  rowColor: string;
  read: boolean;
  notification: string;
  insertedAt: string;
};

export type NotificationList = {
  total: number;
  offset: number;
  notifications: Notification[];
};

export function findButtonColor(value: string): BaseButtonColor {
  return getLevelColor(value);
}

export function getLevelId(value: string): number {
  switch (value) {
    case SUCCESS:
      return SUCCESS_LEVEL;
    case INFO:
      return INFO_LEVEL;
    default:
      return ERROR_LEVEL;
  }
}

export function getLevelColor(value: string): BaseButtonColor {
  switch (value) {
    case SUCCESS:
      return COLOR_NORMAL;
    case INFO:
      return COLOR_INFO;
    default:
      return COLOR_ERROR;
  }
}

export function handleReadChange(event: React.ChangeEvent<HTMLElement>, rowId) {
  event.stopPropagation();
  console.log('handleReadChange event 32 ==>', rowId);
  toggleRead(rowId);
  return null;
}

export function getClassName(level: string): string {
  switch (level) {
    case SUCCESS:
      return 'notif-success';
    case INFO:
      return 'notif-info';
    default:
      return 'notif-danger';
  }
}


export function markAllAsRead() {
  console.log('mark all as read : request database ==>');
  loadNotification();
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function deleteNotification(rowId: string) {
  console.log('delete--Notification 73 ==>', rowId);
  return true;
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function writeNotification(notification: Notification) {
  console.log('writeNotification 83 ==>', notification);
  return true;
}
// export async function readNotification(id: string): Notification {
export async function readNotification(id: string) {
  console.log('readNotification 83 ==>');
  return null;
}

/** this function do a request to te server and retreive data asked */
export async function readNotificationList() {
  // const reader = new FileReader();
  const dataPath =
    '/home/destrieux/Documents/V10dev/enterprise-server/web/data/fakeData.json';
  // export async function readNotificationList() {
  // const {  notificationList} = useStore(notificationStore);
  console.log('readNotificationList 81 ==>');
  // reader.readAsText(dataPath);
  // if (fs.existsSync(dataPath)) {
  // console.log(`reading ${dataPath}`); // eslint-disable-line
  // const rawData = fs.readFileSync(dataPath, 'utf8');
  // const jsonData = JSON.parse(rawData);
  // // const jsonData = JSON.parse(reader.result);
  // console.log('readNotificationList 81 ==>', jsonData);
  // return jsonData;
  // }
  return jsonData;
}


<<<<<<< Updated upstream
=======
useSWR(
  '/node/global/settings',
  {
    dedupingInterval: 1000 * 60 * 60 * 24 * 365,
    onError: (err) => {
      console.error('Error fetching global settings:', err) // eslint-disable-line
    },
    onSuccess: (data) => {
      context.updateGlobalSettings(data);
    }
  }
);
>>>>>>> Stashed changes
