import {useMemo, MouseEvent, useContext} from 'react';
import renderTablePostEditorCell from '@systran/react-components/lib/atoms/TablePostEditorComponent';
import { GridColDef, GridValueFormatterParams } from '@mui/x-data-grid-pro';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import {type Sentence} from './types';
import {useTranslation} from 'react-i18next';
import {useParams} from 'next/navigation';
import CheckIcon from '@systran/react-components/lib/atoms/Icons/CheckIcon';
import styled from '@systran/react-components/lib/Theme/styled';
import {Theme} from '@systran/react-components/lib/Theme';
import {actionColumn} from '@/components/Columns';
import renderTimeFrom from '@/utils/renderDate';
import WandMagicSparklesIcon from '@systran/react-components/lib/atoms/Icons/WandMagicSparklesIcon';
import Tooltip from '@systran/react-components/lib/atoms/Tooltip';
import {GridRowModel, useGridApiContext} from '@systran/react-components/lib/organisms/Table/Table';
import {PostEditorContext} from './context/PostEditorContext';
import {getTimestampFromTime} from '@/utils/time';
import IconButton from '@systran/react-components/lib/atoms/Buttons/IconButton';
import RefreshIcon from '@systran/react-components/lib/atoms/Icons/RefreshIcon';
import {updateTranslation} from './SaveSentences';
import type {UpdateToastMessage} from '@/components/contexts/ToastMessageContext';
import {FilePostEditorMessages} from './Messages';

export default function useColumns(actions: RowAction<Sentence>[], mutate: () => Promise<Sentence[] | undefined>, updateToastMessage: UpdateToastMessage) {
  const {t} = useTranslation();
  const {mode} = useContext(PostEditorContext);
  const params = useParams();

  const retranslateSegment = (row: GridRowModel, stopEdit: () => void) => {
    const sentencesModifications = {
      fileId: row.fileId,
      sentences: [row]
    } as { fileId: string, sentences: Sentence[] };
    updateTranslation(sentencesModifications, mutate, updateToastMessage).catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      updateToastMessage({
        label: FilePostEditorMessages.error.updateTranslation,
        status: 'error'
      });
    });
    stopEdit();
  };

  const displayMatch = (matchPerCent: string, NFA?: boolean) => {
    const matchType = NFA ? 'NFA' : matchPerCent === '100 %' ? 'TM' : undefined;
    return (
      <ColoredCell match={matchType}>
        {NFA ? <WandMagicSparklesIcon /> : matchPerCent}
      </ColoredCell>
    );
  };

  type renderTextCellProps = {
    text: string;
    rowId: string;
    score?: number;
    NFA?: boolean;
    editable?: boolean;
  }
  const RenderTextCell = ({text, rowId, score, NFA, editable}: renderTextCellProps) => {
    const gridApiRef = useGridApiContext();
    const editRow = (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      gridApiRef.current.startRowEditMode({ id: rowId });
    };
    const matchType = NFA ? 'NFA' : score === 1 ? 'TM' : undefined;
    if (editable) {
      return (
        <ColoredCell match={matchType} onClick={editRow}>
          {text}
        </ColoredCell>
      );
    }
    return (
      <ColoredCell match={matchType}>
        {text}
      </ColoredCell>
    );
  };

  const displayStatus = (status?: string) => {
    if (status === 'Validated') {
      return (
        <Tooltip title={t('Validated')} placement={'top'}>
          <ValidatedCell>
            <CheckIcon shape={'circle'} checked />
          </ValidatedCell>
        </Tooltip>
      );
    }
    return '';
  };

  return useMemo(() => [
    {
      field: 'date',
      width: 150,
      renderCell: ({row}) => renderTimeFrom(row.date, params.lang),
      editable: false,
      sortable: true,
      headerName: t('Date')
    },
    {
      field: 'time',
      width: 150,
      editable: false,
      sortable: false,
      valueGetter: ({row}) => {
        if (!row.segmentMetaData) {
          return undefined;
        }
        const startTime = getTimestampFromTime(row.segmentMetaData.start);
        const endTime = getTimestampFromTime(row.segmentMetaData.end);
        return `${startTime} - ${endTime}`;
      },
      headerName: t('Time')
    },
    {
      field: 'sourceSentence',
      flex: 1,
      sortable: true,
      editable: (mode === 'speech'),
      renderCell: ({row}) => <RenderTextCell text={row.sourceSentence} rowId={row._id} score={row.tmSentence ? row?.tmSentence[0].score : undefined} editable={mode === 'speech'} />,
      headerName: t('Source'),
      renderEditCell: (row) => renderTablePostEditorCell({
        ...row,
        ActionButton: <IconButton
          icon={<RefreshIcon />}
          tooltipLabel={'Retranslate source segment'}
          onClick={() => retranslateSegment(row.row, () => row.api.stopRowEditMode({id: row.id, ignoreModifications: true}))}
        />
      })
    },
    {
      field: 'targetSentence',
      flex: 1,
      sortable: true,
      editable: true,
      headerName: t('Target'),
      renderCell: ({row}) => <RenderTextCell text={row.targetSentence} rowId={row._id} score={row.tmSentence ? row?.tmSentence[0].score : undefined} editable />,
      renderEditCell: (row) => renderTablePostEditorCell(row)
    },
    {
      field: 'match',
      headerName: t('Match'),
      sortable: true,
      editable: false,
      valueGetter: ({row}) => {
        if (!row.tmSentence) {
          return undefined;
        }
        return Math.round(row.tmSentence[0].score * 100);
      },
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (!params.value) {
          return '';
        }
        return `${params.value.toLocaleString()} %`;
      },
      renderCell: ({formattedValue}) => displayMatch(formattedValue)
    },
    {
      field: 'status',
      width: 70,
      sortable: true,
      editable: false,
      renderCell: ({row}) => displayStatus(row.status),
      headerName: t('Status')
    },
    actionColumn({t, actions})
  ] satisfies GridColDef<Sentence>[], [actions]);
}

const ValidatedCell = styled('div')<{theme?: Theme}>`
    color: ${({theme}) => theme.palette.primary.main};
    flex: 1;
    display: flex;
    justify-content: center;
`;

const ColoredCell = styled('div')<{match?: 'NFA' | 'TM', theme?: Theme}>`
    white-space: break-spaces;
    padding: 0.1rem;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    color: ${({match, theme}) => match ? match === 'NFA' ? theme.palette.translationFeatures.NFA : theme.palette.translationFeatures.TM : 'inherit'}
`;
