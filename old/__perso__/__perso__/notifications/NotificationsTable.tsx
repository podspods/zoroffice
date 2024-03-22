'use client';

import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import useSWR from 'swr';

// import SimpleTable, {
//   useRemoteHooks,
//   useSelectedRows
// } from '@systran/react-components/lib/organisms/Table/SimpleTable';

import useRefreshBuilder from '@systran/react-components/lib/organisms/Table//hooks/useRefresh';

import { Notifications } from './NotificationsTypes';
import useColumns from './useColumns';
import { useNotifications } from './useNotifications';
// import { RefreshRate } from '@/components/fromReact/Table/hooks/useRemoteHooks';

export default function NotificationsTable() {
  const {
    refreshAsked,
    refreshRate,
    resetRefreshAsked,
    updateSelectedRows,
    updateIsLoading
  } = useNotifications();

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
  // const remoteHooksData = useRemoteHooks<Notifications>({
  //   useRefresh: useRefresh,
  //   refreshRate: 'Never'
  // });
  // const { mutate, loading, setRefreshRate } = remoteHooksData;
  // const [selectedRows, setSelectedRowIds] = useSelectedRows(
  //   remoteHooksData.rows
  // );

  // useEffect(() => {
  //   updataContextdata(refreshRate, loading, selectedRows);
  // }, [loading, refreshRate, selectedRows]);

  // const updataContextdata = (
  //   refreshRate: RefreshRate,
  //   isLoading: boolean,
  //   rowList: Notifications[]
  // ) => {
  //   setRefreshRate(refreshRate);
  //   updateIsLoading(isLoading);
  //   updateSelectedRows(rowList);
  // };

  if (refreshAsked) {
    resetRefreshAsked();
    // void mutate();
  }

  const columns = useColumns();

  return (
  //   <CustomSimpleTable
  //     {...remoteHooksData}
  //     columns={columns}
  //     onRowSelectionModelChange={setSelectedRowIds}
  //     checkboxSelection
  //     pagination
  //     initialState={{
  //       pagination: {
  //         paginationModel: {
  //           pageSize: 5,
  //           page: 0
  //         }
  //       }
  //     }}
  //     pageSizeOptions={[5, 10, 25]}
  //     disableColumnSelector
  //   />
  );
}

// const CustomSimpleTable = styled(SimpleTable)`
//   & .MuiDataGrid-columnHeader .MuiFormControl-root {
//     width: 100%;
//   }
// `;
