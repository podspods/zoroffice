import { Theme } from '@mui/material';
// import { commonFetch } from '../../../../utils/fetcher';
import {
  PAGINATION_STEP,
  SPACE,
  URL_HOST,
  URL_PORT,
  URL_PROTOCOLE
} from './notifications.constant';
import {
  NotificationColumn,
  NotificationDisplay,
  NotificationInput,
  SortOrder,
  Status,
  Str,
  notificationsRoute,
  typeRoute
} from './notifications.type';

import { Status as BadgeStatus } from '@systran/react-components/lib/atoms/StatusBadge';

import { durationFromNow } from '@/utils/toString';
import { commonFetch } from '@/utils/fetcher';
import parse from 'html-react-parser';
import React, { ReactElement } from 'react';

/* eslint-disable no-console */
export const baseUrl = '/node/';

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

export function getNotificationList(
  skip = 0,
  limit: number = PAGINATION_STEP[0],
  sortColumn: NotificationColumn = NotificationColumn.INSERTED_AT,
  sortOrder: SortOrder = SortOrder.DESC,
  filterStr: string = null,
  levelFilter: string = null
) {
  console.log(
    'getNotificationList ==>',
    skip,
    limit,
    sortColumn,
    sortOrder,
    filterStr,
    levelFilter
  );

  if (limit <= 0) limit = PAGINATION_STEP[0];

  const rootRequest = `${URL_PROTOCOLE}://${URL_HOST}:${URL_PORT}${notificationsRoute.LIST}`;
  const getRequest = `${rootRequest}?skip=${skip}&limit=${limit}&sortName=${sortColumn}&sortOrder=${sortOrder}`;

  if (levelFilter) {
    const filterRequest = `${getRequest}&eleFilters[level]=${levelFilter}`;
    return filterRequest;
  }

  if (filterStr && filterStr.length >= 0) {
    const searchRequest = `${getRequest}&eleFilters[str]=${filterStr}`;
    return searchRequest;
  }
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

export function convertMessage(str: Str) {
  const tagList = getTag(str.display); // list tag in the display string
  let stringReturn: string = str.display;

  for (const tag of tagList) {
    // for each tag 1° retreive the value and the type
    let newValue: string = str.data[tag].value;
    const tagType = str.data[tag].type;
    if (tagType in typeRoute) {
      const hyperLink = `${URL_PROTOCOLE}://${URL_HOST}:${URL_PORT}${typeRoute[tag]}${newValue}`;
      newValue = ` <a href=${hyperLink}>${newValue}</a> `;
    }
    stringReturn = stringReturn.replace(
      `$\{${tag}}`,
      `${SPACE}${newValue}${SPACE}`
    );
  }
  const result: JSX.Element = parse(stringReturn)[0];
  return result;
}

export function adatator(
  notificationInput: NotificationInput
): NotificationDisplay {
  let notificationDisplay: NotificationDisplay = {
    id: notificationInput.id,
    level: Status[notificationInput.level],
    read: notificationInput.read,
    insertedAt: '',
    message: null
  };

  if (notificationInput.insertedAt)
    notificationDisplay = {
      ...notificationDisplay,
      insertedAt: durationFromNow(notificationInput.insertedAt)
    };
  if (notificationInput.str)
    notificationDisplay = {
      ...notificationDisplay,
      message: convertMessage(notificationInput.str)
    };

  return notificationDisplay;
}

export function endPoint(route: notificationsRoute): string {
  if (!route) return null;
  return `${URL_PROTOCOLE}://${URL_HOST}:${URL_PORT}/${route}`;
}

export function isDisable(id: number): boolean {
  return !!id; // not exist
}

// export function actionList(checkList: string[]): RowAction<Service>[] {
//   return [
//     actionRegister,
//     {
//       ...actionDeRegister,
//       disable: () => checkList.length >= 0
//     }
//   ];
// }

export function getPalette(theme: Theme, status: Status) {
  return theme.palette[status].main;
}

// export function ZaddLink(type: string, label: string): React.JSX.Element {
//   const route = `${typeRoute[type]}${label}`;

//   return <Link href={route}>{label}</Link>;
// }

// export function getStatusList(notificationList: NotificationInput[]): string[] {
//   console.log(' notificationList==>', notificationList);

//   const levelTab = notificationList.map(
//     (notification: any) => notification.level
//   );
//   return [...new Set(levelTab)];
//   // return[]
// }

export function toStatusBadge(status: Status): BadgeStatus {
  switch (status) {
    case Status.SUCCESS:
      return 'success';
    case Status.ERROR:
      return 'error';
    case Status.INFO:
      return 'info';
    case Status.DEFAULT:
    default:
      return 'default';
  }
}
