/* eslint-disable no-console */
import { action, map } from 'nanostores';
import {
  adatator,
  setNotificatioAllRead,
  setNotificationRead,
  setNotificationUnread
} from './notifications';
import { ALL_LEVEL, NEVER, PAGINATION_STEP } from './notifications.constant';
import {
  NotificationColumn,
  NotificationDisplay,
  SortOrder
} from './notifications.type';

export type NotificationStore = {
  notificationList: NotificationDisplay[];
  checkedList: NotificationDisplay[]; // list of id for row with check box checked
  sortColumn: NotificationColumn;
  sortOrder: SortOrder;
  isLoaded: boolean;
  isDataReady: boolean;
  dataChange: boolean;
  isBusy: boolean;
  refreshAsked: boolean;
  searchText: string;
  filterStr: string;
  levelSelected: string;
  refreshRate: number;
  pageSize: number;
  page: number;
  rowCount: number;
  offset: number;
};

export const notificationsStore = map<NotificationStore>({
  notificationList: [],
  checkedList: [],
  sortColumn: NotificationColumn.INSERTED_AT,
  sortOrder: SortOrder.DESC,
  isLoaded: false,
  isDataReady: false,
  dataChange: false,
  isBusy: false,
  refreshAsked: false,
  searchText: '',
  filterStr: '',
  levelSelected: '',
  refreshRate: 0,
  rowCount: 0,
  pageSize: 0,
  page: 0,
  offset: 0
});

export const setPaginationModel = action(
  notificationsStore,
  'setPaginationModel',
  (store, paginationModel) => {
    console.log('setPaginationModel 59==>', paginationModel);

    store.setKey('pageSize', paginationModel.pageSize);
    store.setKey('page', paginationModel.page);
    store.setKey('offset', paginationModel.pageSize * paginationModel.page);

    // here do fetch with param skip & limit
  }
);

export const setLoaded = action(notificationsStore, 'setLoaded', (store) => {
  store.setKey('isLoaded', true);
});

export const requestRefresh = action(
  notificationsStore,
  'requestRefresh',
  (store) => {
    store.setKey('refreshAsked', true);
  }
);

export const mutateAsked = action(
  notificationsStore,
  'mutateAsked',
  (store) => {
    store.setKey('refreshAsked', false);
  }
);

export const setDataChange = action(
  notificationsStore,
  'setDataChange',
  (store) => {
    store.setKey('dataChange', false);
  }
);

export const setDataReady = action(
  notificationsStore,
  'setDataReady',
  (store) => {
    store.setKey('isDataReady', true);
    // console.log(' isDataReady 48==>');
  }
);

export const loadNotifications = action(
  notificationsStore,
  'load notificationList',
  (store, rawData) => {
    const { isDataReady, isBusy } = store.get();
    if (!isBusy && isDataReady) {
      store.setKey('isBusy', true);
      if (rawData) {
        console.log(' rawData 80==>', rawData);
        store.setKey('rowCount', rawData.total);
        store.setKey('offset', rawData.offset);
        const newNotificationList = rawData.notifications.map(
          (rawNotification: any) => adatator(rawNotification)
        );

        store.setKey('notificationList', newNotificationList);
        store.setKey('isDataReady', false);
      }
      store.setKey('isBusy', false);
    }
  }
);

export const toggleRead = action(
  notificationsStore,
  'toggleRead',
  async (store, rowId, readValue) => {
    console.log('toogleRead ==>', `rowId:${rowId} value :${readValue}`);

    const { notificationList } = store.get();
    const newNotificationSourceList = notificationList.map((oneNotification) =>
      oneNotification.id === rowId
        ? { ...oneNotification, read: readValue }
        : oneNotification
    );
  }
);

/** change read switch state  */
export const deleteRow = action(
  notificationsStore,
  'mark as read ',
  (store, rowId) => {
    // console.log('delate row ==>');
  }
);

/** ------------- mark as read a list of notification checked --------------- */
export const markAsRead = action(
  notificationsStore,
  'mark as read ',
  async (store) => {
    const { checkedList } = store.get();
    store.setKey('isBusy', true);

    for (const oneNotification of checkedList) {
      await setNotificationRead(oneNotification.id);
    }

    store.setKey('isBusy', false);
    store.setKey('refreshAsked', true);
  }
);

/** ------------- mark as un read a list of notification checked --------------- */
export const markAsUnRead = action(
  notificationsStore,
  'mark as unread ',
  async (store) => {
    const { checkedList } = store.get();
    store.setKey('isBusy', true);

    for (const oneNotification of checkedList) {
      await setNotificationUnread(oneNotification.id);
    }
    store.setKey('isBusy', false);
    store.setKey('refreshAsked', true);
  }
);

/** ------------- mark as un read all  notification --------------- */
export const markAllAsRead = action(
  notificationsStore,
  'mark as unread ',
  async (store) => {
    const { isBusy } = store.get();
    if (!isBusy) {
      store.setKey('isBusy', true);

      await setNotificatioAllRead();
      store.setKey('isBusy', false);
      store.setKey('refreshAsked', true);
    } else void markAllAsRead();
  }
);

export const setCheckedList = action(
  notificationsStore,
  'set list rowid checked',
  (store, rowIdList) => {
    console.log(' set list rowid checked 157==>', rowIdList);
    store.setKey('checkedList', rowIdList);
  }
);

/** version 2 */
/**
 * set search criteria
 * restart timer search delay
 */
export const searchChange = action(
  notificationsStore,
  'startSearch',
  (store) => {
    store.setKey('isBusy', false);
  }
);

/** send request for seach  */
export const startSearch = action(
  notificationsStore,
  'startSearch',
  (store) => {
    store.setKey('isBusy', false);
  }
);

export const setRefresh = action(notificationsStore, 'setRefresh', (store) => {
  store.setKey('refreshAsked', true);
});

export const setModelSelection = action(
  notificationsStore,
  'setModelSelection',
  (store) => {
    store.setKey('isBusy', true);
    console.log('setModelSelection 248==>', '??');
    store.setKey('isBusy', false);
  }
);

export const refreshChange = action(
  notificationsStore,
  'refreshChange',
  (store, event) => {
    const newRefreshRate: number = event === NEVER ? 0 : event;
    store.setKey('refreshRate', newRefreshRate);
  }
);

export const setPageSize = action(
  notificationsStore,
  'setPageSize',
  (store) => {
    store.setKey('isBusy', false);
    console.log('setPageSize 274==>', '??');
  }
);
export const setPage = action(notificationsStore, 'setPage', (store) => {
  store.setKey('isBusy', false);
  console.log('setPage 282==>', '??');
});

export const selectLevel = action(
  notificationsStore,
  'selectLevel',
  (store, event) => {
    console.log('selectLevel 274==>', event.target.value); 

    if (event.target.value === ALL_LEVEL){
      store.setKey('levelSelected','');
    }
    else {

      const newLevel = event.target.value;   
      store.setKey('levelSelected',newLevel);
    }

  
  }
);
  



