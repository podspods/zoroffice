import SharingIndicator, { Sharing } from '@/components/Permissions/SharingIndicator';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import RowActionMenu from '@systran/react-components/lib/organisms/RowAction/RowActionMenu';
import UserIcon from '@systran/react-components/lib/atoms/Icons/UserIcon';
import Tooltip from '@systran/react-components/lib/atoms/Tooltip';
import { GridColDef, GridValidRowModel, GridRenderCellParams } from '@systran/react-components/lib/organisms/Table/Table';
import { Radio } from '@mui/material';
import { LinkInternal } from '@systran/react-components/lib/atoms/Link';
import FolderIcon from '@systran/react-components/lib/atoms/Icons/FolderIcon';

export function sharingStatusColumn({t}: {t: (text: string) => string}) {
  return {
    field: 'sharingStatus',
    type: 'string',
    headerName: t('Sharing rules'),
    renderHeader: () => <UserIcon type={'group'} />,
    align: 'center',
    headerAlign: 'center',
    width: 60,
    resizable: false,
    renderCell: ({row}) => <SharingIndicator status={row.sharingStatus} />
  } satisfies GridColDef<{sharingStatus: Sharing}>;
}

function renderDate(date?: Date) {
  if (!date)
    return '';

  return (
    <Tooltip title={date.toLocaleString()} placement={'bottom'} show>
      <span>
        {date.toLocaleDateString()}
      </span>
    </Tooltip>
  );
}

export function dateColumn({t}: {t: (text: string) => string}) {
  return {
    field: 'createdAt',
    type: 'date',
    headerName: t('Date'),
    width: 100,
    renderCell: ({row}) => renderDate(row.createdAt)
  } satisfies GridColDef<{createdAt?: Date}>;
}

export type ActionColumnProps<RowType extends GridValidRowModel> = {
  t: (text: string) => string,
  actions: RowAction<RowType>[],
  hide?: (params: GridRenderCellParams<RowType>) => boolean
}

export function actionColumn<RowType extends GridValidRowModel>({t, actions, hide = () => false}: ActionColumnProps<RowType>) {
  return {
    field: ' ', // Avoid '' as it causes a visual bug
    type: 'string',
    headerName: t('Actions'),
    renderHeader: () => null,
    width: 60,
    sortable: false,
    filterable: false,
    resizable: false,
    disableColumnMenu: true,
    align: 'center' as const,
    renderCell: (params) => (!hide(params) && (<RowActionMenu actions={actions} selectedRow={params.row} />))
  } satisfies GridColDef<RowType>;
}

export function radioSelectionColumn<RowType extends GridValidRowModel>({t, selectedRowId}: {t: (text: string) => string, selectedRowId?: string}) {
  return {
    field: 'radiobutton',
    headerName: t('Selection'),
    renderHeader: () => null,
    width: 40.28,
    sortable: false,
    filterable: false,
    resizable: false,
    disableColumnMenu: true,
    align: 'center' as const,
    renderCell: (params) => (
      <Radio checked={params.row.id === selectedRowId} />
    )
  } satisfies GridColDef<RowType>;
}

function renderTmFilename(filename: string | undefined, type: 'directory' | 'file') {
  const pathName = filename && filename.substr(filename.lastIndexOf('/') + 1);
  if (type === 'directory') {
    return (
      <LinkInternal href={'?directory=' + (filename || '/')}>
        <FolderIcon />
        <span style={{marginRight: '5px'}} />
        {pathName}
      </LinkInternal>
    );
  }
  return pathName;
}

export function tmFilenameColumn<RowType extends GridValidRowModel>({t}: {t: (text: string) => string}) {
  return {
    field: 'filename',
    type: 'string',
    headerName: t('Filename'),
    flex: 100,
    renderCell: ({row}) => (
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {renderTmFilename(row.filename, row.type)}
      </span>
    )
  } satisfies GridColDef<RowType>;
}
