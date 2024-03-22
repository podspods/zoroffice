import Table, {GridValidRowModel} from '@systran/react-components/lib/organisms/Table/Table';
import {TTranslationResource} from '../../components/types';
import useColumns from '../hooks/useColumns';
import useActions, {TInstance} from '../hooks/useActions';
import TranslationResourcesTableToolbarInstances, {ToolbarProps} from './TranslationResourcesTableToolbarInstances';
import {useMemo, useState} from 'react';
import {KeyedMutator} from 'swr';
import {RefreshRate} from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import useModals from '../hooks/useModals';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@systran/react-components/lib/atoms/TextField';
import {SecondaryButton} from '@systran/react-components/lib/atoms/Buttons/Secondary';
import {useTranslation} from 'react-i18next';
import {PostApi} from '../../components/PostApi';

type TProps = {
  trDetailData: TTranslationResource;
  refetchPage: KeyedMutator<TInstance[]>;
  isLoading: boolean;
  refreshRate: RefreshRate;
  setRefreshRate: (value: RefreshRate) => void;
  id: string;
};

const slots = {
  toolbar: TranslationResourcesTableToolbarInstances
};

const initialState = {pagination: {paginationModel: {pageSize: 10, page: 0}}, sorting: {sortModel: [{field: 'version', sort: 'desc' as const}]}};

export default function TranslationResourceDetailInstances({trDetailData, refetchPage, refreshRate, setRefreshRate, isLoading, id}: TProps) {
  const [modal, setOpenedModal] = useModals({mutate: refetchPage, id});
  const actions = useActions(setOpenedModal);
  const columns = useColumns(trDetailData.runnable, actions);

  const slotProps = useMemo(
    () => ({
      toolbar: {
        actions,
        isLoading: isLoading,
        refreshRate: refreshRate,
        setRefreshRate: setRefreshRate,
        setOpenedModal,
        mutate: refetchPage,
        UpdateInstanceGroup: <UpdateInstanceGroup id={id} trDetailData={trDetailData} />
      } satisfies ToolbarProps
    }),
    [isLoading, toolbar, refreshRate, setRefreshRate, setOpenedModal, refetchPage]
  );

  const computingNodes = [
    ...(trDetailData.computingNodes || []),
    ...trDetailData.installableComputingNodes.map((node) => ({
      ...node,
      id: node.hostname,
      status: 'not installed'
    }))
  ];

  return (
    <>
      <Table initialState={initialState} pageSizeOptions={[10, 25, 50, 100]} columns={columns} rows={computingNodes as GridValidRowModel[]} slots={slots} slotProps={slotProps} checkboxSelection />
      {modal}
    </>
  );
}

type TUpdateInstanceGroupProps = {id: string; trDetailData: TTranslationResource};

const UpdateInstanceGroup = ({id, trDetailData}: TUpdateInstanceGroupProps) => {
  const {t} = useTranslation();
  const [nbInstances, setNbInstances] = useState<string | number>(trDetailData.nbInstancesRequested || 0);

  const onUpdateInstance = () => {
    const requestBody = {
      mode: 'ses',
      nbInstances: nbInstances
    };
    PostApi.updateInstance(id, requestBody);
  };

  return (
    <ButtonGroup>
      <TextField
        type='number'
        style={{width: 100}}
        value={nbInstances}
        InputProps={{
          style: {borderTopRightRadius: 0, borderBottomRightRadius: 0, height: '36px'},
          inputProps: {min: 0}
        }}
        onChange={(e) => setNbInstances(e.target.value)}
      />
      <SecondaryButton onClick={onUpdateInstance} style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}>
        {t('Apply')}
      </SecondaryButton>
    </ButtonGroup>
  );
};
