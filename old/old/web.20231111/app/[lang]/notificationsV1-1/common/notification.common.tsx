import { styled } from '@mui/material';
import { commonFetch } from '../../../../utils/fetcher';
import {
  BaseButtonColor,
  COLOR_ERROR,
  COLOR_INFO,
  COLOR_NORMAL,
  ERROR_LEVEL,
  INFO,
  INFO_LEVEL,
  SUCCESS,
  SUCCESS_LEVEL
} from './constant';
import { toggleRead } from './notification.store';

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

export const notificationRoute = {
  list: '/node/notifications/list',
  read: '/node/notification/read',
  unRead: '/node/notification/unread',
  remove: '/node/notification/delete'
};

export async function getNotification() {
  const response = await commonFetch(notificationRoute.list, { method: 'GET' });
  console.log('response 42==>', response);

  return response;
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
  const api = notificationRoute.unRead + '/' + id;
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
  const api = notificationRoute.read + '/' + id;
  const status = await commonFetch(api, options);

  // console.log(`setNotificationRead 93  ==>[${status}]  ${id}   `);
  return status;
}

export function getLevelId(value: string): number {
  switch (value) {
    case SUCCESS:
      return SUCCESS_LEVEL;
    case INFO:
      return INFO_LEVEL;
    default:
      return ERROR_LEVEL;
  }
}

export function getLevelColor(value: string): BaseButtonColor {
  switch (value) {
    case SUCCESS:
      return COLOR_NORMAL;
    case INFO:
      return COLOR_INFO;
    default:
      return COLOR_ERROR;
  }
}

export const FlexColumn = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem'
});

export const FlexRow = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  padding: '1rem'
});

export function getClassName(level: string): string {
  switch (level) {
    case SUCCESS:
      return 'notif-success';
    case INFO:
      return 'notif-info';
    default:
      return 'notif-danger';
  }
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

export function convertMessage(str: any): string {
  const tagList = getTag(str.display);
  let stringReturn = str.display;

  for (const tag of tagList) {
    stringReturn = stringReturn.replace(`$\{${tag}}`, str.data[tag].value);
  }
  return stringReturn;
}
