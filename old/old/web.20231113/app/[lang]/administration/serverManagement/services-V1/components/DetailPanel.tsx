import * as React from 'react';
import Box from '@mui/material/Box';
import {
  DataGridPro,
  GridColDef,
  GridRowParams
} from '@mui/x-data-grid-pro';

/** define type status to avoid using string in code  */
export enum Status {
  SUCCESS = 'success',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  ERROR = 'error',
  INFO = 'info',
  DEFAULT = 'default'
}
/** define row format */
type DataRow = {
  id: number;
  name: string;
  status: Status;
};

/** define column name and mapping value (with row format)  */
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: 'Name' },
  { field: 'status', headerName: 'Status' }
];

/** data for test  */
const rows: DataRow[] = [
  { id: 1, name: 'service 1', status: Status.DEFAULT },
  { id: 2, name: 'service 2', status: Status.ERROR },
  { id: 3, name: 'service 3', status: Status.INFO },
  { id: 4, name: 'service 4', status: Status.PRIMARY },
  { id: 5, name: 'service 5', status: Status.SECONDARY },
  { id: 6, name: 'service 6', status: Status.SUCCESS }
];


/** function to define if the row can be expand or not  */
function conditionToDisplayExpand(status: Status): boolean {
  return status !== Status.SUCCESS && status !== Status.INFO; // add here you condition to display expan
}

function getDetailPanelContent({ row }: GridRowParams) {
  const readRow: DataRow = row;
  return (
    conditionToDisplayExpand(row.status) && (
      <Box
        sx={{ p: 2 }}
      >{`service #${readRow.name} not (success or info) blablabla...`}</Box>
    )
  );
}

/** textaera for expand value  */
export default function DetailPanel() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGridPro
        rows={rows}
        columns={columns}
        // checkboxSelection
        getDetailPanelContent={getDetailPanelContent} // param to define that the datagrid has expand row value
      />
    </div>
  );
}

