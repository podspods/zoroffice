import {useState} from 'react';
import TextField from '@systran/react-components/lib/atoms/TextField';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import {SecondaryButton} from '@systran/react-components/lib/atoms/Buttons/Secondary';
import FormGroup from '@mui/material/FormGroup';
import Box from '@mui/material/Box';
import {useTranslation} from 'react-i18next';
import Table from '@systran/react-components/lib/organisms/Table/Table';
import {Engine, ProfileOnChangeOptionsType, Selectors} from '../context/TranslationProfilesAddContext';
import useGetEngines from '../hooks/useGetEngines';
import RefreshRateButton from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import {GridColDef, GridRowSelectionModel} from '@mui/x-data-grid-pro';
import {getEngineData} from '../../../../../../lib/trHelper';

type Props = {source: string; target: string; onChange: (e: ProfileOnChangeOptionsType) => void; disabled?: boolean; engineSelected?: Engine};

export default function TranslationProfilesEngineList({engineSelected: engineSelectedProp, ...props}: Props) {
  const i18n = useTranslation();
  const [displayedEngine, setDisplayedEngine] = useState<string | undefined>(engineSelectedProp === 'v7' ? engineSelectedProp : engineSelectedProp?.name);
  const [engineSelected, setEngineSelected] = useState<Engine | undefined>(engineSelectedProp);
  const [selectors, setSelectors] = useState<Selectors>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {data, mutate, isLoading, setRefreshInterval, refreshInterval} = useGetEngines({source: props.source, target: props.target, onlyLastVersion: true});

  const columns: Array<GridColDef> = [
    {
      field: 'id',
      sortable: true,
      editable: false,
      flex: 1,
      headerName: i18n.t('Translation resource ID')
    },
    {
      field: 'name',
      sortable: true,
      editable: false,
      headerName: i18n.t('Name')
    },
    {
      field: 'sortableVersion',
      sortable: false,
      editable: false,
      headerName: i18n.t('Version')
    },
    {
      field: 'techtype',
      sortable: false,
      editable: false,
      headerName: i18n.t('Techno')
    },
    {
      field: 'owner',
      sortable: true,
      editable: false,
      headerName: i18n.t('Owner')
    },
    {
      field: 'domain',
      sortable: true,
      editable: false,
      headerName: i18n.t('Domain')
    }
  ];

  const onChangeSelectedEngine = () => {
    props.onChange({engineSelected: engineSelected, selectors: selectors});
    if (engineSelected !== 'v7') {
      setDisplayedEngine(engineSelected?.name || '');
    }
    setIsOpen(false);
  };

  const onEngineBtnClick = () => {
    setIsOpen(true);
  };

  // If details type is GridCallbackDetails<any> as default, details.api.state will be not correctyly, so we need to check it later
  const onSelectionChange = (rowSelectionModel: GridRowSelectionModel, details: any) => {
    const engine = rowSelectionModel?.[0];
    setEngineSelected(getEngineData(details.api.state.rows.dataRowIdToModelLookup[engine]));
    setSelectors(details.api.state.rows.dataRowIdToModelLookup[engine]?.selectors);
  };

  let rowSelectionModel: string[] | undefined;
  if (engineSelected !== 'v7') {
    // Check if engineSelected is an object before accessing its id property
    if (engineSelected?.id) {
      rowSelectionModel = [engineSelected.id];
    }
  }

  return (
    <Box>
      <ConfirmModal width='large' title={i18n.t('Select a Translation resource')} open={isOpen} onConfirm={onChangeSelectedEngine} onClose={() => setIsOpen(false)}>
        <Box style={{margin: '8px'}}>
          <RefreshRateButton isLoading={isLoading} onRefresh={mutate} onRefreshChange={setRefreshInterval} refreshRate={refreshInterval} />
        </Box>
        <Table
          initialState={{sorting: {sortModel: [{field: 'sortableVersion', sort: 'desc' as const}]}}}
          rowSelectionModel={rowSelectionModel}
          columns={columns}
          rows={data}
          onRowSelectionModelChange={onSelectionChange}
        />
      </ConfirmModal>
      <FormGroup row>
        <TextField
          placeholder={i18n.t('Translation resource')}
          name='engineName'
          value={displayedEngine}
          sx={{
            flex: 1,
            '& fieldset': {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0
            }
          }}
          InputProps={{readOnly: true}}
        />
        <SecondaryButton disabled={props.disabled} onClick={onEngineBtnClick} style={{height: 'auto', borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}>
          {i18n.t('Select')}
        </SecondaryButton>
      </FormGroup>
      <Box component='span' id='profileEngineHelp' />
    </Box>
  );
}
