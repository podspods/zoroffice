import {SetStateAction, useMemo, useState} from 'react';
import LanguagePairsRender from '@systran/react-components/lib/LanguagePairsRender';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import {RefreshRate} from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import TextField from '@systran/react-components/lib/atoms/TextField';
import Table, {GridColDef} from '@systran/react-components/lib/organisms/Table/Table';
import {Grid, MenuItem, Select, Checkbox, FormControlLabel} from '@mui/material';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import useSWR from 'swr';
import Apis from '@/utils/apis';
import {useTranslation} from 'react-i18next';
import {Data, Dict} from '../FeedbackType';
import GdictMetadata from '@/components/gdictMetadata';
import Toolbar from './ModalToolbar';

type Props = {
  open: boolean
  onConfirm: (data: Data) => Promise<void>
  onClose: () => void
}

function formatLanguagePairs(row: Dict) {
  return LanguagePairsRender({
    source: row?.srcLang,
    target: row?.tgtLangs,
    icon: undefined,
    localized: undefined,
    title: undefined
  });
}

function useColumns() {
  const {t} = useTranslation();
  return useMemo(() => {
    return [
      {
        field: 'name',
        flex: 0.7,
        editable: false,
        sortable: true,
        headerName: t('Name')
      },
      {
        field: 'srcLang',
        flex: 1,
        sortable: true,
        editable: false,
        renderCell: ({row}: { row: Dict }) => formatLanguagePairs(row),
        headerName: t('Language Pair')
      },
      {
        field: 'nbEntries',
        flex: 1,
        sortable: true,
        editable: false,
        headerName: t('Number of entries')
      },
      {
        field: 'comment',
        flex: 1,
        sortable: true,
        editable: false,
        headerName: t('Comment')
      }
    ] satisfies GridColDef<Dict>[];
  }, [t]);
}

const slots = {
  toolbar: Toolbar
};

export default function AddToUdModal({open, onConfirm, onClose}: Props) {
  const [refreshInterval, setRefreshInterval] = useState<RefreshRate>('Never');

  const {data, isLoading, isValidating, mutate} = useSWR(Apis.dictionary.list({type: 'UD'}), {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    refreshInterval: (refreshInterval === 'Never') ? 0 : (refreshInterval * 1000),
    onError: (err) => console.error('Error fetching UD list:', err) // eslint-disable-line
  });

  const udList = useMemo(() => {
    return data?.data;
  }, [data]);

  const {t} = useTranslation();
  const [selectedRow, setSelectedRow] = useState<Dict>();

  const onSelectionChange = (rowSelectionModel: GridRowSelectionModel, details: any): void => {
    const engine = rowSelectionModel?.[0];
    if (details?.api) {
      setSelectedRow(details.api.state.rows.dataRowIdToModelLookup[engine]);
    }
  };
  const columns = useColumns();
  const [pos, setPos] = useState('auto');
  const [priority, setPriority] = useState<string | number>(4);
  const [dnt, setDnt] = useState(false);
  const [comments, setComments] = useState('');

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

  const initialState = {
    sorting: {sortModel: [{field: 'name', sort: 'desc' as const}]},
    pagination: {paginationModel: {pageSize: 10}}
  };

  const handleDntChange = (e: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
    setDnt(e.target.checked);
  };

  const handleCommentsChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setComments(e.target.value);
  };

  const onModalSubmit = async () => {
    if (!selectedRow) {
      throw new Error('Selected UD is undefined');
    }
    const {id, accountId, srcLang, tgtLangs} = selectedRow;
    const dict: Dict = {dictId: id, ownerId: accountId, srcLang, tgtLangs};

    const data: Data = {pos, priority, dnt, comments, dict};
    await onConfirm(data);
  };

  return (
    <ConfirmModal
      open={open}
      title={i18n.t('Append an entry to a Dictionary')}
      width='extraLarge'
      onConfirm={onModalSubmit}
      onClose={onClose}
    >
      <Grid container md={12} style={{marginLeft: '15px'}}>
        <Grid container md={6}>
          <Grid item md={4} style={{marginTop: '6px'}}>
            {t('Part of Speech')}
          </Grid>
          <Grid item md={8}>
            <Select
              sx={{width: '250px'}}
              size='small'
              placeholder={t('Part of Speech')}
              onChange={(event) => setPos(event.target.value)}
              value={pos}
            >
              {GdictMetadata.posDisplayMap.map(({value, label}) => <MenuItem value={value}>{label}</MenuItem>)}
            </Select>
          </Grid>
        </Grid>
        <Grid container md={6}>
          <Grid item md={3} style={{marginTop: '6px'}}>
            {t('Priority')}
          </Grid>
          <Grid item md={9}>
            <Select
              sx={{width: '250px'}}
              size='small'
              placeholder={t('Priority')}
              onChange={(event) => setPriority(event.target.value)}
              value={priority}
            >
              {GdictMetadata.prioDisplayMap.map(({value, label}) => <MenuItem value={value}>{label}</MenuItem>)}
            </Select>
          </Grid>
        </Grid>
      </Grid>
      <Grid sx={{margin: '10px 14px 3px 14px'}}>
        <FormControlLabel
          label={t('Do not translate')}
          control={<Checkbox onChange={handleDntChange} />}
        />
        <div>
          <TextField
            multiline
            style={{width: '100%'}}
            rows={1}
            placeholder={t('Comments')}
            fullWidth
            onChange={handleCommentsChange}
            value={comments}
          />
        </div>
      </Grid>
      <Table
        pagination
        loading={isLoading}
        rows={udList || []}
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
