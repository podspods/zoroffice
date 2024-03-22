import {
  PAGINATION_STEP,
  SPACE,
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
  if (!id) return;

  const options = {
    method: 'POST',
    body: JSON.stringify({ id: id })
  };
  const api =
    (read ? notificationsRoute.READ : notificationsRoute.UNREAD) + '/' + id;
  await commonFetch(api, options);
  // return status;
}

export async function ZsetNotificationAllRead() {
  const options = {
    method: 'POST'
  };
  const api = notificationsRoute.READ_ALL;
  const status = await commonFetch(api, options);
  return status;
}

function getTag(inputstring: string): string[] {
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
  const tagList = getTag(str.display);

  let stringReturn: string = str.display;
  for (const tag of tagList) {
    const dataTag = str.data[tag];
    let linkValue = '';
    if (dataTag) {
      linkValue = dataTag.value.toString();
      const route = typeRoute.find((route) => route.tag === dataTag.type);
      if (route) {
        const hyperLink = `${route.value}${linkValue}`;
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
  return `${notificationsRoute.LIST}?skip=${offset}&limit=${limit}&sortName=${sortColumn}&sortOrder=${sortOrder}`;
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
