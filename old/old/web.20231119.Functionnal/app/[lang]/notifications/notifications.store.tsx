/* eslint-disable no-console */
import { action, map } from 'nanostores';
import {
  setNotificatioAllRead,
  setNotificationRead,
  setNotificationUnread
} from './notifications';
import {
  DURATION_SEARCH,
  NEVER,
  PAGINATION_STEP,
  URL_HOST,
  URL_PORT,
  URL_PROTOCOLE
} from './notifications.constant';
import {
  NotificationColumn,
  NotificationInput,
  SortOrder,
  Status,
  notificationsRoute
} from './notifications.type';

export type NotificationStore = {
  notificationList: NotificationInput[];
  checkedList: string[]; // list of id for row with check box checked
  sortColumn: NotificationColumn;
  sortOrder: SortOrder;
  ZisLoaded: boolean;
  isDataReady: boolean;
  dataChange: boolean;
  isBusy: boolean;
  refreshAsked: boolean;
  searchText: string;
  filterStr: string;
  levelSelected: string;
  dataRequest: string;

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
  ZisLoaded: false,
  isDataReady: false,
  dataChange: false,
  isBusy: false,
  refreshAsked: false,
  searchText: '',
  filterStr: '',
  levelSelected: Status.ALL,
  dataRequest: '',
  refreshRate: 0,
  rowCount: 0,
  pageSize: 0,
  page: 0,
  offset: 0
});

let searchInterval;

export const setPaginationModel = action(
  notificationsStore,
  'setPaginationModel',
  (store, paginationModel) => {
    console.log('setPaginationModel 59==>', paginationModel);

    store.setKey('pageSize', paginationModel.pageSize);
    store.setKey('page', paginationModel.page);
    store.setKey('offset', paginationModel.pageSize * paginationModel.page);
    buildQuerry();
  }
);

export const ZsetLoaded = action(notificationsStore, 'setLoaded', (store) => {
  store.setKey('isLoaded', true);
});

export const requestRefresh = action(
  notificationsStore,
  'requestRefresh',
  (store) => {
    store.setKey('refreshAsked', true);
    console.log(' requestRefresh 86==>');
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
  (store, rawData: any) => {
    const { isDataReady, isBusy } = store.get();
    if (!isBusy && isDataReady) {
      store.setKey('isBusy', true);
      if (rawData) {
        store.setKey('rowCount', rawData.total);
        store.setKey('offset', rawData.offset);
        const newNotificationList: NotificationInput[] = rawData.notifications;
        store.setKey('notificationList', newNotificationList);
        store.setKey('isDataReady', false);
      }
      store.setKey('isBusy', false);
    }
  }
);

/** ------------- mark as read a list of notification checked --------------- */
export const markAsRead = action(
  notificationsStore,
  'mark as read ',
  async (store) => {
    const { checkedList } = store.get();
    console.log('markAsRead ==>', checkedList);
    store.setKey('isBusy', true);

    for (const oneId of checkedList) {
      await setNotificationRead(oneId);
    }

    store.setKey('isBusy', false);
    requestRefresh();
  }
);

export const markAsReadOne = action(
  notificationsStore,
  'mark as read One ',
  async (store, rowId: string) => {
    store.setKey('isBusy', true);

    const { notificationList } = store.get();

    const newNotificationList = notificationList.map((oneNotification) => {
      if (oneNotification.id === rowId) {
        return { ...oneNotification, read: false };
      }
      return oneNotification;
    });
    await setNotificationRead(rowId);
    store.setKey('notificationList', newNotificationList);
    store.setKey('isBusy', false);
  }
);

/** ------------- mark as un read a list of notification checked --------------- */
export const markAsUnRead = action(
  notificationsStore,
  'mark as unread ',
  async (store) => {
    const { checkedList } = store.get();
    console.log('markAsUnRead ==>', checkedList);
    store.setKey('isBusy', true);

    for (const oneId of checkedList) {
      await setNotificationUnread(oneId);
    }
    store.setKey('isBusy', false);
    requestRefresh();
  }
);

/** ------------- mark as un read a list of notification checked --------------- */
export const markAsUnReadOne = action(
  notificationsStore,
  'mark as unread One ',
  async (store, rowId: string) => {
    store.setKey('isBusy', true);

    const { notificationList } = store.get();

    const newNotificationList = notificationList.map((oneNotification) => {
      if (oneNotification.id === rowId) {
        return { ...oneNotification, read: false };
      }
      return oneNotification;
    });

    await setNotificationUnread(rowId);

    store.setKey('notificationList', newNotificationList);

    store.setKey('isBusy', false);
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
      requestRefresh();
    } else void markAllAsRead();
  }
);

/** a refaire => toogle seulement un notification à la fois  ?????????????????? */
export const toggleRead = action(
  notificationsStore,
  'toggleRead',
  async (store, rowId: string) => {
    console.log('toogleRead ==>', `rowId:${rowId}`);

    const { notificationList } = store.get();
    const notificationToChange = notificationList.find(
      (oneNotification) => oneNotification.id === rowId
    );
    if (notificationToChange) {
      store.setKey('isBusy', true);
      if (notificationToChange.read)
        await setNotificationUnread(notificationToChange.id);
      else await setNotificationRead(notificationToChange.id);
      store.setKey('isBusy', false);
      requestRefresh();
    }
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
  'searchChange',
  (store, event) => {
    store.setKey('isBusy', false);
    console.log(' set list rowid checked 157==>', event.target.value);
    store.setKey('searchText', event.target.value);
    if (searchInterval) {
      // store.setKey('refreshAsked', false);
      clearInterval(searchInterval);
      searchInterval = setInterval(buildQuerry, DURATION_SEARCH); // timer to moderate access to network
    } else searchInterval = setInterval(buildQuerry, DURATION_SEARCH); // timer to moderate access to network
  }
);

/** send request for seach  */
export const startSearch = action(
  notificationsStore,
  'startSearch',
  (store) => {
    console.log(' startSearch 250==>');
    store.setKey('isBusy', false);
    if (searchInterval) clearInterval(searchInterval);
    buildQuerry();
  }
);

export const setModelSelection = action(
  notificationsStore,
  'setModelSelection',
  (store, event) => {
    store.setKey('isBusy', true);
    console.log('setModelSelection 248==>', event);
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
    const newLevel = event.target.value;
    store.setKey('levelSelected', newLevel);
    buildQuerry();
  }
);

export const setSortNotification = action(
  notificationsStore,
  'selectLevel',
  (store, sortModel) => {
    console.log('selectLevel 343==>', sortModel);
    const newSortColumn = sortModel[0].field;
    const newSortOrder = sortModel[0].sort;
    store.setKey('sortColumn', newSortColumn);
    store.setKey('sortOrder', newSortOrder);
    buildQuerry();
  }
);

/**
 *
 *  https://localhost:3450/notifications/list?skip=0&limit=10&sortName=insertedAt&sortOrder=desc&eleFilters[str]=broker
 * param:
 * skip => number enreg to skip = offset
 * limit=> number enreg to retrieve max (pageSize)
 * sortName => [level,read,message,insertdAt] => by default insertAt
 * sortOrder => [asc; desc] => by defautl desc
 * eleFilters[str] => any string by default = empty string
 * eleFilters[level] => search by level any string by default = empty string
 */

export const buildQuerry = action(
  notificationsStore,
  'buildQuerry',
  (store) => {
    const {
      offset,
      pageSize,
      sortColumn,
      sortOrder,
      searchText,
      levelSelected
    } = store.get();

    const limit = pageSize <= 0 ? PAGINATION_STEP[0] : pageSize;

    const rootRequest = `${URL_PROTOCOLE}://${URL_HOST}:${URL_PORT}${notificationsRoute.LIST}`;
    const getRequest = `${rootRequest}?skip=${offset}&limit=${limit}&sortName=${sortColumn}&sortOrder=${sortOrder}`;
    const optionLevelFilter =
      levelSelected !== Status.ALL ? `&eleFilters[level]=${levelSelected}` : '';
    const optionSearch =
      searchText && searchText.length >= 0
        ? `&eleFilters[str]=${searchText}`
        : '';

    const newDataRequest = `${getRequest}${optionLevelFilter}${optionSearch}`;

    store.setKey('dataRequest', newDataRequest);
  }
);

