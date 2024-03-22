import RefreshRateButton, {RefreshRate} from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import RowActionToolbar, {LeftToolbarContainer, RightToolbarContainer} from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import pick from 'lodash/pick';
import values from 'lodash/values';
import {GridToolbarContainer, gridRowSelectionStateSelector, gridRowsLookupSelector, useGridApiContext, useGridSelector} from '@mui/x-data-grid-pro';
import {KeyedMutator} from 'swr';
import {TTranslationResource} from './types';
import {OpenedModal} from '../hook/useModals';
import {RowAction} from '@systran/react-components/lib/organisms/RowAction/RowAction';

export type ToolbarProps = {
  actions: RowAction<TTranslationResource>[];
  isLoading: boolean;
  refreshRate: RefreshRate;
  setRefreshRate: (value: RefreshRate) => void;
  mutate: KeyedMutator<TTranslationResource[]>;
  setOpenedModal: (openedModal: OpenedModal) => void;
};

export default function TranslationResourcesTableToolbar({actions, isLoading, refreshRate, setRefreshRate, mutate}: ToolbarProps) {
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
        <RefreshRateButton isLoading={isLoading} onRefresh={mutate} refreshRate={refreshRate} onRefreshChange={setRefreshRate} />
      </RightToolbarContainer>
    </GridToolbarContainer>
  );
}
