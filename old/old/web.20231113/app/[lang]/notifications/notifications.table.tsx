import SimpleTable from '@systran/react-components/lib/organisms/table/SimpleTable';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { columnList } from './notifications.column';
import { notificationsStore, setCheckedList } from './notifications.store';
import { PAGINATION_STEP } from './notifications.constant';
import { useStore } from '@nanostores/react';

export function NotificationsTable() {
  const { t } = useTranslation();
  const { notificationList } = useStore(notificationsStore);
  return (
    <React.Fragment>
      <SimpleTable
        columns={columnList.map((oneColumn) => ({
          ...oneColumn,
          headerName: t(oneColumn.headerName)
        }))}
        rows={notificationList}
        pageSizeOptions={PAGINATION_STEP} // get pagesize as input in store
        pagination
        // showCellVerticalBorder
        // showColumnVerticalBorder
        // checkboxSelection
        onRowSelectionModelChange={setCheckedList}
        initialState={{
          pagination: {
            paginationModel: { pageSize: PAGINATION_STEP[0], page: 1 } //Number as input in store
          }
        }}
      />
    </React.Fragment>
  );
}
