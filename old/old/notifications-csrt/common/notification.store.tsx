import { action, map } from 'nanostores';
import useSWR, { mutate } from 'swr';
import {
  notificationRoute
} from './notification.common';

export type NotificationStore = {
  notificationDisplayList: Notification[];
};

export const notificationStore = map<NotificationStore>({
  notificationDisplayList: []
});


export const loadNotification = action(
  notificationStore,
  'load notificationList',
  (store) => {
    const { data: rawData } = useSWR(notificationRoute.list, {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      onError: (err) =>
        console.error(`Error useSWR on ${notificationRoute.list}:`, err) // eslint-disable-line
    });

    store.setKey('notificationDisplayList', rawData);

  }
);
