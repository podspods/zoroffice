import '../styles/color.css';
import { GridColDef } from '@mui/x-data-grid-pro';


import {
  INSERT_AT,
  LEVEL,
  MARK,
  NOTIFICATIONS,
  NOT_READ,
  READ,
  optionList
} from './constant';
import React from 'react';
import ColorButton from '../components/ColorButton';
import SearchBar from '../components/SearchBar';
import Switch from '@mui/material/Switch';
import { handleReadChange } from './common';
import { Typography } from '@mui/material';
import { GridColDef, GridCellParams } from '@mui/x-data-grid';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export const columnList: GridColDef[] = [
  {field: 'id', headerName: 'ID', align: 'left', headerAlign: 'center'},
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
    field: 'level',
    headerName: LEVEL,
    align: 'left',
    headerAlign: 'center',
    renderCell: (params) => (
      <div>
        <ColorButton value={params.value} />
      </div>
    )
  },
  {
    field: 'read', headerName: READ, align: 'left', headerAlign: 'center', minWidth: 200,
    // valueGetter: (params) => {
    //   console.log('params.row.is 49 ==>', params);
    //   return params.row.id;
    // },
    renderCell: (params) => (
      <div className='flex content-center item-center'>
        <Typography>{READ}</Typography>
        <Switch
          id={params.row.id}
          defaultChecked
          value={params.row.id}
          checked={params.value}
          onClick={() => handleReadChange(params.row.id)}
          // onClick={(params) => {
          //   console.log('params 61=>', params);
          //   console.log('params 62=>', params.row.id);
          // }
          // }


          // onRowClick={(rows,params) => {console.log('onRowClick-id ==>', rows.id, params)}}
          // inputProps={{ 'aria-label': 'ant design' }}
          value={params.value}
        />
        <Typography>{NOT_READ}</Typography>
      </div>
    )
  },
  {
    field: 'notification',
    headerName: NOTIFICATIONS,
    sortable: false,
    align: 'left',
    headerAlign: 'center',
    minWidth: 600,
    renderHeader: () => (<SearchBar />
    )
  },
  {
    field: 'insertedAt',
    headerName: INSERT_AT,
    align: 'left',
    headerAlign: 'center'
  }
];
