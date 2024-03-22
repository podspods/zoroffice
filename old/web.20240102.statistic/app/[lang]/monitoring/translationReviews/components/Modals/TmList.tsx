import {useState, useMemo} from 'react';
import LanguagePairsRender from '@systran/react-components/lib/molecules/LanguagePairsRender';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import {RefreshRate} from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import Table, {GridColDef} from '@systran/react-components/lib/organisms/Table/Table';
import FolderIcon from '@systran/react-components/lib/atoms/Icons/FolderIcon';
import useSWR from 'swr';
import Apis from '@/utils/apis';
import { useTranslation } from 'react-i18next';
import Toolbar from './ModalToolbar';
import {Dict, Tm} from '../FeedbackType';
import {GridRowSelectionModel} from '@mui/x-data-grid';
import {LinkInternal} from '@systran/react-components/lib/atoms/Link';

type Props = {
  open: boolean;
  onConfirm: (tm: Tm) => (Promise<void>);
  onClose: () => void
}

function renderFilename(filename: string, type: 'directory' | 'file') {
  const pathName = filename && filename.substr(filename.lastIndexOf('/') + 1);
  if (type === 'directory') {
    return (
      <LinkInternal href={'?directory=' + filename}>
        <FolderIcon />
        {pathName}
      </LinkInternal>
    );
  }
  return pathName;
}

export function transformApiResponse(tm: any) {
  return {
    ...tm,
    key: tm.DT_RowId,
    id: tm.DT_RowId
  };
}

function formatLanguagePairs(sourceLanguages: string, targetLanguages: string) {
  return LanguagePairsRender({
    source: sourceLanguages,
    target: targetLanguages,
    localized: undefined
  });
}

function useColumns() {
  const {t} = useTranslation();

  return useMemo(() => {
    return [
      {
        field: 'filename',
        type: 'string',
        headerName: t('Filename'),
        flex: 1,
        renderCell: ({row}: {row: Tm}) => (
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {renderFilename(row?.filename, row?.type)}
          </span>
        )
      },
      {
        field: 'sourceLanguage',
        headerName: t('Language Pair'),
        flex: 1,
        sortable: true,
        editable: false,
        renderCell: ({row}: {row: Tm}) => formatLanguagePairs(row.sourceLanguage, row.targetLanguages)
      },
      {
        field: 'createdAt',
        headerName: t('Date'),
        flex: 1,
        sortable: true,
        editable: false
      },
      {
        field: 'nbSegments',
        headerName: t('Size'),
        flex: 1,
        sortable: true,
        editable: false
      }
    ] satisfies GridColDef<Tm>[];
  }, [t]);
}

const slots = {
  toolbar: Toolbar
};

export default function TmList({open, onConfirm, onClose}: Props) {
  const [refreshInterval, setRefreshInterval] = useState<RefreshRate>('Never');

  const {data, isLoading, isValidating, mutate} = useSWR(Apis.feedback.listTM, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    refreshInterval: (refreshInterval === 'Never') ? 0 : (refreshInterval * 1000),
    onError: (err) => console.error('Error fetching UD list:', err) // eslint-disable-line
  });

  const tmList = useMemo(() => {
    return (data?.files || []).map(transformApiResponse);
  }, [data]);

  const {t} = useTranslation();
  const columns = useColumns();
  const [selectedRow, setSelectedRow] = useState<Tm>();

  const onSelectionChange = (rowSelectionModel: GridRowSelectionModel, details: any): void => {
    const engine = rowSelectionModel?.[0];
    setSelectedRow(details.api.state.rows.dataRowIdToModelLookup[engine]);
  };

  const initialState = {
    sorting: {sortModel: [{field: 'createdAt', sort: 'desc' as const}]},
    pagination: {paginationModel: { pageSize: 10}}
  };

  const slotProps = useMemo(() => (
    {
      toolbar: {
        isLoading,
        isValidating,
        refreshInterval,
        setRefreshInterval,
        mutate
      }
    }
  ), [
    isLoading,
    isValidating,
    refreshInterval,
    setRefreshInterval,
    mutate
  ]);

  const onModalSubmit = async () => {
    if (!selectedRow) {
      throw new Error('Selected TM is undefined');
    }
    await onConfirm(selectedRow);
  };

  return (
    <ConfirmModal
      open={open}
      title={t('Append the sentence to a Translation Memory')}
      width='extraLarge'
      onConfirm={onModalSubmit}
      onClose={onClose}
    >
      <Table
        pagination
        loading={isLoading}
        rows={tmList || []}
        columns={columns as any}
        initialState={initialState}
        rowSelectionModel={selectedRow?.id ? [selectedRow.id] : undefined}
        onRowSelectionModelChange={onSelectionChange}
        slots={slots}
        slotProps={slotProps}
      />
    </ConfirmModal>
  );
}
