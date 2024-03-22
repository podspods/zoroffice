import { GridColDef } from '@mui/x-data-grid-pro';
import { INSERTED_AT, LEVEL, NOTIFICATIONS, READ, UNREAD } from './constant';
import { NotificationColumn, NotificationInput } from './type';
import { convertMessage } from './utils';
import { durationFromNow } from '@/utils/toString';
import { Parser } from 'html-to-react';
import LevelSelectBox from '@/components/Notifications/components/LevelSelectBox';
import DisplayStatus from './components/DisplayStatus';
import DisplaySearchField from './components/DisplaySearchField';
import DisplayEllipsys from './components/DisplayEllipsys';

export function columnList(
  level: string,
  searchText: string,
  t: (inString: string) => string
): GridColDef<NotificationInput>[] {
  const parser = Parser();
  const columnList: GridColDef<NotificationInput>[] = [
    {
      field: NotificationColumn.LEVEL,
      headerName: t(LEVEL),
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      minWidth: 150,
      renderHeader: () => LevelSelectBox({ currentLevel: level }),
      renderCell: (params) => DisplayStatus({ params: params })
    },
    {
      field: NotificationColumn.READ,
      headerName: t(READ),
      align: 'left',
      headerAlign: 'center',
      minWidth: 100,
      renderCell: (params) => (params.row.read ? t(READ) : t(UNREAD))
    },
    {
      field: NotificationColumn.STR,
      headerName: t(NOTIFICATIONS),
      sortable: false,
      align: 'left',
      headerAlign: 'center',
      minWidth: 500,
      renderHeader: () => DisplaySearchField({ searchText: searchText }),
      renderCell: (params) =>
        params.row.str && parser.parse(convertMessage(params.row.str))
    },
    {
      field: NotificationColumn.INSERTED_AT,
      headerName: t(INSERTED_AT),
      align: 'left',
      minWidth: 100,
      headerAlign: 'center',
      renderCell: (params) =>
        params.row.insertedAt && t(durationFromNow(params.row.insertedAt)),
      sortable: true
    },
    {
      field: 'elipsis',
      flex: 0.2,
      sortable: false,
      maxWidth: 50,
      editable: false,
      renderCell: (params) => DisplayEllipsys({ row: params?.row }),
      headerName: ''
    }
  ];
  return columnList;
}