import React from 'react';
import { GridColDef, GridComparatorFn } from '@mui/x-data-grid-pro';
import DeleteIcon from '@systran/react-components/lib/atoms/Icons/DeleteIcon';
import RowActionMenu from '@systran/react-components/lib/organisms/RowAction/RowActionMenu';

import { toggleRead } from './notifications.store';
import StatusBadge from '@systran/react-components/lib/atoms/StatusBadge';

import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import {
  FIELD_INSERTED_AT,
  FIELD_LEVEL,
  FIELD_MESSAGE,
  FIELD_READ,
  INSERTED_AT,
  INSERT_AT,
  LEVEL,
  NOTIFICATIONS,
  NOT_READ,
  READ,
  leftActionList
} from './notifications.constant';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export const columnList: GridColDef[] = [
  {
    field: FIELD_LEVEL,
    headerName: LEVEL,
    align: 'left',
    headerAlign: 'center',
    sortable: false,
    minWidth: 200,
    renderCell: (params) => (
      <div>
        <StatusBadge
          title={params.row.leve}
          type={params.row.level}
          text={params.row.level}
        />
      </div>
    )
  },
  {
    field: FIELD_READ,
    headerName: READ,
    align: 'left',
    headerAlign: 'center',
    minWidth: 200,
    renderCell: (params) => (params.row.read ? READ : NOT_READ)
  },
  {
    field: FIELD_MESSAGE,
    headerName: NOTIFICATIONS,
    sortable: false,
    align: 'left',
    headerAlign: 'center',
    minWidth: 600
  },
  {
    field: FIELD_INSERTED_AT,
    headerName: INSERTED_AT,
    align: 'left',
    minWidth: 200,
    headerAlign: 'center'
  },
  {
    field: 'elipsis',
    // key: 'action',
    flex: 0.2,
    sortable: false,
    maxWidth: 80,
    editable: false,
    renderCell: (f) => (
      <RowActionMenu actions={leftActionList} selectedRow={f?.row} />
    ),
    headerName: ''
  }
];

