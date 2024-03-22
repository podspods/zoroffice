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
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlToReactParser = require('html-to-react').Parser;

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
  const htmlToReactParser = new HtmlToReactParser();
  const tagList = getTag(str.display); // list tag in the display string
  let stringReturn: string = str.display;
  console.log('convertMessage 94 ==>', stringReturn, tagList);

  for (const tag of tagList) {
    // for each tag 1° retreive the value and the type
    let linkValue: string = str.data[tag].value;
    const tagType = str.data[tag].type;
    console.log('tagType 100 ==>', tagType, linkValue);

    if (tagType in typeRoute) {
      const hyperLink = `${URL_PROTOCOLE}://${URL_HOST}:${URL_PORT}${typeRoute[tagType]}${linkValue}`;
      linkValue = ` <a href=${hyperLink}>${str.data[tag].label}</a> `;
    }
    stringReturn = stringReturn.replace(
      `$\{${tag}}`,
      `${SPACE}${linkValue}${SPACE}`
    );
    console.log('tagType 115 ==>', stringReturn);
  }
  // const result: JSX.Element = parse(stringReturn);
  // console.log('JSX.Element 118 ==>', result);
  const result: JSX.Element = htmlToReactParser.parse(stringReturn);
  console.log('JSX.Element 118 ==>', result);
  // return HtmlToReactParser(stringReturn);
  return htmlToReactParser.parse(stringReturn);
  // return result;
}

export function adatator(
  notificationInput: NotificationInput
): NotificationDisplay {
  let notificationDisplay: NotificationDisplay = {
    id: notificationInput.id,
    level: notificationInput.level,
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
