'use client';

import React from 'react';
import PageName from './components/PageName';
import { PAGE_NAME, PAGINATION_STEP } from './common/constant';
import NotificationToolbar from './components/NotificationToolbar';
import NotificationTable from './components/NotificationTable';
import NotificationFooter from './components/NotificationFooter';
import { columnList } from './common/columnList';
import jsonData from './data/data.json'; // fake data for testing
import { adatator} from './common/adatator';
import styles from './styles/Notification.module.css';
import { Notification } from './common/common';

const rowList: Notification[] = jsonData.notifications.map(
  (rawNotification) => adatator(rawNotification)
);

export default function Notifications({params}: { params: { lang: string };}) {

  return (
    <React.Fragment>
      <div className={styles.mainNotification}>
        <PageName name={`title: ${PAGE_NAME} [${params.lang}]`} />
        <NotificationToolbar />
        <NotificationTable
          name={PAGE_NAME}
          rows={rowList}
          columns={columnList}
          autoHeight
          // checkboxSelection
        />
        <NotificationFooter name={`footer: ${PAGE_NAME}`} />
      </div>
    </React.Fragment>
  );
}


/**
 * use nanostore https://github.com/podspods/codlea/blob/main/09_react/cours/nanostores.md
 */
