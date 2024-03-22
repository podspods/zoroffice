'use client';

import React, { useState } from 'react';
import styled from '@emotion/styled';
import useSWR from 'swr';

import SimpleTable, {
  useRemoteHooks,
  useSelectedRows
} from '@/components/fromReact/Table/SimpleTable';
// } from '@systran/react-components/lib/organisms/Table/SimpleTable';

// import useRefreshBuilder from '@systran/react-components/lib/organisms/Table//hooks/useRefresh';
import useRefreshBuilder from '@/components/fromReact//Table//hooks/useRefresh';

import { Notifications } from './NotificationsTypes';
import { actions } from './NotificationsConstant';
import { setContext } from './NotificationsUtils';
import { useNotificationHook } from './NotificationsContext';
import useColumns from './useColumns';

export default function NotificationsTable() {
  const { state } = useNotificationHook();
  const useRefresh = useRefreshBuilder<Notifications>({
    route: '/node/notifications/list',
    useSWR,
    adaptParamsOpts: {
      paginationParamsFields: {
        limit: 'limit',
        skip: 'skip'
      },
      sortParamsField: {
        sortName: 'sortName',
        sortOrder: 'sortOrder'
      }
    },
    adaptResponseOpts: {
      validateRowFct: () => true,
      rowsField: 'notifications',
      totalRowCountField: 'total'
    }
  });
  const remoteHooksData = useRemoteHooks<Notifications>({
    useRefresh: useRefresh,
    refreshRate: 'Never'
  });
  const { mutate, loading, refreshRate, setRefreshRate } = remoteHooksData;
  const [selectedRows, setSelectedRowIds] = useSelectedRows(
    remoteHooksData.rows
  );

  // setContext('refreshRate', refreshRate);
  // setContext('selectedRows', selectedRows);
  // setContext('isLoading', loading);
  // setRefreshRate(state.refreshRate);

  if (state.onRefresh) {
    setContext('onRefresh', false);
    void mutate();
  }

  const columns = useColumns(actions);

  return (
    <CustomSimpleTable
      {...remoteHooksData}
      columns={columns}
      onRowSelectionModelChange={setSelectedRowIds}
      checkboxSelection
      pagination
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
            page: 0
          }
        }
      }}
      pageSizeOptions={[5, 10, 25]}
      disableColumnSelector
    />
  );
}

const CustomSimpleTable = styled(SimpleTable)`
  & .MuiDataGrid-columnHeader .MuiFormControl-root {
    width: 100%;
  }
`;
