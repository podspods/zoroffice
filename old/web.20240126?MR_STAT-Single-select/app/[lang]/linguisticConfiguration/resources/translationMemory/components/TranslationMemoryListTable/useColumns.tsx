import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TranslationMemory, IndexationStatus, KnownIndexationStatus } from '../../lib/TranslationMemory';
import LanguagePairsRender from '@systran/react-components/lib/molecules/LanguagePairsRender';
import StatusBadge from '@systran/react-components/lib/atoms/StatusBadge';
import Tooltip from '@systran/react-components/lib/atoms/Tooltip';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import { actionColumn, dateColumn, sharingStatusColumn, tmFilenameColumn } from '@/components/Columns';
import { GridColDef } from '@systran/react-components/lib/organisms/Table/Table';

function typeOfStatus(status: string) {
  switch (status) {
    case 'ok':
      return 'success';
    case 'error':
      return 'error';
    default:
      return 'info';
  }
}

function renderIndexationStatus(indexationStatus?: IndexationStatus) {
  if (!indexationStatus)
    return null;

  const { status } = indexationStatus;
  if (!status || status === '-')
    return null;

  const { processSeg, totalSeg, percentage } = indexationStatus as KnownIndexationStatus;
  return (
    <Tooltip title={`${processSeg}/${totalSeg}`} placement={'bottom'} show>
      <span>
        <StatusBadge status={percentage === 100 ? 'success' : 'info'}>{status}</StatusBadge>
      </span>
    </Tooltip>
  );
}

export default function useColumns(actions: RowAction<TranslationMemory>[]) {
  const {t} = useTranslation();

  return useMemo(() => {
    return [
      sharingStatusColumn({t}),
      tmFilenameColumn({t}),
      {
        field: 'languagePair',
        type: 'string',
        headerName: t('Language Pair'),
        flex: 50,
        valueGetter: ({row}) => (`${row.sourceLanguage || ''} ${row.targetLanguages?.join(' ') || ''}`),
        renderCell: ({row}) => <div>{row.sourceLanguage && <LanguagePairsRender source={row.sourceLanguage} target={row.targetLanguages} />}</div>
      },
      {
        field: 'status',
        type: 'string',
        headerName: t('Import Status'),
        width: 100,
        renderCell: ({row}) => (row.status && <StatusBadge status={typeOfStatus(row.status)}>{row.status}</StatusBadge>)
      },
      {
        field: 'nbSegments',
        type: 'number',
        headerName: t('Size'),
        flex: 30,
        renderCell: ({row}) => (row.nbSegments ?? '')
      },
      {
        field: 'indexationStatus',
        valueGetter: ({row}) => row.indexationStatus?.status || '',
        headerName: t('Indexation Status'),
        width: 100,
        renderCell: ({row}) => renderIndexationStatus(row.indexationStatus)
      },
      dateColumn({t}),
      actionColumn({t, actions, hide: ({row}) => row.type === 'directory'})
    ] satisfies GridColDef<TranslationMemory>[];
  }, [t, actions]);
}
