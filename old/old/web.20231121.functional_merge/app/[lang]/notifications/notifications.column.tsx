import React from 'react';
import { GridColDef } from '@mui/x-data-grid-pro';

import {
  INSERTED_AT,
  LEVEL,
  LEVEL_LIST,
  NOTIFICATIONS,
  NOT_READ,
  READ,
  SEARCH,
  actionList
} from './notifications.constant';
import { searchChange, selectLevel, startSearch } from './notifications.store';
import { NotificationColumn, NotificationInput } from './notifications.type';
import { SelectBox } from './notifications.component/SelectBox';
import { convertMessage } from './notifications';
// import StatusBadge from './notifications.component/StatusBadge';
import StatusBadge, {
  Status
} from '@systran/react-components/lib/atoms/StatusBadge';
import { durationFromNow } from '@/utils/toString';
import { Parser } from 'html-to-react';

import RowActionMenu from '@systran/react-components/lib/organisms/RowAction/RowActionMenu';
import SearchField from '@/components/SearchField';

export function columnList(
  level: string,
  searchText: string,
  t: (inString: string) => string
): GridColDef<NotificationInput>[] {
  const parser = Parser();
  const columnList: GridColDef<NotificationInput>[] = [
    {
      field: NotificationColumn.LEVEL,
      headerName: t(LEVEL),
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      minWidth: 150,
      renderHeader: () => (
        <SelectBox
          customSx={{
            '.MuiOutlinedInput-notchedOutline': { borderStyle: 'none' }
          }}
          itemList={LEVEL_LIST}
          onChange={selectLevel}
          value={level}
        />
      ),
      renderCell: (params) => (
        <div>
          <StatusBadge
            title={params.row.level}
            status={params.row.level as Status}
          >
            {params.row.level}
          </StatusBadge>
        </div>
      )
    },
    {
      field: NotificationColumn.READ,
      headerName: t(READ),
      align: 'left',
      headerAlign: 'center',
      minWidth: 100,
      renderCell: (params) => (params.row.read ? READ : NOT_READ)
    },
    {
      field: NotificationColumn.STR,
      headerName: t(NOTIFICATIONS),
      sortable: false,
      align: 'left',
      headerAlign: 'center',
      minWidth: 500,
      renderHeader: () => (
        <SearchField
          placeholder={SEARCH}
          onChange={searchChange}
          onClick={startSearch}
          value={searchText}
        />
      ),
      renderCell: (params) =>
        params.row.str && parser.parse(convertMessage(params.row.str))
    },
    {
      field: NotificationColumn.INSERTED_AT,
      headerName: t(INSERTED_AT),
      align: 'left',
      minWidth: 100,
      headerAlign: 'center',
      renderCell: (params) =>
        params.row.insertedAt && durationFromNow(params.row.insertedAt),
      sortable: true
    },
    {
      field: 'elipsis',
      // key: 'action',
      flex: 0.2,
      sortable: false,
      maxWidth: 50,
      editable: false,
      renderCell: (f) => (
        // <RowActionMenu actions={leftActionList} selectedRow={f?.row} />
        <RowActionMenu actions={actionList} selectedRow={f?.row} />
      ),
      headerName: ''
    }
  ];

  return columnList;
}
