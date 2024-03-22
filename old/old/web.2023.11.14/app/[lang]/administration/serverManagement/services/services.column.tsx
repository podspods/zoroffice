import React from 'react';
import {
  FIELD_HOSTNAME,
  FIELD_NAME,
  FIELD_STATUS,
  FIELD_VERSION,
  HOSTNAME,
  NAME,
  STATUS,
  VERSION,
  actionDeRegisterEllipsis
} from './services.constant';
import { convertStatus } from './services';
import { GridColDef } from '@mui/x-data-grid-pro';
import { Service, deregisterableList } from './services.type';
import RowActionMenu from '@systran/react-components/lib/organisms/RowAction/RowActionMenu';
import StatusBadge from '@systran/react-components/lib/atoms/StatusBadge';

export const columnList: readonly GridColDef<Service>[] = [
  {
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
  },
  {
    disableColumnMenu: true,
    headerName: HOSTNAME,
    minWidth: 200,
    sortable: true,
    field: FIELD_HOSTNAME
  },
  {
    disableColumnMenu: true,
    headerName: VERSION,
    minWidth: 200,
    sortable: true,
    field: FIELD_VERSION
  },
  {
    headerName: '',
    field: 'elipsis',
    maxWidth: 80,
    flex: 0.2,
    sortable: false,
    editable: false,
    renderCell: (params) =>
      deregisterableList.includes(params.row.name) && (
        <RowActionMenu
          actions={[actionDeRegisterEllipsis]}
          selectedRow={params.row}
        />
      )
  }
];
