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

export default function Notifications({
  params
}: {
  params: { lang: string };
}) {
  const { isLoaded , notificationSourceList, notificationDisplayList } = useStore(notificationStore);
  if (!isLoaded) {
    loadNotification();
    setCurrentlevel(ALL_LEVEL);
    console.log(' notificationSourceList 31=>', notificationSourceList);
  }
  // console.log(' notificationList 22==>', notificationList);
  return (
    <React.Fragment>
      <div className={styles.mainNotification}>
        <PageName name={`${PAGE_NAME} [${params.lang}]`} />
        <NotificationToolbar />
        <NotificationTable
          name={PAGE_NAME}
          rows={notificationDisplayList}
          columns={columnList}
          autoHeight
          checkboxSelection
        />
      </div>
    </React.Fragment>
  );
}

/**
 * use nanostore https://github.com/podspods/codlea/blob/main/09_react/cours/nanostores.md
 */
