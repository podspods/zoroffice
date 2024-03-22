import RefreshRateButton, {RefreshRate} from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import RowActionToolbar, {LeftToolbarContainer, RightToolbarContainer} from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import pick from 'lodash/pick';
import values from 'lodash/values';
import {GridToolbarContainer, gridRowSelectionStateSelector, gridRowsLookupSelector, useGridApiContext, useGridSelector} from '@systran/react-components/lib/organisms/Table/Table';
import useSWR, {KeyedMutator} from 'swr';
import {TTranslationResource} from './types';
import {OpenedModal} from '../hook/useModals';
import {RowAction} from '@systran/react-components/lib/organisms/RowAction/RowAction';
import {useTranslation} from 'react-i18next';
import AppAutoComplete from '@systran/react-components/lib/atoms/AppAutocomplete';
import Apis from '@/utils/apis';
import {useContext} from 'react';
import {TranslationResourcesContext} from '../context/TranslationResourcesContext';

export type ToolbarProps = {
  actions: RowAction<TTranslationResource>[];
  isLoading: boolean;
  refreshRate: RefreshRate;
  setRefreshRate: (value: RefreshRate) => void;
  mutate: KeyedMutator<TTranslationResource[]>;
  setOpenedModal: (openedModal: OpenedModal) => void;
};

export default function TranslationResourcesTableToolbar({actions, isLoading, refreshRate, setRefreshRate, mutate}: ToolbarProps) {
  const {data: computingNodesLight = []} = useSWR(Apis.translationResources.getComputingNodesLight);
  const {t} = useTranslation();
  const {
    data: {filteringData},
    setData: setContextData
  } = useContext(TranslationResourcesContext);
  const gridApiRef = useGridApiContext();
  const rowSelectionModel = (useGridSelector(gridApiRef, gridRowSelectionStateSelector) as unknown) as number[];
  const resources = (useGridSelector(gridApiRef, gridRowsLookupSelector) as unknown) as TTranslationResource[];
  const selectedRows = values(pick(resources, rowSelectionModel));

  return (
    <GridToolbarContainer>
      <LeftToolbarContainer>
        <RowActionToolbar actions={actions} selectedRows={selectedRows} />
      </LeftToolbarContainer>
      <RightToolbarContainer>
        <AppAutoComplete
          style={{minWidth: 200}}
          placeholder={t('Computing node')}
          value={filteringData.autocomplete.computingNode?.value}
          options={computingNodesLight?.map((node: {_id: string; hostname: string}) => ({value: node._id, label: node.hostname}))}
          onChange={(selectedItem) =>
            setContextData((prev) => {
              const newCheckBoxList = {...prev};
              newCheckBoxList.filteringData.autocomplete.computingNode = selectedItem as {label: string; value: string};
              return newCheckBoxList;
            })
          }
        />
        <RefreshRateButton isLoading={isLoading} onRefresh={mutate} refreshRate={refreshRate} onRefreshChange={setRefreshRate} />
      </RightToolbarContainer>
    </GridToolbarContainer>
  );
}
