import {useState, useMemo} from 'react';
import LanguagePairsRender from '@systran/react-components/lib/molecules/LanguagePairsRender';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import {RefreshRate} from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import Table, {GridColDef, GridRowSelectionModel} from '@systran/react-components/lib/organisms/Table/Table';
import useSWR from 'swr';
import Apis from '@/utils/apis';
import { useTranslation } from 'react-i18next';
import Toolbar from './ModalToolbar';
import {Tm} from '../FeedbackType';
import { dateColumn, radioSelectionColumn, tmFilenameColumn } from '@/components/Columns';
import {
  transformApiResponse
} from '../../../../linguisticConfiguration/resources/translationMemory/lib/TranslationMemory';

type Props = {
  open: boolean;
  onConfirm: (tm: Tm) => (Promise<void>);
  onClose: () => void
}

function useColumns(selectedRowId?: string) {
  const {t} = useTranslation();

  return useMemo(() => {
    return [
      radioSelectionColumn({t, selectedRowId}),
      {
        ...tmFilenameColumn({t}),
        flex: 1
      },
      {
        field: 'sourceLanguage',
        headerName: t('Language Pair'),
        flex: 1,
        renderCell: ({row}) => <div>{row.sourceLanguage && LanguagePairsRender({source: row.sourceLanguage, target: row.targetLanguages})}</div>
      },
      {
        ...dateColumn({t}),
        flex: 1
      },
      {
        field: 'nbSegments',
        headerName: t('Size'),
        flex: 1
      }
    ] satisfies GridColDef<Tm>[];
  }, [selectedRowId, t]);
}

const slots = {
  toolbar: Toolbar
};

export default function AddToTmModal({open, onConfirm, onClose}: Props) {
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
  const [selectedRow, setSelectedRow] = useState<Tm>();
  const columns = useColumns(selectedRow?.id);

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
      disabled={selectedRow === undefined}
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
