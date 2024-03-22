/* eslint-disable no-console */
import { action, map } from 'nanostores';
import {
  Notification,
  deleteNotification,
  readNotificationList,
  writeNotification
} from '../common/common';
// import jsonData from './data/data.json';
import { adatator } from '../common/adatator';
import { ALL_LEVEL } from '../common/constant';

export type NotificationStore = {
  currentNotification: Notification;
  notificationSourceList: Notification[];
  notificationDisplayList: Notification[];
  deleteList: string[]; // list of row to delete
  writeList: string[]; // list of id for row to write on database
  checkedList: string[]; // list of id for row with check box checked
  isBusy: boolean;
  totalRow: number;
  offset: number;
  currentlevel: number;
  isLoaded: boolean;
};

export const notificationStore = map<NotificationStore>({
  currentNotification: null,
  notificationSourceList: [],
  notificationDisplayList: [],
  deleteList: [],
  writeList: [],
  checkedList: [],
  isBusy: false,
  totalRow: 0,
  offset: 0,
  currentlevel: 0,
  isLoaded: false
});

export const setCurrentlevel = action(
  notificationStore,
  'Set currentlevel',
  (store, value: number) => {
    console.log('Set currentlevel 44==>', value);
    store.setKey('currentlevel', value);
    setDisplayNotificationList();
  }
);

const setDisplayNotificationList = action(
  notificationStore,
  'setDisplayNotificationList',
  (store) => {
    const { currentlevel, notificationSourceList } = store.get();

    if (currentlevel === ALL_LEVEL) {
      const newNotificationDisplayList = [...notificationSourceList];
      store.setKey('notificationDisplayList', newNotificationDisplayList);
    } else {
      const newNotificationDisplayList = notificationSourceList.filter(
        (oneNotification) => oneNotification.levelId === currentlevel
      );
      store.setKey('notificationDisplayList', newNotificationDisplayList);
    }
  }
);

export const setCheckedList = action(
  notificationStore,
  'set list rowid checked',
  (store, rowIdList) => {
    console.log(' set list rowid checked 35==>', rowIdList);
    store.setKey('checkedList', rowIdList);
  }
);

/** change read switch state  */
export const markAsRead = action(notificationStore, 'mark as read ', () => {
  setMarkRead(true);
});
/** change read switch state  */
export const markAsUnRead = action(notificationStore, 'mark as unread ', () => {
  setMarkRead(false);
});

/** change read switch state  */
const setMarkRead = action(
  notificationStore,
  'set mark as read or unread ',
  (store, value) => {
    const { checkedList, writeList, notificationSourceList } = store.get();
    const newNotificationSourceList = notificationSourceList.map(
      (oneNotification) => {
        if (checkedList.find((rowId: string) => rowId === oneNotification.id)) {
          return { ...oneNotification, read: value };
        }
        return oneNotification;
      }
    );

    store.setKey('notificationSourceList', newNotificationSourceList);
    setDisplayNotificationList();
    const newWriteList = [...writeList, ...checkedList]; // add rowid to list of row modified
    store.setKey('writeList', newWriteList);
    save();
  }
);

/** change read switch state  */
export const deleteRow = action(
  notificationStore,
  'mark as read ',
  (store, rowId) => {
    const { deleteList, notificationSourceList } = store.get();
    const newNotificationSourceList = notificationSourceList.filter(
      (oneNotification) => oneNotification.id !== rowId
    );
    const newDeleteList = [...deleteList, rowId]; // add rowid to list of row modified
    store.setKey('deleteList', newDeleteList);
    store.setKey('notificationSourceList', newNotificationSourceList);
    setDisplayNotificationList();
    save();
  }
);

/** ---------------- load data from server to nano-store ----------------------- */
/** change read switch state  */
export const toggleRead = action(
  notificationStore,
  'load notificationList',
  (store, rowId) => {
    const { writeList, notificationSourceList } = store.get();
    console.log('rowId 133==>', rowId);
    const newNotificationSourceList = notificationSourceList.map(
      (oneNotification) =>
        oneNotification.id === rowId
          ? { ...oneNotification, read: !oneNotification.read }
          : oneNotification
    );
    store.setKey('notificationSourceList', newNotificationSourceList);
    const newWriteList = [...writeList, rowId]; // add rowid to list of row modified
    store.setKey('writeList', newWriteList);
    setDisplayNotificationList();
    save();
  }
);

/** ---------------- load data from server to nano-store ----------------------- */
export const loadNotification = action(
  notificationStore,
  'load notificationList',
  async (store) => {
    store.setKey('isBusy', true);
    store.setKey('isLoaded', true);
    console.log('loadNotification 39 ==>');
    /** insert here : request for network retreiving data */
    const notitificationData = await readNotificationList();
    console.log('notitificationData 157==>', notitificationData);
    console.log('notitificationData 158==>', notitificationData.notifications);

    const newNotificationSourceList: Notification[] = notitificationData.notifications.map(
      (rawNotification) => adatator(rawNotification)
    );

    store.setKey('notificationSourceList', newNotificationSourceList);
    setDisplayNotificationList();
    store.setKey('totalRow', parseInt(notitificationData.total, 10));

    store.setKey('offset', parseInt(notitificationData.offset, 10));
    store.setKey('writeList', []);
    store.setKey('isBusy', false);
    
    // const { notificationSourceList, totalRow, offset } = store.get();

    // console.log('notificationList 57==>', newNotificationSourceList);
    // console.log('totalRow 58==>', totalRow);
    // console.log('offset 59==>', offset);
  }
);

/** ---------------- save data from server to nano-store ----------------------- */
export const save = action(
  notificationStore,
  'save notificationList',
  async (store) => {
    store.setKey('isBusy', true);
    const { writeList, deleteList, notificationSourceList } = store.get();

    for (const rowId of writeList) {
      const rowToWrite = notificationSourceList.filter(
        (oneNotification) => oneNotification.id === rowId
      );
      await writeNotification(rowToWrite[0]);
    }
    for (const rowId of deleteList) {
      await deleteNotification(rowId);
    }

    store.setKey('writeList', []);
    store.setKey('deleteList', []);
    store.setKey('isBusy', false);
  }
);

// ---------------------------------------------------------------------
