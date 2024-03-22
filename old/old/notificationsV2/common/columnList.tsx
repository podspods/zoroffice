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
import MarkChoice from '../components/MarkChoice';
import ColorButton from '../components/ColorButton';
import SearchBar from '../components/SearchBar';
import Switch from '@mui/material/Switch';
import { handleReadChange } from './common';
import { Typography } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export const columnList: GridColDef[] = [
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
  { field: 'read', headerName: READ, align: 'left', headerAlign: 'center', minWidth: 200,
    renderCell: (params) => (
      <div className='flex content-center item-center'>
        <Typography>{READ}</Typography>
        <Switch
          defaultChecked
          checked={params.value}
          inputProps={{ 'aria-label': 'ant design' }}
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
