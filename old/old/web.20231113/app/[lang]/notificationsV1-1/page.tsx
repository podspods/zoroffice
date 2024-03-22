'use client';

import React, { useEffect } from 'react';
import PageName from './components/PageName';
import NotificationToolbar from './components/NotificationToolbar';
import NotificationTable from './components/NotificationTable';
import { columnList } from './common/columnList';
import { FETCHING, FETCHING_DONE, PAGE_NAME } from './common/constant';
import { useStore } from '@nanostores/react';
import RepeatIcon from '@systran/react-components/lib/atoms/Icons/RepeatIcon';
import {
  loadNotification,
  mutateAsked,
  notificationStore,
  requestRefresh,
  setDataReady
} from './common/notification.store';
import useSWR from 'swr';
import {
  FlexColumn,
  getNotification,
  notificationRoute
} from './common/notification.common';
import RefreshingStatus from './components/RefreshingStatus';
import { Button } from '@mui/material';

export default function Notifications({
  params
}: {
  params: { lang: string };
}) {
  const { notificationDisplayList, needRefresh } = useStore(notificationStore);

  const { data: rawData, error, isLoading, isValidating, mutate } = useSWR(
    notificationRoute.list,
    // getNotification,  => no-need here, used in case of request with parameter
    {
      onSuccess: () => setDataReady(),
      onError: (err) =>
        console.error(`Error useSWR on ${notificationRoute.list}:`, err) // eslint-disable-line
    }
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>error : {error}</p>;

  if (needRefresh) {
    mutateAsked();
    mutate();
  }

  loadNotification(rawData);

  return (
    <React.Fragment>
      <FlexColumn>
        <PageName name={`${PAGE_NAME}`} />
        {/* <Button variant='outlined' startIcon={<RepeatIcon />} onClick={requestRefresh}>
          refresh
        </Button> */}
        {/* <RefreshingStatus
          status={isValidating}
          messageFetching={FETCHING}
          messageDone={FETCHING_DONE}
        /> */}
        <NotificationToolbar />
        <NotificationTable
          name={PAGE_NAME}
          rows={notificationDisplayList}
          columns={columnList}
          autoHeight={false}
          checkboxSelection
        />
      </FlexColumn>
    </React.Fragment>
  );
}
