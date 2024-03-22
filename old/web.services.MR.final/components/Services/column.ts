import { GridColDef } from '@mui/x-data-grid-pro';
import {
  FIELD_HOSTNAME,
  FIELD_NAME,
  FIELD_STATUS,
  FIELD_VERSION,
  HOSTNAME,
  NAME,
  STATUS,
  VERSION
} from '@/components/Services/constant';
import { Service } from '@/components/Services/type';
import DisplayStatusBadge from '@/components/Services/components/DisplayStatusBadge';
import DisplayRowActionMenu from '@/components/Services/components/DisplayRowActionMenu';

export const columnList: readonly GridColDef<Service>[] = [
  {
    headerName: STATUS,
    disableColumnMenu: true,
    sortable: true,
    field: FIELD_STATUS,
    maxWidth: 120,
    renderCell: (params) => DisplayStatusBadge(params.row.status)
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
    renderCell: (params) => DisplayRowActionMenu(params.row)
  }
];
