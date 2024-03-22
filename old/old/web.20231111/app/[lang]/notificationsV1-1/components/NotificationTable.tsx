'use client';

import React from 'react';
import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';
// import { DataGrid, GridColDef} from '@mui/x-data-grid';
import '../styles/color.css';
import { PAGINATION_STEP } from '../common/constant';
import { setCheckedList } from '../common/notification.store';
import { Notification } from '../common/notification.common';
import ChevronIcon from '@systran/react-components/lib/atoms/Icons/ChevronIcon';
import SortIcon from '@systran/react-components/lib/atoms/Icons/SortIcon';
export type NotificationTableProps = {
  name: string;
  columns: GridColDef[];
  rows: Notification[];
  autoHeight?: boolean;
  checkboxSelection?: boolean;
};

export default function NotificationTable({
  ...props
}: NotificationTableProps) {
  // console.log('NotifiTable 19  ==>', props);
  return (
    <React.Fragment>
      <DataGridPro
        columns={props.columns}
        rows={props.rows}
        // getRowClassName={(params) => params.row.rowColor}
        autoHeight={props.autoHeight}
        checkboxSelection={props.checkboxSelection}
        pageSizeOptions={PAGINATION_STEP}
        showCellVerticalBorder
        showColumnVerticalBorder
        onRowSelectionModelChange={(idCheckedList) =>
          setCheckedList(idCheckedList)
        }
        pagination
        initialState={{
          pagination: {
            paginationModel: { pageSize: PAGINATION_STEP[0], page: 0 }
          }
        }}
        sx={{
          borderRadius: '1rem',
          bgcolor: 'white',
          fontSize: '14px',
          '.MuiDataGrid-columnHeaders': {
            bgcolor: '#f4f7f9 !important',
            borderRadius: '1rem 1rem 0 0'
          },
          '.MuiDataGrid-columnHeaderTitleContainer': {
            justifyContent: 'space-between'
          },
          '& .MuiDataGrid-footerContainer div, & .MuiDataGrid-footerContainer span, & .MuiDataGrid-footerContainer p': {
            fontSize: '14px'
          },
          '.MuiDataGrid-detailPanel': { overflow: 'unset', zIndex: 0 }
        }}
        slots={{
          columnSortedDescendingIcon: () => <SortIcon direction='down' />,
          columnSortedAscendingIcon: () => <SortIcon direction='up' />,
          columnUnsortedIcon: () => <SortIcon />,
          detailPanelExpandIcon: () => <ChevronIcon direction='down' />,
          detailPanelCollapseIcon: ChevronIcon
        }}
      />
    </React.Fragment>
  );
}

