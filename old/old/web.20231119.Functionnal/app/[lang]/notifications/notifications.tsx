import {
  PAGINATION_STEP,
  SPACE,
  URL_HOST,
  URL_PORT,
  URL_PROTOCOLE
} from './notifications.constant';
import {
  NotificationColumn,
  SortOrder,
  Status,
  Str,
  notificationsRoute,
  typeRoute
} from './notifications.type';

import { Status as BadgeStatus } from '@systran/react-components/lib/atoms/StatusBadge';

import { commonFetch } from '@/utils/fetcher';

export async function updateReadStatusMutation({ ...notification }) {
  // console.log('notification 46==>', notification);

  if (notification.read) await setNotificationRead(notification.id);
  else await setNotificationUnread(notification.id);
}

export async function setNotificationUnread(id: string) {
  console.log('setNotificationUnread 72  ==>', id);
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
  console.log('setNotificationRead 84  ==>', id);
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
    }
    else endOfString = true;
  }
  return tagList;
}

export function convertMessage(str: Str): string {
  if (!str) return null;
  const tagList = getTag(str.display); // list tag in the display string
  if (tagList.length <= 0) return str.display; // no transformation

  let stringReturn: string = str.display;
  for (const tag of tagList) {
    let linkValue: string = str.data[tag].value;
    const tagType = str.data[tag].type;

    if (tagType in typeRoute) {
      const route: string = typeRoute[tagType];
      const label: string = str.data[tag].label;
      const hyperLink = `${URL_PROTOCOLE}://${URL_HOST}${URL_PORT}${route}${linkValue}`;
      linkValue = `<a href=${hyperLink}>${label}</a>`;
    }
    stringReturn = stringReturn.replace(
      `$\{${tag}}`,
      `${SPACE}${linkValue}${SPACE}`
    );
  }
  return stringReturn;
}

export function endPoint(route: notificationsRoute): string {
  if (!route) return null;
  return `${URL_PROTOCOLE}://${URL_HOST}:${URL_PORT}/${route}`;
}

export function isDisable(id: number): boolean {
  return !!id; // not exist
}

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

export function defaultRequest(): string {
  const offset = 0;
  const sortColumn = NotificationColumn.INSERTED_AT;
  const sortOrder = SortOrder.DESC;
  const limit = PAGINATION_STEP[0];
  const rootRequest = `${URL_PROTOCOLE}://${URL_HOST}:${URL_PORT}${notificationsRoute.LIST}`;
  return `${rootRequest}?skip=${offset}&limit=${limit}&sortName=${sortColumn}&sortOrder=${sortOrder}`;
}
