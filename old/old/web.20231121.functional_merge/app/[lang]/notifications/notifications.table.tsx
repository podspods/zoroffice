'use client';

// import SimpleTable from '@systran/react-components/lib/organisms/Table/SimpleTable';

import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';
import React from 'react';
import { columnList } from './notifications.column';
import { useTranslation } from 'react-i18next';
import { PAGINATION_STEP } from './notifications.constant';
import { useStore } from '@nanostores/react';
import SortIcon from '@systran/react-components/lib/atoms/Icons/SortIcon';
import {
  notificationsStore,
  setCheckedList,
  setModelSelection,
  setPaginationModel,
  setSortNotification
} from './notifications.store';

export type NotificationsTablePros = {
  isLoading: boolean;
};

export default function NotificationsTable({
  ...props
}: NotificationsTablePros) {
  const { t } = useTranslation();
  const {
    page,
    pageSize,
    rowCount,
    notificationList,
    levelSelected,
    searchText
  } = useStore(notificationsStore);
  // console.log(' notificationList 30==>', notificationList);

  return (
    <React.Fragment>
      <DataGridPro
        columns={columnList(levelSelected, searchText, t)}
        rows={notificationList}
        autoHeight
        pagination
        onRowSelectionModelChange={setCheckedList}
        checkboxSelection
        rowCount={rowCount}
        paginationMode='server'
        loading={props.isLoading}
        pageSizeOptions={PAGINATION_STEP}
        onPaginationModelChange={setPaginationModel}
        onSortModelChange={setSortNotification}
        disableColumnMenu
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: pageSize === 0 ? PAGINATION_STEP[0] : pageSize,
              page: page
            }
          }
        }}
        disableColumnSelector
        slots={{
          columnSortedDescendingIcon: () => <SortIcon direction='down' />,
          columnSortedAscendingIcon: () => <SortIcon direction='up' />
        }}
      />
    </React.Fragment>
  );
}


