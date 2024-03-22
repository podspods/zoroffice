import {SetStateAction, useMemo, useState} from 'react';
import LanguagePairsRender from '@systran/react-components/lib/molecules/LanguagePairsRender';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import {RefreshRate} from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import TextField from '@systran/react-components/lib/atoms/TextField';
import { Grid, MenuItem, Select, Checkbox, FormControlLabel } from '@mui/material';
import Table, { GridColDef, GridRowSelectionModel } from '@systran/react-components/lib/organisms/Table/Table';
import useSWR from 'swr';
import Apis from '@/utils/apis';
import {useTranslation} from 'react-i18next';
import { Data, Dict } from '../FeedbackType';
import GdictMetadata from '@/components/gdictMetadata';
import Toolbar from './ModalToolbar';
import { radioSelectionColumn } from '@/components/Columns';

type Props = {
  open: boolean
  onConfirm: (data: Data) => Promise<void>
  onClose: () => void
}

function useColumns(selectedRowId?: string) {
  const {t} = useTranslation();
  return useMemo(() => {
    return [
      radioSelectionColumn({t, selectedRowId}),
      {
        field: 'name',
        flex: 0.7,
        headerName: t('Name')
      },
      {
        field: 'srcLang',
        flex: 1,
        renderCell: ({row}) => <div>{row.srcLang && LanguagePairsRender({source: row.srcLang, target: row.tgtLangs})}</div>,
        headerName: t('Language Pair')
      },
      {
        field: 'nbEntries',
        flex: 1,
        headerName: t('Number of entries')
      },
      {
        field: 'comments',
        type: 'string',
        flex: 1,
        headerName: t('Comment')
      }
    ] satisfies GridColDef<Dict>[];
  }, [selectedRowId, t]);
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
  const columns = useColumns(selectedRow?.id);
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
      disabled={selectedRow === undefined}
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
