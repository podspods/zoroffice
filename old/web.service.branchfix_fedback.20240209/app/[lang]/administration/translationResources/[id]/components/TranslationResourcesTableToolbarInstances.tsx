import RefreshRateButton, {RefreshRate} from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import RowActionToolbar, {LeftToolbarContainer, RightToolbarContainer} from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import pick from 'lodash/pick';
import values from 'lodash/values';
import {GridToolbarContainer, gridRowSelectionStateSelector, gridRowsLookupSelector, useGridApiContext, useGridSelector} from '@mui/x-data-grid-pro';
import {KeyedMutator} from 'swr';
import {OpenedModal} from '../hooks/useModals';
import {RowAction} from '@systran/react-components/lib/organisms/RowAction/RowAction';
import {TInstance} from '../hooks/useActions';
import {GridToolbarQuickFilter} from '@systran/react-components/lib/organisms/Table/Table';
import {ReactNode} from 'react';

export type ToolbarProps = {
  actions: RowAction<TInstance>[];
  isLoading: boolean;
  refreshRate: RefreshRate;
  setRefreshRate: (value: RefreshRate) => void;
  mutate: KeyedMutator<TInstance[]>;
  setOpenedModal: (openedModal: OpenedModal) => void;
  UpdateInstanceGroup: ReactNode;
};

export default function TranslationResourcesTableToolbarInstances({actions, isLoading, refreshRate, setRefreshRate, mutate, UpdateInstanceGroup}: ToolbarProps) {
  const gridApiRef = useGridApiContext();
  const rowSelectionModel = (useGridSelector(gridApiRef, gridRowSelectionStateSelector) as unknown) as number[];
  const resources = (useGridSelector(gridApiRef, gridRowsLookupSelector) as unknown) as TInstance[];
  const selectedRows = values(pick(resources, rowSelectionModel));

  return (
    <GridToolbarContainer>
      <LeftToolbarContainer>
        <RowActionToolbar actions={actions} selectedRows={selectedRows} />
      </LeftToolbarContainer>
      <RightToolbarContainer>
        {UpdateInstanceGroup}
        <GridToolbarQuickFilter />
        <RefreshRateButton isLoading={isLoading} onRefresh={mutate} refreshRate={refreshRate} onRefreshChange={setRefreshRate} />
      </RightToolbarContainer>
    </GridToolbarContainer>
  );
}
