import {
  PAGINATION_STEP,
  SPACE,
  URL_HOST,
  URL_PORT,
  URL_PROTOCOLE,
  typeRoute

} from '@/components/Notifications/constant';
import {
  NotificationColumn,
  NotificationInput,
  SortOrder,
  Str,
  notificationsRoute
} from '@/components/Notifications/type';

import { commonFetch } from '@/utils/fetcher';

export async function setNotificationStatus(id: string, read: boolean) {
  const options = {
    method: 'POST',
    body: JSON.stringify({ id: id })
  };
  const api = (read
    ? notificationsRoute.READ
    : notificationsRoute.UNREAD) + '/' + id;
  const status = await commonFetch(api, options);
  return status;
}

export async function setNotificatioAllRead() {
  const options = {
    method: 'POST'
  };
  const api = notificationsRoute.READ_ALL;
  const status = await commonFetch(api, options);
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
    if (tag) tagList.push(tag[1].toString());
    else endOfString = true;
  }
  return tagList;
}

export function convertMessage(str: Str): string {
  if (!str) return '';
  const tagList = getTag(str.display); // list tag in the display string
  if (tagList.length <= 0) return str.display; // no transformation

  let stringReturn: string = str.display;
  for (const tag of tagList) {
    const dataTag = str.data[tag];
    let linkValue = '';
    if (dataTag) {
      linkValue = dataTag.value.toString();
      const route = typeRoute.find((route) => route.tag === dataTag.type);
      if (route) {
        const hyperLink = `${URL_PROTOCOLE}://${URL_HOST}${URL_PORT}${route.value}${linkValue}`;
        linkValue = `<a href=${hyperLink}>${
          dataTag.label ? dataTag.label : ''
        }</a>`;
      }
    }
    stringReturn = stringReturn.replace(
      `$\{${tag}}`,
      `${SPACE}${linkValue}${SPACE}`
    );
  }
  return stringReturn;
}
export function defaultRequest(): string {
  const offset = 0;
  const sortColumn = NotificationColumn.INSERTED_AT;
  const sortOrder = SortOrder.DESC;
  const limit = PAGINATION_STEP[0];
  const rootRequest = `${URL_PROTOCOLE}://${URL_HOST}:${URL_PORT}${notificationsRoute.LIST}`;
  return `${rootRequest}?skip=${offset}&limit=${limit}&sortName=${sortColumn}&sortOrder=${sortOrder}`;
}

export function idTorowList(
  checkedList: string[],
  notificationList: NotificationInput[]
): NotificationInput[] {
  if (checkedList.length > 0) {
    return notificationList.filter((oneNotification) => {
      return checkedList.includes(oneNotification.id);
    });
  }
  return [];
}
