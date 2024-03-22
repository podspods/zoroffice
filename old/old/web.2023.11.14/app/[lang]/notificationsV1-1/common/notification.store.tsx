/* eslint-disable no-console */
import { action, map } from 'nanostores';
import {
  Notification,
  setNotificationRead,
  setNotificationUnread,
  updateReadStatusMutation
} from './notification.common';
import { adatator } from './adatator';

export type NotificationStore = {
  notificationDisplayList: Notification[];
  checkedList: string[]; // list of id for row with check box checked
  isLoaded: boolean;
  isDataReady: boolean;
  dataChange: boolean;
  isBusy: boolean;
  currentlevel: number;
  needRefresh: boolean;
};

export const notificationStore = map<NotificationStore>({
  notificationDisplayList: [],
  checkedList: [],
  isLoaded: false,
  dataChange: false,
  isDataReady: false,
  isBusy: false,
  needRefresh: false,
  currentlevel: 0
});

export const setLoaded = action(notificationStore, 'setLoaded', (store) => {
  store.setKey('isLoaded', true);
});

export const requestRefresh = action(
  notificationStore,
  'requestRefresh',
  (store) => {
    store.setKey('needRefresh', true);
  }
);

export const mutateAsked = action(notificationStore, 'mutateAsked', (store) => {
  store.setKey('needRefresh', false);
});

export const setDataChange = action(
  notificationStore,
  'setDataChange',
  (store) => {
    store.setKey('dataChange', false);
  }
);

export const setDataReady = action(
  notificationStore,
  'setDataReady',
  (store) => {
    store.setKey('isDataReady', true);
    // console.log(' isDataReady 48==>');
  }
);

export const loadNotification = action(
  notificationStore,
  'load notificationList',
  (store, rawData) => {
    const { isDataReady, isBusy } = store.get();
    if (!isBusy && isDataReady) {
      store.setKey('isBusy', true);
      if (rawData) {
        // console.log(' rawData 80==>', rawData);
        const newNotificationSourceList = rawData.notifications.map(
          (rawNotification) => adatator(rawNotification)
        );

        store.setKey('notificationDisplayList', newNotificationSourceList);
        store.setKey('isDataReady', false);
      }
      store.setKey('isBusy', false);
    }
  }
);

export const toggleRead = action(
  notificationStore,
  'toggleRead',
  async (store, rowId, readValue) => {
    console.log('toogleRead ==>', `rowId:${rowId} value :${readValue}`);

    const { notificationDisplayList } = store.get();
    const newNotificationSourceList = notificationDisplayList.map(
      (oneNotification) =>
        oneNotification.id === rowId
          ? { ...oneNotification, read: readValue }
          : oneNotification
    );
    await updateReadStatusMutation({ id: rowId, read: readValue });
    store.setKey('dataChange', true);
    store.setKey('notificationDisplayList', newNotificationSourceList);
  }
);

/** change read switch state  */
export const deleteRow = action(
  notificationStore,
  'mark as read ',
  (store, rowId) => {
    // console.log('delate row ==>');
  }
);

/** ------------- mark as read a list of notification checked --------------- */
export const markAsRead = action(
  notificationStore,
  'mark as read ',
  async (store) => {
    const { checkedList } = store.get();
    store.setKey('isBusy', true);

    for (const id of checkedList) {
      await setNotificationRead(id);
    }

    store.setKey('isBusy', false);
    store.setKey('needRefresh', true);
  }
);

/** ------------- mark as un read a list of notification checked --------------- */
export const markAsUnRead = action(
  notificationStore,
  'mark as unread ',
  async (store) => {
    const { checkedList } = store.get();
    store.setKey('isBusy', true);

    for (const id of checkedList) {
      await setNotificationUnread(id);
    }
    store.setKey('isBusy', false);
    store.setKey('needRefresh', true);
  }
);

/** ------------- mark as un read all  notification --------------- */
export const markAllAsRead = action(
  notificationStore,
  'mark as unread ',
  async (store) => {
    const { notificationDisplayList } = store.get();
    store.setKey('isBusy', true);

    for (const notification of notificationDisplayList) {
      await setNotificationRead(notification.id);
    }
    store.setKey('isBusy', false);
    store.setKey('needRefresh', true);
  }
);

export const setCurrentlevel = action(
  notificationStore,
  'Set currentlevel',
  (store, value: string | number) => {
    // console.log('Set currentlevel 44==>', value);
    store.setKey('currentlevel', parseInt(value.toString(), 10));
    // setDisplayNotificationList();
  }
);
export const setCheckedList = action(
  notificationStore,
  'set list rowid checked',
  (store, rowIdList) => {
    console.log(' set list rowid checked 157==>', rowIdList);
    store.setKey('checkedList', rowIdList);
  }
);
