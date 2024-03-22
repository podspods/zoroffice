import {MouseEvent, useMemo} from 'react';
import renderTablePostEditorCell from '@systran/react-components/lib/atoms/TablePostEditorComponent';
import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender, useGridApiContext, GridRowId } from '@systran/react-components/lib/organisms/Table/Table';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import {useTranslation} from 'react-i18next';
import {actionColumn} from '@/components/Columns';
import { DictEntry, changeTranslationType, FileInformations } from './EditorTable';
import IconButton from '@systran/react-components/lib/atoms/Buttons/IconButton';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import ListIcon from '@systran/react-components/lib/atoms/Icons/ListIcon';
import MinusIcon from '@systran/react-components/lib/atoms/Icons/MinusIcon';
import ReliabilityBar from '@systran/react-components/lib/atoms/ReliabilityBar';
import styled from '@systran/react-components/lib/Theme/styled';
import Inflections from './Inflections';
import Tooltip from '@systran/react-components/lib/atoms/Tooltip';
import CheckIcon from '@systran/react-components/lib/atoms/Icons/CheckIcon';
import { KeyedMutator } from 'swr';


type RenderCellParams = GridRenderCellParams<DictEntry, any, any, GridTreeNodeWithRender>;

type RenderTextCellProps = {
  text: string;
  rowId: GridRowId;
  type?: 'dnt' | 'translation';
  field: string;
  inflections?: string;
  editable?: boolean;
}

export const POS_MAP = [
  {value: 'auto', label: 'Auto'},
  {value: 'acr', label: 'Acronym'},
  {value: 'adj', label: 'Adjective'},
  {value: 'adv', label: 'Adverb'},
  {value: 'conj', label: 'Conjunction'},
  {value: 'expr', label: 'Expression'},
  {value: 'noun', label: 'Noun'},
  {value: 'prep', label: 'Preposition'},
  {value: 'proper noun', label: 'Proper Noun'},
  {value: 'rule', label: 'Rule'},
  {value: 'verb', label: 'Verb'},
  {value: '?', label: 'Unknown'}
];

export const PRIORITY_MAP = [
  {value: 1, label: '1 - High Over Rules & Expressions'},
  {value: 2, label: '2 - High Over Expressions'},
  {value: 3, label: '3 - High'},
  {value: 4, label: '4 - Normal'},
  {value: 7, label: '7 - Only if not exists (NFW)'},
  {value: 8, label: '8 - Manual choice only'},
  {value: 9, label: '9 - Inactive'}
];


const Cell = ({text, field, rowId, type, inflections, editable = true}: RenderTextCellProps) => {
  const {t} = useTranslation();
  const gridApiRef = useGridApiContext();

  const editRow = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    gridApiRef.current.startRowEditMode({ id: rowId });
  };

  return (
    <Tooltip
      placement='right'
      show={!!inflections}
      title={<>
        <b>{t('Inflections').toLocaleUpperCase()}</b>
        <Inflections inflections={inflections || ''} />
      </>}
    >
      <StyledCell onClick={editable ? editRow : undefined}>
        {(field === 'tgt' && type === 'dnt') ? <i><MinusIcon shape='circle' size='xs' /> {t('Do Not Translate')}</i> : text}
        {!!inflections && <ListIcon />}
      </StyledCell>
    </Tooltip>
  );
};


const renderCell = ({id, field, ...entry}: RenderCellParams) => {
  const inflections = field === 'tgt'
    ? entry.row.tgtInflection
    : field === 'src'
      ? entry.row.srcInflection
      : undefined;
  const editable = field === 'tgt' ? entry.row.type !== 'dnt' : true;

  const priorityLabel = field === 'priority'
    ? PRIORITY_MAP.find(item => item.value === entry.row.priority)?.label || entry.row.priority.toString()
    : undefined;

  const posLabel = field === 'pos'
    ? POS_MAP.find(item => item.value === entry.row.pos)?.label || entry.row.pos.toString()
    : undefined;

  const textCell = priorityLabel || posLabel || entry.row[field as keyof DictEntry].toString();

  return (<Cell
    text={textCell}
    rowId={id.toString()}
    field={field}
    type={entry.row.type}
    inflections={inflections}
    editable={editable}
    {...entry}
  />);
};


export default function useColumns(actions: RowAction<DictEntry>[], fileInformations: FileInformations, targetLanguage: string | null, mutate: KeyedMutator<DictEntry[]>) {
  const {t} = useTranslation();

  const duplicateAction = actions.find((action) => action.label === 'Duplicate');

  const TranslationStateButton = ({type, row, targetLanguage}: {type: 'dnt' | 'translation', row: DictEntry, targetLanguage: string | null}) => {
    const [tooltipLabel, icon] = type === 'dnt'
      ? ['Translate', <CheckIcon checked shape='circle' iconStyle='regular' />]
      : ['Do not translate', <MinusIcon shape='circle' />];

    return (<div className='rowHoverBtn'>
      <IconButton
        tooltipLabel={tooltipLabel}
        icon={icon}
        color='offGrey'
        onClick={async () => {
          await changeTranslationType(row, fileInformations, targetLanguage); mutate();
        }}
      />
    </div>);
  };

  return useMemo(() => [
    {
      field: 'src',
      flex: 1,
      sortable: true,
      editable: true,
      renderCell,
      renderEditCell: (row: RenderCellParams) => renderTablePostEditorCell(row),
      headerName: t('Source')
    },
    {
      field: 'pos',
      flex: 1,
      sortable: true,
      editable: true,
      renderCell,
      renderEditCell: (row: RenderCellParams) => renderTablePostEditorCell({select: true, options: POS_MAP, ...row}),
      headerName: t('POS')
    },
    {
      field: 'tgt',
      flex: 1,
      sortable: true,
      editable: true,
      headerName: t('Target'),
      renderCell,
      renderEditCell: (entry: RenderCellParams) => {
        return entry.row.type === 'dnt'
          ? <i><MinusIcon shape='circle' size='xs' /> {t('Do Not Translate')}</i>
          : renderTablePostEditorCell(entry);
      }
    },
    {
      field: 'translation',
      type: 'string',
      headerName: t(' '),
      renderHeader: () => null,
      width: 60,
      sortable: false,
      filterable: false,
      resizable: false,
      disableColumnMenu: true,
      align: 'center' as const,
      renderCell: ({row}: RenderCellParams) => <TranslationStateButton row={row} type={row.type} targetLanguage={targetLanguage} />
    },
    {
      field: 'priority',
      flex: 1,
      sortable: true,
      editable: true,
      renderCell,
      renderEditCell: (row: RenderCellParams) => renderTablePostEditorCell({select: true, options: PRIORITY_MAP, ...row}),
      headerName: t('Priority')
    },
    {
      field: 'comments',
      flex: 1,
      sortable: true,
      editable: true,
      renderCell,
      renderEditCell: (row: RenderCellParams) => renderTablePostEditorCell(row),
      headerName: t('Comments')
    },
    {
      field: 'confidence',
      flex: 1,
      sortable: true,
      editable: true,
      renderCell: ({row}: RenderCellParams) => <ReliabilityBar value={Math.round(row.confidence)} />,
      renderEditCell: (row: RenderCellParams) => renderTablePostEditorCell(
        {
          ...row,
          formattedValue: <ReliabilityBar value={Math.round(row.row.confidence)} />,
          isEditable: false
        }
      ),
      headerName: t('Confidence')
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
            icon={<PlusIcon shape='circle' />}
            color='offGrey'
            onClick={() => duplicateAction?.onClick && duplicateAction.onClick([row])}
          />
        </div>)
    },
    actionColumn({t, actions})
  ] satisfies GridColDef<DictEntry>[], [actions]);
}


const StyledCell = styled('div')`
    width: 100%;
    height: 100%;
    white-space: break-spaces;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
