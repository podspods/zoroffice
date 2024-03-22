'use client';

import React from 'react';
import { columnList } from '@/components/Notifications/column';
import { useTranslation } from 'react-i18next';
import { PAGINATION_STEP } from '@/components/Notifications/constant';
import { useStore } from '@nanostores/react';
import {
  notificationsStore,
  setCheckedList,
  setPaginationModel,
  setSortNotification
} from '@/components/Notifications/store';
import SimpleTable from '@systran/react-components/lib/organisms/Table/SimpleTable';

export type TablePros = {
  isLoading: boolean;
};

export default function Table({ ...props }: TablePros) {
  const { t } = useTranslation();
  const {
    page,
    pageSize,
    rowCount,
    notificationList,
    levelSelected,
    searchText
  } = useStore(notificationsStore);

  return (
    <SimpleTable
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
    />
  );
}
