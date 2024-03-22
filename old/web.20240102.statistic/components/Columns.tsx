import SharingIndicator, { Sharing } from '@/components/Permissions/SharingIndicator';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import RowActionMenu from '@systran/react-components/lib/organisms/RowAction/RowActionMenu';
import UserIcon from '@systran/react-components/lib/atoms/Icons/UserIcon';
import TooltipCustom from '@systran/react-components/lib/atoms/TooltipCustom';
import { GridColDef, GridValidRowModel, GridRenderCellParams } from '@systran/react-components/lib/organisms/Table/Table';

export function sharingStatus({t}: {t: (text: string) => string}) {
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
    <TooltipCustom title={date.toLocaleString()} placement={'bottom'} show>
      <span>
        {date.toLocaleDateString()}
      </span>
    </TooltipCustom>
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
    headerName: t('Actions'),
    renderHeader: () => null,
    width: 60,
    sortable: false,
    editable: false,
    filterable: false,
    resizable: false,
    disableColumnMenu: true,
    align: 'center' as const,
    renderCell: (params) => (!hide(params) && (<RowActionMenu actions={actions} selectedRow={params.row} />))
  } satisfies GridColDef<RowType>;
}
