import Box from '@mui/material/Box';
import Table, {useRemoteHooks} from '@systran/react-components/lib/organisms/Table/Table';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import useSWR from 'swr';
import {GridRowParams, GridValidRowModel, GridColDef} from '@mui/x-data-grid-pro';
import {ReactNode, useContext, useMemo} from 'react';
import useColumns from '../hook/useColumns';
import Apis from '@/utils/apis';
import {TranslationResourcesContext} from '../context/TranslationResourcesContext';
import TranslationResourcesTableToolbar, {ToolbarProps} from './TranslationResourcesTableToolbar';
import useModals from '../hook/useModals';
import useActions from '../hook/useActions';
import {TTranslationResource} from './types';
import TranslationResourcesTableRowDetail from './TranslationResourcesTableRowDetail';
import {PostApi} from './PostApi';

const slots = {
  toolbar: TranslationResourcesTableToolbar
};

export default function TranslationResourcesTable() {
  const {
    data: {filteringData}
  } = useContext(TranslationResourcesContext);

  const additionalParams: any = {
    sortName: 'profiles',
    sortOrder: 'desc'
  };
  if (filteringData.checkbox.onlyMaster.checked) {
    additionalParams.onlyMaster = true;
  }
  if (!filteringData.checkbox.onlyLastVersion.checked) {
    additionalParams.onlyLastVersion = false;
  }
  if (filteringData.checkbox.onlyUpgradeable.checked) {
    additionalParams.onlyUpgradeable = true;
  }
  if (filteringData.autocomplete.computingNode) {
    additionalParams['eleFilters[computingNode]'] = filteringData.autocomplete.computingNode.label;
  }

  const useRefresh = useRefreshBuilder({
    route: Apis.translationResources.getList,
    useSWR,
    adaptResponseOpts: {
      validateRowFct: () => true,
      rowsField: 'translationResources',
      totalRowCountField: 'total'
    },
    adaptParamsOpts: {
      paginationParamsFields: {
        limit: 'limit',
        skip: 'skip'
      },
      additionalParams: additionalParams,
      filterParamsFieldFct: (field: string) => {
        if (field === 'id') {
          return `eleFilters[${field}]`;
        }
        return `eleFilters[${field}][]`;
      }
    }
  });
  const {loading, refreshRate, setRefreshRate, mutate, ...remoteHooksData} = useRemoteHooks({useRefresh, refreshRate: 5});
  const [modal, setOpenedModal] = useModals({mutate});
  const actions = useActions(setOpenedModal);
  const columns = useColumns(actions);

  const slotProps = useMemo(
    () => ({
      toolbar: {
        actions,
        isLoading: loading,
        refreshRate: refreshRate,
        setRefreshRate: setRefreshRate,
        setOpenedModal,
        mutate
      } satisfies ToolbarProps
    }),
    [loading, refreshRate, setRefreshRate, actions, setOpenedModal, mutate]
  );

  const onProcessRowUpdate = async (newRow: GridValidRowModel, oldRow: GridValidRowModel) => {
    let rowResult;
    try {
      const requestBody = {
        ...newRow,
        mode: 'ses',
        nbInstances: newRow.nbInstancesRequested
      };
      await PostApi.updateInstance(newRow.id, requestBody);
      mutate();
      rowResult = newRow;
    }
    catch {
      rowResult = oldRow
    }
    return rowResult;
  };

  const renderExpandComponent: (row: GridRowParams<TTranslationResource>) => ReactNode = ({row}) => {
    return <TranslationResourcesTableRowDetail {...row} />;
  };

  return (
    <Box width='100%'>
      <Table
        {...remoteHooksData}
        loading={loading}
        columns={columns as GridColDef<GridValidRowModel>[]}
        checkboxSelection
        pageSizeOptions={[5, 10, 20, 30]}
        pagination
        getRowId={(row) => {
          return row.id;
        }}
        getDetailPanelContent={renderExpandComponent as (row: GridRowParams<GridValidRowModel>) => ReactNode}
        slots={slots}
        slotProps={slotProps}
        processRowUpdate={onProcessRowUpdate}
      />
      {modal}
    </Box>
  );
}
