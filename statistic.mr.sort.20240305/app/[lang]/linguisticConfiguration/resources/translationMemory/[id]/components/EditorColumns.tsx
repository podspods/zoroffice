
import {MouseEvent, useMemo} from 'react';
import renderTablePostEditorCell from '@systran/react-components/lib/atoms/TablePostEditorComponent';
import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender, useGridApiContext } from '@systran/react-components/lib/organisms/Table/Table';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import {useTranslation} from 'react-i18next';
import {actionColumn} from '@/components/Columns';
import { Segment } from './EditorTable';
import IconButton from '@systran/react-components/lib/atoms/Buttons/IconButton';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import styled from '@systran/react-components/lib/Theme/styled';

type RenderCellParams = GridRenderCellParams<Segment, any, any, GridTreeNodeWithRender>;

export default function useColumns(actions: RowAction<Segment>[]) {
  const {t} = useTranslation();

  const duplicateAction = actions.find((action) => action.label === 'Duplicate');

  const RenderTextCell = ({text, rowId, colDef, field}: {text: string, rowId: string, colDef: GridColDef, field: string}) => {
    const gridApiRef = useGridApiContext();

    const editRow = (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      gridApiRef.current.startCellEditMode({ id: rowId, field });
    };

    return (
      <Cell onClick={editRow}>
        {text}
      </Cell>
    );
  };

  return useMemo(() => [
    {
      field: 'source',
      flex: 1,
      sortable: true,
      editable: true,
      renderCell: ({row, colDef, field}: RenderCellParams) => <RenderTextCell text={row.source} rowId={row.id} colDef={colDef} field={field} />,
      renderEditCell: (row: RenderCellParams) => renderTablePostEditorCell(row),
      headerName: t('Source')
    },
    {
      field: 'target',
      valueGetter: (params) => params.row?.target?.seg,
      valueSetter: ({row, value}) => {
        row.target.seg = value;
        return {...row}
      },
      flex: 1,
      sortable: true,
      editable: true,
      headerName: t('Target'),
      renderCell: ({row, colDef, field}: RenderCellParams) => <RenderTextCell text={row.target.seg} rowId={row.id} colDef={colDef} field={field} />,
      renderEditCell: (row: RenderCellParams) => renderTablePostEditorCell(row)
    },
    {
      field: 'Duplicate',
      type: 'string',
      headerName: t(' '),
      renderHeader: () => null,
      width: 60,
      sortable: false,
      filterable: false,
      resizable: false,
      disableColumnMenu: true,
      align: 'center' as const,
      renderCell: ({row}) => (duplicateAction?.onClick &&
        <div className='rowHoverBtn'>
          <IconButton
            tooltipLabel='Duplicate'
            icon={<PlusIcon />}
            color='offGrey'
            onClick={() => duplicateAction?.onClick && duplicateAction.onClick([row])}
          />
        </div>)
    },
    actionColumn({t, actions})
  ] satisfies GridColDef<Segment>[], [actions]);
}


const Cell = styled('div')`
    width: 100%;
    height: 100%;
    white-space: break-spaces;
    display: flex;
    align-items: center;
`;
