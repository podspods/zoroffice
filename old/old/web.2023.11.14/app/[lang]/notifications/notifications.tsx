import { Theme, styled } from '@mui/material';
// import { commonFetch } from '../../../../utils/fetcher';
import {
  PAGINATION_STEP,
  URL_HOST,
  URL_PORT,
  URL_PROTOCOLE
} from './notifications.constant';
import {
  NotificationColumn,
  SortOrder,
  Status,
  notificationsRoute
} from './notifications.type';
import { durationFromNow } from '@/utils/toString';
import { commonFetch } from '@/utils/fetcher';

/* eslint-disable no-console */
export const baseUrl = '/node/';

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

/**
 *
 * @returns https://localhost:3450/notifications/list?skip=0&limit=10&sortName=insertedAt&sortOrder=desc&eleFilters[str]=broker
 * param:
 * skip => number enreg to skip = (enreg_by_page * page_number)
 * limit=> number enreg to retrieve max
 * sortName => [level,read,message,insertdAt] => by default insertAt
 * sortOrder => [asc; desc] => by defautl desc
 * eleFilters[str] => any string by default = empty string
 */

// export async function getNotificationList(
export function getNotificationList(
  skip = 0,
  limit: number = PAGINATION_STEP[0],
  sortColumn: NotificationColumn = NotificationColumn.INSERTED_AT,
  sortOrder: SortOrder = SortOrder.DESC,
  filterStr: string = null
) {
  console.log('limit 50 ==>', limit);

  if (limit <= 0) limit = PAGINATION_STEP[0];
  console.log('limit 53 ==>', limit);

  const rootRequest = `${URL_PROTOCOLE}://${URL_HOST}:${URL_PORT}${notificationsRoute.LIST}`;
  // const rootRequest = `${notificationsRoute.LIST}`;
  console.log('response rootRequest 58==>', rootRequest);
  // return rootRequest;
  const getRequest = `${rootRequest}?skip=${skip}&limit=${limit}&sortName=${sortColumn}&sortOrder=${sortOrder}`;
  console.log('response getRequest 61==>', getRequest);
  if (filterStr && filterStr.length >= 0) {
    const searchRequest = `${getRequest}$eleFilters[str]=${filterStr}`;
    // const response = await commonFetch(searchRequest, { method: 'GET' });

    console.log('response searchRequest 66==>', searchRequest);
    // return response;
    return searchRequest;
  }
  // const response = await commonFetch(getRequest, { method: 'GET' });
  console.log('response getRequest 68==>', getRequest);
  // return response;
  return getRequest;
}

export async function updateReadStatusMutation({ ...notification }) {
  // console.log('notification 46==>', notification);

  if (notification.read) await setNotificationRead(notification.id);
  else await setNotificationUnread(notification.id);
}

export async function setNotificationUnread(id: string) {
  // console.log('setNotificationUnread 72  ==>', id);
  const options = {
    method: 'POST',
    body: JSON.stringify({ id: id })
  };
  const api = notificationsRoute.UNREAD + '/' + id;
  const status = await commonFetch(api, options);

  // console.log(`setNotificationUnread 80  ==>[${status}]  ${id}   `);
  return status;
}

export async function setNotificationRead(id: string) {
  // console.log('setNotificationRead 84  ==>', id);
  const options = {
    method: 'POST',
    body: JSON.stringify({ id: id })
  };
  const api = notificationsRoute.READ + '/' + id;
  const status = await commonFetch(api, options);

  // console.log(`setNotificationRead 93  ==>[${status}]  ${id}   `);
  return status;
}

export async function setNotificatioAllRead() {
  const options = {
    method: 'POST'
  };
  const api = notificationsRoute.READ_ALL;
  const status = await commonFetch(api, options);

  // console.log(`setNotificationRead 93  ==>[${status}]  ${id}   `);
  return status;
}

/**
 *  char $ must be escap => [$] '${' become [$]{
 * ([^\s>]+) => every char excep space char
 * }
 *
 */
function getTag(inputstring: string): string[] {
  // match ${ character
  // capture group [^\s] all charater excepted whitespace char
  // match } character

  const extractRule = new RegExp(/[$]{([^\s>]+)}/, 'g');
  const tagList: string[] = [];
  let endOfString = false;

  while (!endOfString) {
    const tag = extractRule.exec(inputstring);
    if (tag) {
      tagList.push(tag[1].toString());
    } else endOfString = true;
  }
  return tagList;
}

export function convertMessage(str: any): string {
  const tagList = getTag(str.display);
  let stringReturn = str.display;

  for (const tag of tagList) {
    stringReturn = stringReturn.replace(`$\{${tag}}`, str.data[tag].value);
  }
  return stringReturn; // ???????????????? add link here ?????????????
}

export function adatator(rawData: any): Notification {
  let notification: Notification = { ...rawData };

  if (rawData.insertedAt)
    notification = {
      ...notification,
      insertedAt: durationFromNow(rawData.insertedAt)
    };
  if (rawData.str)
    notification = {
      ...notification,
      notification: convertMessage(rawData.str)
    };

  return notification;
}

export function endPoint(route: notificationsRoute): string {
  if (!route) return null;
  return `${URL_PROTOCOLE}://${URL_HOST}:${URL_PORT}/${route}`;
}

export function isDisable(id: number): boolean {
  return !!id; // not exist
}

export function actionList(checkList: string[]): RowAction<Service>[] {
  return [
    actionRegister,
    {
      ...actionDeRegister,
      disable: () => checkList.length >= 0
    }
  ];
}

export function getPalette(theme: Theme, status: Status) {
  return theme.palette[status].main;
}
