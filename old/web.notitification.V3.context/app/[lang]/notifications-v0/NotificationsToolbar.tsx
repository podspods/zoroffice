'use client';

import React from 'react';
import { Toolbar, Typography } from '@mui/material';
import { PlusIcon } from '@systran/react-components/lib/atoms/Icons/Icons';
import RowActionToolbar from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import RefreshRateButton from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import RowActionButton from '@systran/react-components/lib/organisms/RowAction/RowActionButton';

import { useNotificationHook } from './NotificationsContext';
import { actions } from './NotificationsConstant';
import { useTranslation } from 'react-i18next';

import { RefreshRate } from '@/components/fromReact/Table/hooks/useRemoteHooks';
import { commonFetch } from '@/utils/fetcher';
import { mutate } from 'swr';

export default function NotificationsToolbar() {
  const { state, dispatch } = useNotificationHook();
  const { t } = useTranslation();

  const onRefresh = () => {
    dispatch({ type: 'SET_VALUE', key: 'onRefresh', value: true });
  };

  const onRefreshChange = (value: RefreshRate) => {
    dispatch({ type: 'SET_VALUE', key: 'onRefreshChange', value: value });
    dispatch({ type: 'SET_VALUE', key: 'onRefresh', value: true });
  };


  const onClick = async () => {
    dispatch({ type: 'SET_VALUE', key: 'onRefresh', value: true });
    const options = {
      method: 'POST'
    };
    await commonFetch('/node/notification/read/all', options);
  };


  return (
    <>
      <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'inline-flex' }}>
          {state.selectedRows && state.selectedRows.length > 0 ? (
            <RowActionToolbar
              actions={actions}
              selectedRows={state.selectedRows}
            />
          ) : (
            <Typography>
              {t(
                'Select a row or click on the ellipses to view single and multi row actions'
              )}
            </Typography>
          )}
        </div>
        <div style={{ display: 'inline-flex' }}>
          <RefreshRateButton
            isLoading={state.isLoading}
            onRefresh={onRefresh}
            refreshRate={state.refreshRate}
            onRefreshChange={onRefreshChange}
          />
          <RowActionButton
            icon={<PlusIcon />}
            label={'Mark all as read'}
            onClick={onClick}
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
