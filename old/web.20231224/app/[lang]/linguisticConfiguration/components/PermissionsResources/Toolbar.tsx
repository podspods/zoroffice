import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import RefreshRateButton, { RefreshRate } from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import {
  gridRowSelectionStateSelector, gridRowsLookupSelector,
  GridToolbarContainer,
  useGridApiContext, useGridSelector
} from '@systran/react-components/lib/organisms/Table/Table';
import { pick, values } from 'lodash';
import RowActionToolbar, {
  LeftToolbarContainer,
  RightToolbarContainer
} from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import { Entity } from './PermissionsResources';
import { KeyedMutator } from 'swr';

export type Props = {
  actions: RowAction<Entity>[]
  isLoading: boolean
  isValidating: boolean
  refreshInterval: RefreshRate,
  setRefreshInterval: (value: RefreshRate) => void
  mutate: KeyedMutator<unknown>
}

export default function Toolbar({ actions, isLoading, isValidating, refreshInterval, setRefreshInterval, mutate }: Props) {
  const gridApiRef = useGridApiContext();
  const rowSelectionModel = useGridSelector(gridApiRef, gridRowSelectionStateSelector) as unknown as number[];
  const files = useGridSelector(gridApiRef, gridRowsLookupSelector) as unknown as Entity[];
  const selectedRows = values(pick(files, rowSelectionModel));

  return (
    <GridToolbarContainer style={{justifyContent: 'space-between'}}>
      <LeftToolbarContainer>
        <RowActionToolbar
          actions={actions}
          selectedRows={selectedRows}
        />
      </LeftToolbarContainer>
      <RightToolbarContainer>
        <RefreshRateButton
          isLoading={isLoading || isValidating}
          onRefresh={mutate}
          refreshRate={refreshInterval}
          onRefreshChange={setRefreshInterval}
        />
      </RightToolbarContainer>
    </GridToolbarContainer>
  );
}
