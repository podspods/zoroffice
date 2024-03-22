import moment from 'moment';
import { Notifications, typeRoute } from './NotificationsTypes';
import { commonFetch } from '@/utils/fetcher';

export function convertMessage(str: {
  display: string;
  data: {
    [key: string]:
      | { type: string; value: string | number; label?: string }
      | undefined;
    filename?: { type: string; value: string | number; label?: string };
    type?: { type: string; value: string | number; label?: string };
    id?: { type: string; value: string | number; label?: string };
    upgradeId?: { type: string; value: string | number; label?: string };
    err?: { type: string; value: string | number; label?: string };
    hostname?: { type: string; value: string | number; label?: string };
    tr?: { type: string; value: string | number; label?: string };
    n?: { type: string; value: string | number; label?: string };
    nb?: { type: string; value: string | number; label?: string };
    sn?: { type: string; value: string | number; label?: string };
    p?: { type: string; value: string | number; label?: string };
    url?: { type: string; value: string | number; label?: string };
  };
  v: number;
}): string {
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
      `${'&#20;'}${linkValue}${'&#20;'}`
    );
  }
  return stringReturn;
}

export function durationFromNow(dateString: string): string {
  const myMoment = moment(dateString);
  return myMoment.isValid() ? myMoment.fromNow().toString() : '';
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


function ZmarkAsRead(rowList: Notifications[]) {

  console.log(' markAsRead==>', rowList);
  rowList.map((oneRow) => oneRow.read ? '' : setNotificationStatus(oneRow.id, true));
}

 function ZmarkAsUnRead(rowList: Notifications[]) {

  console.log(' markAsUnRead==>', rowList);
  rowList.map((oneRow) => oneRow.read ? setNotificationStatus(oneRow.id, false) : ' ');
}


 async function ZmarkAllAsRead() {
  const options = {
    method: 'POST'
  };
  const status = await commonFetch('/node/notification/read/all', options);
  return status;
}

async function setNotificationStatus(id: string, read: boolean) {
  if (!id) return -1;

  const options = {
    method: 'POST',
    body: JSON.stringify({ id: id })
  };
  const api =
    (read ? '/node/notification/read' : '/node/notification/unread') + '/' + id;
  const status = await commonFetch(api, options);

  return status;
}
