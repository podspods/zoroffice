'use client';

import React from 'react';
import { Toolbar, Typography } from '@mui/material';
import { PlusIcon } from '@systran/react-components/lib/atoms/Icons/Icons';
import RefreshRateButton from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import RowActionButton from '@systran/react-components/lib/organisms/RowAction/RowActionButton';

import { useTranslation } from 'react-i18next';

// import { RefreshRate } from '@/components/fromReact/Table/hooks/useRemoteHooks';
import { commonFetch } from '@/utils/fetcher';
import { useNotifications } from './useNotifications';
// import { setNotificationStatus } from '@/components/Notifications/utils';
import { Notifications } from './NotificationsTypes';
export default function NotificationsToolbar() {
  const { t } = useTranslation();
  const {
    setRefreshAsked,
    updateRefreshRate,
    isRowsSelected,
    selectedRows,
    isLoading,
    refreshRate
  } = useNotifications();

  // const onRefreshChange = (value: RefreshRate) => {
  //   updateRefreshRate(value);
  //   setRefreshAsked();
  // };

  const markAllAsRead = () => {
    const options = {
      method: 'POST'
    };
    void commonFetch('/node/notification/read/all', options);
    setRefreshAsked();
  };

  const markAsRead = () => {
    const toMarkAsRead = selectedRows.filter((oneNotification) => {
      return !oneNotification.read;
    });

    doUpdateRead(toMarkAsRead, true);
  };
  const markAsUnRead = () => {
    const toMarkAsRead = selectedRows.filter((oneNotification) => {
      return oneNotification.read;
    });
    doUpdateRead(toMarkAsRead, false);
  };

  const doUpdateRead = (toMarkAsRead: Notifications[], value: boolean) => {
    if (toMarkAsRead.length > 0) {
      // toMarkAsRead.map(
      //   async (oneNotification) =>
      // //     await setNotificationStatus(oneNotification.id, value)
      // );
      setRefreshAsked();
    }
  };

  return (
    <>
      <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'inline-flex' }}>
          {isRowsSelected ? (
            <>
              <RowActionButton
                icon={<PlusIcon />}
                label={'Mark as read'}
                onClick={markAsRead}
              />
              <RowActionButton
                icon={<PlusIcon />}
                label={'Mark as unread'}
                onClick={markAsUnRead}
              />
            </>
          ) : (
            <Typography>
              {t(
                'Select a row or click on the ellipses to view single and multi row actions'
              )}
            </Typography>
          )}
        </div>
        <div style={{ display: 'inline-flex' }}>
          {/* <RefreshRateButton
            isLoading={isLoading}
            onRefresh={setRefreshAsked}
            refreshRate={refreshRate}
            onRefreshChange={onRefreshChange}
          /> */}
          <RowActionButton
            icon={<PlusIcon />}
            label={'Mark all as read'}
            onClick={markAllAsRead}
          />
        </div>
      </Toolbar>
    </>
  );
}

// async function markAllAsRead() {
//   // const { state, dispatch } = useNotificationHook();
//   console.log(' markAllAsRead==>', 23);

//   // dispatch({ type: 'SET_VALUE', key: 'onRefresh', value: true });
//   const options = {
//     method: 'POST'
//   };
//   const status = await commonFetch('/node/notification/read/all', options);
//   await mutate('/node/notifications/list');
//   console.log(' markAllAsRead status==>', status);
//   return status;
// }
