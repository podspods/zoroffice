import React from 'react';
import { GridColDef, GridComparatorFn } from '@mui/x-data-grid-pro';
import DeleteIcon from '@systran/react-components/lib/atoms/Icons/DeleteIcon';
import RowActionMenu from '@systran/react-components/lib/organisms/RowAction/RowActionMenu';
import moment from 'moment';
import {
  INSERT_AT,
  NOTIFICATIONS,
  NOT_READ,
  READ,
  levelList,
  LEVEL,
  DELETE
} from './constant';

import Switch from '@mui/material/Switch';
import { Button, Typography } from '@mui/material';
import SelectLevel from './SelectLevel';
import { FlexRow } from './notification.common';
import { deleteRow, toggleRead } from './notification.store';
import StatusBadge from '@systran/react-components/lib/atoms/StatusBadge';
// import StatusTag from '@systran/react-components/lib/atoms/Tags/StatusTag';

import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import PlayIcon from '@systran/react-components/lib/atoms/Icons/PlayIcon';
import i18next from 'i18next';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export const columnList: GridColDef[] = [
  // { field: 'id', headerName: 'ID', align: 'left', headerAlign: 'center' },
  // {
  //   field: 'mark',
  //   headerName: MARK,
  //   align: 'center',
  //   headerAlign: 'center',
  //   headerClassName: 'super-app-theme--header',
  //   renderCell: () => (
  //     <MarkChoice optionList={optionList} />
  //   )
  // },
  {
    field: 'elipsis',
    // key: 'action',
    flex: 0.2,
    sortable: false,
    editable: false,
    renderCell: (f) => <RowActionMenu actions={actions} selectedRow={f?.row} />,
    headerName: ''
  },
  {
    field: 'level',
    headerName: LEVEL,
    align: 'left',
    headerAlign: 'center',
    sortable: false,
    renderCell: (params) => (
      <div>
        <StatusBadge
          title={i18next.t(params.row.level)}
          type={params.row.level}
          text={i18next.t(params.row.level)}
        />
      </div>
    )
    // renderHeader: () => <SelectLevel name={LEVEL} itemList={levelList} />
  },
  {
    field: 'read',
    headerName: READ,
    align: 'left',
    headerAlign: 'center',
    minWidth: 200,
    renderCell: (params) => (params.row.read ? READ : NOT_READ)
  },
  {
    field: 'notification',
    headerName: NOTIFICATIONS,
    sortable: false,
    align: 'left',
    headerAlign: 'center',
    minWidth: 600
  },
  {
    field: 'insertedAt',
    headerName: INSERT_AT,
    align: 'left',
    headerAlign: 'center'
    // sortComparator: momentComparator
  }
  // {
  //   field: 'delete',
  //   headerName: DELETE,
  //   align: 'left',
  //   headerAlign: 'center',
  //   renderCell: (params) => (
  //     <div>
  //       <Button
  //         onClick={(event) => {
  //           event.stopPropagation();
  //           deleteRow(params.row.id);
  //         }}
  //       >
  //         <DeleteIcon />
  //       </Button>
  //     </div>
  //   )
  // },

];

const actions = [
  {
    label: 'Mark as read',
    icon: <PlusIcon />,
    onClick: (params) => toggleRead(params[0].id, true)
  },
  {
    label: 'Mark as read',
    icon: <PlusIcon />,
    onClick: (params) => toggleRead(params[0].id, false)
  // },
  // {
  //   label: 'Delete',
  //   icon: <DeleteIcon />
  //   // disable: function (entries: any) {
  //   //   return entries.length < 1;
  //   // },
  //   // onClick: onDeleteRowClick,
  }
];

/*
???????????????  sort ininsertat column
const momentComparator: GridComparatorFn = (v1, v2, param1, param2) => {
  const momnetComparatorResult = gridNumberComparator(
    (v1 as Zmoment),
    (v2 as Zmoment),
    param1,
    param2
  );
  // The `isAdmin` values of the two cells are different
  // We can stop here and sort based on the `isAdmin` field.
  if (momnetComparatorResult !== 0) {
    return momnetComparatorResult;
  }

  return gridStringOrNumberComparator(
    (v1 as NameAdminCellValue).name,
    (v2 as NameAdminCellValue).name,
    param1,
    param2
  );
};
*/
