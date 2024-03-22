
import {useMemo} from 'react';
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

export default function useColumns(actions: RowAction<Sentence>[]) {
  const {t} = useTranslation();
  const params = useParams();

  const displayMatch = (matchPerCent: string, NFA?: boolean) => {
    const matchType = NFA ? 'NFA' : matchPerCent === '100 %' ? 'TM' : undefined;
    return (
      <ColoredCell match={matchType}>
        {NFA ? <WandMagicSparklesIcon /> : matchPerCent}
      </ColoredCell>
    );
  };

  const renderTextCell = (text: string, score?: number, NFA?: boolean) => {
    const matchType = NFA ? 'NFA' : score === 1 ? 'TM' : undefined;
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
      field: 'sourceSentence',
      flex: 1,
      sortable: true,
      editable: false,
      renderCell: ({row}) => renderTextCell(row.sourceSentence, row.tmSentence ? row?.tmSentence[0].score : undefined),
      headerName: t('Source')
    },
    {
      field: 'targetSentence',
      flex: 1,
      sortable: true,
      editable: true,
      headerName: t('Target'),
      renderCell: ({row}) => renderTextCell(row.targetSentence, row.tmSentence ? row?.tmSentence[0].score : undefined),
      renderEditCell: (row) => renderTablePostEditorCell({previousValue: row.row.mtSentence, ...row})
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
    color: ${({match, theme}) => match ? match === 'NFA' ? 'purple' : theme.palette.secondary.main : 'inherit'}
`;
