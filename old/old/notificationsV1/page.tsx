'use client';

import React from 'react';
import Table from '@systran/react-components/lib/organisms/table/TableWrapper';
import i18n from '../../../i18n';
import { BaseButton } from '@systran/react-components/lib/atoms/Buttons/Base';
import PageName from './PageName';
import {
  ERROR_TEXT,
  INFO_TEXT,
  INSERT_AT,
  LEVEL,
  MARK,
  MARK_ALL_AS_READ,
  MARK_AS_READ,
  MARK_AS_UNREAD,
  NOTIFICATIONS,
  NOT_READ,
  PAGE_NAME,
  READ,
  SUCCESS_TEXT
} from './constant';
import { GridRowsProp, GridColDef } from '@mui/x-data-grid';
import MarkChoice from './MarkChoice';

export const toolbarElement = [
  {
    label: MARK_AS_READ,
    // disable: false,
    onClick: () => {alert(MARK_AS_READ) },
  },
  {
    label: MARK_AS_UNREAD,
    // disable: false,
    onClick: () => {alert(MARK_AS_UNREAD)},
  },
  {
    label: MARK_ALL_AS_READ,
    // disable: false,
    onClick: () => {alert(MARK_ALL_AS_READ)},
  }
];


export type NotificationsProps = {
  name: string
}


export default function Notifications({...props}: NotificationsProps) {

  const rows: GridRowsProp = [
    {
      id: 1,
      mark: MARK_AS_READ,
      level: SUCCESS_TEXT,
      read: NOT_READ,
      insertAt: i18n.t('2 days ago'),
      notifications: i18n.t(
        'Translation resource 36b8e635-6c43-4de0-909d-bb6b27f7b046 has been applied 1 instances on the node trm '
      ),
      valueGetter: () => {
        return <p>coucou</p>;
      }
    },
    {
      id: 2,
      mark: MARK_AS_READ,
      level: ERROR_TEXT,
      read: NOT_READ,
      insertAt: i18n.t('a days ago'),
      notifications: i18n.t(
        'Unable to import the corpus /TM_ENFR-40k (1).tmx: {"code":"ECONNRESET"}'
      )
    },
    {
      id: 3,
      mark: MARK_AS_UNREAD,
      level: INFO_TEXT,
      read: READ,
      insertAt: i18n.t('an hour ago'),
      notifications: i18n.t('Delete corpus 651a8220e7183630260bbc73'),
    }
  ];
  const columnList: (GridColDef & FilterField)[] = [
    {
      field: 'mark',
      headerName: MARK,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <div>
          <MarkChoice />
        </div>
      )
    },
    {
      field: 'level',
      headerName: LEVEL,
      align: 'left',
      headerAlign: 'center',
      renderCell: (params) => (
        <div>
          <BaseButton color='secondary' fullWidth>
            {params.value}
          </BaseButton>
        </div>
      )
    },
    { field: 'read', headerName: READ, align: 'left', headerAlign: 'center' },
    {
      field: 'notifications',
      headerName: NOTIFICATIONS,
      align: 'left',
      headerAlign: 'center'
    },
    {
      field: 'insertAt',
      headerName: INSERT_AT,
      align: 'left',
      headerAlign: 'center'
    }
  ];

  return (<React.Fragment>

    <div
      style={{
        flex: '1',
        height: '100%',
        width: '100%',
        border: '0',
        padding: '1rem'
      }}
    >
      <PageName name={PAGE_NAME} />

      <Table
        rows={rows}
        columns={columnList}
        checkboxSelection
        toolbar={toolbarElement}
      />
    </div>
  </React.Fragment>);
}

