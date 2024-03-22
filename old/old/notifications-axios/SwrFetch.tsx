/* eslint-disable @next/next/no-async-client-component */
'use client';

import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import {
  getNotificationList,
  notificationEndpoint as cacheKey,
  setNotificationRead,
  setNotificationUnRead
} from './api/notificationApi';
import { Notification } from './types/Notification.type';
import { Button } from '@mui/material';

// const myUrl = 'http://localhost:3500/notifications';

export default function SwrFetch() {
  const [newNotification, setNewNotification] = useState('');

  const { isLoading, error, data: notificationList, mutate } = useSWR(
    cacheKey,
    getNotificationList

    // {
    //   onSuccess: (data) =>
    //     data.sort((rowA, rowB) => rowB.insertedAt - rowA.insertedAt)
    // }
  );

  async function updateReadStatusMutation(notification: Notification) {
    if (notification.read) {
      setNotificationReadMutation(notification);
    } else {
      setNotificationUnreadMutation(notification);
    }
  }
  async function setNotificationReadMutation(notification: Notification) {
    try {
      await setNotificationRead(notification);
      mutate();
      // await mutate(
      //   updateNotification(notification)
      //   // updateNotificationOptions(notification)
      // );
      console.log('updateNotificationMutation success ==');
    } 
    catch (err) {
      console.error('updateNotificationMutation Error');
    }
  }

  async function setNotificationUnreadMutation(notification: Notification) {
    try {
      await setNotificationUnRead(notification);
      mutate();

      // await mutate(
      //   updateNotification(notification)
      //   // updateNotificationOptions(notification)
      // );
      console.log('updateNotificationMutation success ==');
    } 
    catch (err) {
      console.error('updateNotificationMutation Error');
    }
  }




  console.log('isloading 38 ==>', isLoading);

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>{error.message}</p>;
  }

  console.log('notificationList 48==>', notificationList);

  return (
    <React.Fragment>
      <h1>SWR Fetch</h1>
      <ul>
        {notificationList.notifications.map((notification, index: number) => (
          <li key={index}>
            {notification.id}-{notification.read ? 'true' : 'false'}
            <input
              type='checkbox'
              checked={notification.read}
              id={notification.id}
              onChange={() =>
                updateReadStatusMutation({
                  ...notification,
                  read: !notification.read
                })
              }
            />
            <label htmlFor={notification.id}>{notification.str.display}</label>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}
