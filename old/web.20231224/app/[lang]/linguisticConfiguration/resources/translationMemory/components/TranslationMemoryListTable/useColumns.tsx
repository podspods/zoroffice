import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TranslationMemory, IndexationStatus, KnownIndexationStatus } from '../../lib/TranslationMemory';
import LanguagePairsRender from '@systran/react-components/lib/molecules/LanguagePairsRender';
import StatusBadge from '@systran/react-components/lib/atoms/StatusBadge';
import TooltipCustom from '@systran/react-components/lib/atoms/TooltipCustom';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import { actionColumn, dateColumn, sharingStatus } from '@/components/Columns';
import { LinkInternal } from '@systran/react-components/lib/atoms/Link';
import { GridColDef } from '@systran/react-components/lib/organisms/Table/Table';
import FolderIcon from '@systran/react-components/lib/atoms/Icons/FolderIcon';

function renderFilename(filename: string | undefined, type: 'directory' | 'file') {
  const pathName = filename && filename.substr(filename.lastIndexOf('/') + 1);
  if (type === 'directory') {
    return (
      <LinkInternal href={'?directory=' + filename}>
        <FolderIcon />
        <span style={{marginRight: '5px'}} />
        {pathName}
      </LinkInternal>
    );
  }
  return pathName;
}

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
    <TooltipCustom title={`${processSeg}/${totalSeg}`} placement={'bottom'} show>
      <span>
        <StatusBadge status={percentage === 100 ? 'success' : 'info'}>{status}</StatusBadge>
      </span>
    </TooltipCustom>
  );
}

export default function useColumns(actions: RowAction<TranslationMemory>[]) {
  const {t} = useTranslation();

  return useMemo(() => {
    return [
      sharingStatus({t}),
      {
        field: 'filename',
        type: 'string',
        headerName: t('Filename'),
        flex: 100,
        renderCell: ({row}) => (
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {renderFilename(row.filename, row.type)}
          </span>
        )
      },
      {
        field: 'languagePair',
        type: 'string',
        headerName: t('Language Pair'),
        flex: 50,
        valueGetter: ({row}) => (`${row.sourceLanguage || ''} ${row.targetLanguages?.join(' ') || ''}`),
        renderCell: ({row}) => <div>{row.sourceLanguage && <LanguagePairsRender source={row.sourceLanguage} target={row.targetLanguages} />}</div>
      },
      dateColumn({t}),
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
      actionColumn({t, actions, hide: ({row}) => row.type === 'directory'})
    ] satisfies GridColDef<TranslationMemory>[];
  }, [t, actions]);
}
