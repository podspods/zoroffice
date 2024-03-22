/* eslint-disable no-console */
import { action, map } from 'nanostores';
import {
  setNotificationAllRead,
  setNotificationStatus
} from '@/components/Notifications/utils';
import {
  DURATION_SEARCH,
  NEVER,
  PAGINATION_STEP
} from '@/components/Notifications/constant';
import {
  NotificationColumn,
  NotificationInput,
  SortOrder,
  Status,
  notificationsRoute
} from '@/components/Notifications/type';

export type NotificationStore = {
  notificationList: NotificationInput[];
  checkedList: string[];
  sortColumn: NotificationColumn;
  sortOrder: SortOrder;
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

export const setPaginationModel = action(
  notificationsStore,
  'setPaginationModel',
  (store, paginationModel) => {
    store.setKey('pageSize', paginationModel.pageSize);
    store.setKey('page', paginationModel.page);
    store.setKey('offset', paginationModel.pageSize * paginationModel.page);
    buildQuerry();
  }
);

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

export const setDataReady = action(
  notificationsStore,
  'setDataReady',
  (store) => {
    store.setKey('isDataReady', true);
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

export const markAsRead = action(
  notificationsStore,
  'mark as read ',
  async (store, param?: NotificationInput[]) => {
    store.setKey('isBusy', true);
    if (param) {
      for (const oneNotification of param) {
        if (
          oneNotification &&
          oneNotification.id &&
          typeof oneNotification.id === 'string'
        ) {
          await markAsReadOne(oneNotification.id);
        }
      }
    }
    store.setKey('isBusy', false);
  }
);

export const markAsReadOne = action(
  notificationsStore,
  'mark as read One ',
  async (store, rowId: string) => {
    const { notificationList } = store.get();
    let modification = false;
    const newNotificationList = notificationList.map((oneNotification) => {
      if (oneNotification.id === rowId && oneNotification.read === false) {
        modification = true;
        return { ...oneNotification, read: true };
      }
      return oneNotification;
    });
    if (modification) {
      store.setKey('notificationList', newNotificationList);
      await setNotificationStatus(rowId, true);
    }
  }
);

export const markAsUnRead = action(
  notificationsStore,
  'mark as unread ',
  async (store, param?: NotificationInput[]) => {
    store.setKey('isBusy', true);
    if (param) {
      for (const oneNotification of param) {
        if (
          oneNotification &&
          oneNotification.id &&
          typeof oneNotification.id === 'string'
        ) {
          await markAsUnReadOne(oneNotification.id);
        }
      }
    }
    store.setKey('isBusy', false);
  }
);

export const markAsUnReadOne = action(
  notificationsStore,
  'mark as unread One ',
  async (store, rowId: string) => {
    let modification = false;
    const { notificationList } = store.get();

    const newNotificationList = notificationList.map((oneNotification) => {
      if (oneNotification.id === rowId && oneNotification.read === true) {
        modification = true;
        return { ...oneNotification, read: false };
      }
      return oneNotification;
    });
    if (modification) {
      store.setKey('notificationList', newNotificationList);
      await setNotificationStatus(rowId, false);
    }
  }
);

export const markAllAsRead = action(
  notificationsStore,
  'mark as unread ',
  async (store) => {
    const { isBusy } = store.get();
    console.log(' markAllAsRead ==>', isBusy);
    if (!isBusy) {
      store.setKey('isBusy', true);
      await setNotificationAllRead();
      store.setKey('isBusy', false);
      requestRefresh();
    }
  }
);

export const setCheckedList = action(
  notificationsStore,
  'set list rowid checked',
  (store, rowIdList) => {
    store.setKey('checkedList', rowIdList);
  }
);

let searchInterval: NodeJS.Timer;

export const searchChange = action(
  notificationsStore,
  'searchChange',
  (store, event) => {
    store.setKey('isBusy', false);
    console.log(' set list rowid checked 157==>', event.target.value);
    store.setKey('searchText', event.target.value);
    if (searchInterval) {
      clearInterval(searchInterval);
      searchInterval = setInterval(buildQuerry, DURATION_SEARCH);
    }
    else searchInterval = setInterval(buildQuerry, DURATION_SEARCH);
  }
);

export const startSearch = action(
  notificationsStore,
  'startSearch',
  (store) => {
    store.setKey('isBusy', false);
    if (searchInterval) clearInterval(searchInterval);
    buildQuerry();
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

export const selectLevel = action(
  notificationsStore,
  'selectLevel',
  (store, event) => {
    const newLevel = event.target.value;
    store.setKey('levelSelected', newLevel);
    buildQuerry();
  }
);

export const setSortNotification = action(
  notificationsStore,
  'selectLevel',
  (store, sortModel) => {
    let newSortColumn = NotificationColumn.INSERTED_AT;
    let newSortOrder = SortOrder.DESC;
    if (sortModel[0]) {
      newSortColumn = sortModel[0].field;
      newSortOrder = sortModel[0].sort;
    }
    store.setKey('sortColumn', newSortColumn);
    store.setKey('sortOrder', newSortOrder);
    buildQuerry();
  }
);

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
    const getRequest = `${notificationsRoute.LIST}?skip=${offset}&limit=${limit}&sortName=${sortColumn}&sortOrder=${sortOrder}`;
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