import React from 'react';
import { FIELD_HOSTNAME, FIELD_NAME, FIELD_STATUS, FIELD_VERSION, HOSTNAME, NAME, STATUS, VERSION, actionDeRegisterEllipsis } from './services.constant';
import { convertStatus } from './services';
import StatusBadge from '@/components/StatusBadge';
import { GridColDef } from '@mui/x-data-grid';
import { deregisterableList } from './services.type';
import RowActionMenu from '@systran/react-components/lib/organisms/RowAction/RowActionMenu';
export const columnList = [
  {
    headerName: '',
    field: 'elipsis',
    maxWidth: 80,
    flex: 0.2,
    sortable: false,
    editable: false,
    type: 'singleSelect',
    renderCell: (params) =>
      deregisterableList.includes(params.row.name) && (
        <RowActionMenu
          actions={[actionDeRegisterEllipsis]}
          selectedRow={params.row}
        />
      )
  },
  {
    // headerName: <Label message={STATUS} />,
    headerName: STATUS,
    disableColumnMenu: true,
    sortable: true,
    field: FIELD_STATUS,
    maxWidth: 120,
    renderCell: (params) => (
      <StatusBadge
        title={params.row.status}
        type={convertStatus(params.row.status)}
        text={params.row.status}
      />
    )
  },
  {
    disableColumnMenu: true,
    headerName: NAME,
    sortable: true,
    minWidth: 400,
    field: FIELD_NAME
    // renderCell: (params) => params.row.name
  },
  {
    disableColumnMenu: true,
    headerName: HOSTNAME,
    minWidth: 400,
    sortable: true,
    field: FIELD_HOSTNAME
  },
  {
    disableColumnMenu: true,
    headerName: VERSION,
    minWidth: 400,
    sortable: true,
    field: FIELD_VERSION
  }
] satisfies GridColDef<any>[];
