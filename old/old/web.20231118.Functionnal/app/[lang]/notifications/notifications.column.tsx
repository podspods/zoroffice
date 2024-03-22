import React from 'react';
import { GridColDef } from '@mui/x-data-grid-pro';
import RowActionMenu from '@systran/react-components/lib/organisms/RowAction/RowActionMenu';

import {
  ALL_LEVEL,
  FIELD_INSERTED_AT,
  FIELD_LEVEL,
  FIELD_MESSAGE,
  FIELD_READ,
  INSERTED_AT,
  LEVEL,
  LEVEL_LIST,
  NOTIFICATIONS,
  NOT_READ,
  READ,
  SEARCH,
  leftActionList
} from './notifications.constant';
import { searchChange, selectLevel, startSearch } from './notifications.store';
import {
  NotificationColumn,
  NotificationDisplay,
  Status as notificationStatus
} from './notifications.type';
import { SelectBox } from './notifications.component/SelectBox';
import { toStatusBadge } from './notifications';
import StatusBadge from './notifications.component/StatusBadge';
import { SearchInput } from '@/components/SearchInput';

export function columnList(
  level: string,
  searchText: string,
  t: (inString: string) => string
): GridColDef<NotificationDisplay>[] {
  const columnList: GridColDef<NotificationDisplay>[] = [
    {
      field: NotificationColumn.LEVEL,
      headerName: LEVEL,
      align: 'left',
      headerAlign: 'center',
      sortable: false,
      minWidth: 100,
      renderHeader: () => (
        <SelectBox
          name={LEVEL}
          defaultValue={ALL_LEVEL}
          itemList={LEVEL_LIST}
          onChange={selectLevel}
          value={level}
        />
      ),
      renderCell: (params) => (
        <div>
          <StatusBadge title={params.row.level} status={params.row.level} />
        </div>
      )
    },
    {
      field: NotificationColumn.READ,
      headerName: READ,
      align: 'left',
      headerAlign: 'center',
      minWidth: 100,
      renderCell: (params) => (params.row.read ? READ : NOT_READ)
    },
    {
      field: NotificationColumn.MESSAGE,
      headerName: NOTIFICATIONS,
      sortable: false,
      align: 'left',
      headerAlign: 'center',
      minWidth: 400,
      renderHeader: () => (
        <SearchInput
          placeholder={SEARCH}
          onChange={searchChange}
          onClick={startSearch}
          value={searchText}
        />
      )
    },
    {
      field: NotificationColumn.INSERTED_AT,
      headerName: INSERTED_AT,
      align: 'left',
      minWidth: 100,
      headerAlign: 'center'
    },
    {
      field: 'elipsis',
      // key: 'action',
      flex: 0.2,
      sortable: false,
      maxWidth: 50,
      editable: false,
      // renderCell: (f) => (
      //   <RowActionMenu actions={leftActionList} selectedRow={f?.row} />
      // ),
      headerName: ''
    }
  ];

  return columnList;
}
