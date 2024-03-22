import moment from 'moment';
import { commonFetch } from '@/utils/fetcher';
import Apis from '@/utils/apis';
import { Notification } from './NotificationsType';

export async function markAsRead(
  rowList: Notification[],
  mutate: () => Promise<unknown>
) {
  const unReadList = rowList.filter(
    (oneRow: Notification) => oneRow.read === false
  );

  if (unReadList.length > 0) {
    unReadList.map((oneRow: Notification) =>
      setNotificationStatus(oneRow.id, true)
    );
    await mutate();
  }
}

export async function markAsUnRead(
  rowList: Notification[],
  mutate: () => Promise<unknown>
) {
  const readList = rowList.filter(
    (oneRow: Notification) => oneRow.read === true
  );
  if (readList.length > 0) {
    readList.map((oneRow: Notification) =>
      setNotificationStatus(oneRow.id, false)
    );
    await mutate();
  }
}

export async function markAllAsRead(mutate: () => Promise<unknown>) {
  const options = {
    method: 'POST'
  };
  await commonFetch(Apis.notification.readAll, options);
  await mutate();
}

export async function setNotificationStatus(id: string, read: boolean) {
  const options = {
    method: 'POST',
    body: JSON.stringify({ id: id })
  };
  const api =
    (read ? Apis.notification.read : Apis.notification.unRead) + '/' + id;
  await commonFetch(api, options);
}

export function durationFromNow(dateString: string): string {
  const myMoment = moment(dateString);
  return myMoment.isValid() ? myMoment.fromNow().toString() : '';
}
