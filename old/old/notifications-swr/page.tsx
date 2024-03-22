'use client';

import React from 'react';
import PageName from './components/PageName';
import { ALL_LEVEL, PAGE_NAME, PAGINATION_STEP } from './common/constant';
import NotificationToolbar from './components/NotificationToolbar';
import NotificationTable from './components/NotificationTable';
import { columnList } from './common/columnList';
import jsonData from './data/data.json'; // fake data for testing
import { adatator } from './common/adatator';
import styles from './styles/Notification.module.css';
import { Notification } from './common/common';
import {
  loadNotification,
  notificationStore,
  setCurrentlevel
} from './store/notifications.store';
import { useStore } from '@nanostores/react';
// const rowList: Notification[] = jsonData.notifications.map(
//   (rawNotification) => adatator(rawNotification)
// );
import useSWR from 'swr';
import TodoList from './features/todos';

const notificationUrl = '/node/notifications/list';
// const notificationUrl = '/node/admin/licenses/list';

export default async function Notifications({
  params
}: {
  params: { lang: string };
}) {
  // console.log(' notificationList 22==>', notificationList);
  const staticData = await fetch(`http://localhost:3500/notifications`, { cache: 'force-cache' })
 
  return (
    <React.Fragment>
      <p>toto</p>
      <TodoList />
    </React.Fragment>
  );
}

/**
 * use nanostore https://github.com/podspods/codlea/blob/main/09_react/cours/nanostores.md
 */
