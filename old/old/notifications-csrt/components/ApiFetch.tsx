/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import {
  Notification,
  notificationRoute
} from '../common/notification.common';
import useSWR, { mutate } from 'swr';
import { commonFetch } from '../../../../utils/fetcher';

async function setNotificationUnread(id: string) {
  console.log('setNotificationUnread 38  ==>', id);
  const options = {
    method: 'POST',
    body: JSON.stringify({ id: id })
  };
  const api = notificationRoute.unRead + '/' + id;
  const status = await commonFetch(api, options);

  console.log(`setNotificationUnread 46  ==>[${status}]  ${id}   `);
  return status;
}

async function setNotificationRead(id: string) {
  console.log('setNotificationRead 38  ==>', id);
  const options = {
    method: 'POST',
    body: JSON.stringify({ id: id })
  };
  const api = notificationRoute.read + '/' + id;
  const status = await commonFetch(api, options);

  console.log(`setNotificationRead 46  ==>[${status}]  ${id}   `);
  return status;
}

export default function ApiFetch() {
  const [notifications, setNotifications] = useState([]);

  const { data: rawData } = useSWR(notificationRoute.list, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    onError: (err) =>
      console.error(`Error useSWR on ${notificationRoute.list}:`, err) // eslint-disable-line
  });

  async function updateReadStatusMutation({ ...notification }) {
    console.log('notification 46==>', notification);

    if (notification.read) await setNotificationRead(notification.id);
    else await setNotificationUnread(notification.id);
  }

  async function ZupdateReadStatusMutation({ ...notification }) {
    console.log('notification 46==>', notification);

    if (notification.read) await mutate(setNotificationRead(notification.id));
    else await mutate(setNotificationUnread(notification.id));
  }

  useEffect(() => {
    if (rawData) {
      const notificationList = rawData.notifications.map(
        (element: Notification) => {
          return { ...element, id: element.id, read: element.read };
        }
      );
      setNotifications(notificationList);
    }
  }, [rawData]);

  return (
    <React.Fragment>
      <h1>API Fetch</h1>
      <ul>
        {notifications.map((notification, index: number) => (
          <li key={index}>
            {notification.id}-{notification.read ? 'true' : 'false'}
            <input
              type='checkbox'
              checked={notification.read}
              id={notification.id}
              onChange={() => {
                console.log('onChange ==>', notification);
                updateReadStatusMutation({
                  ...notification,
                  read: !notification.read
                });
              }}
            />
            <label htmlFor={notification.id}>{notification.str.display}</label>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}
