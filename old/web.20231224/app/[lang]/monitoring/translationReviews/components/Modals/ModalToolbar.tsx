import { GridToolbarContainer, GridToolbarQuickFilter } from '@systran/react-components/lib/organisms/Table/Table';
import RefreshRateButton, { RefreshRate } from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import { RightToolbarContainer, LeftToolbarContainer } from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';

export type Props = {
  isLoading: boolean
  isValidating: boolean
  refreshInterval: RefreshRate,
  setRefreshInterval: (value: RefreshRate) => void
  mutate: () => Promise<void>
}

export default function Toolbar({isLoading, isValidating, refreshInterval, setRefreshInterval, mutate}: Props) {
  return (
    <GridToolbarContainer>
      <LeftToolbarContainer />
      <RightToolbarContainer>
        <RefreshRateButton
          isLoading={isLoading || isValidating}
          onRefresh={mutate}
          refreshRate={refreshInterval}
          onRefreshChange={setRefreshInterval}
        />
        <GridToolbarQuickFilter />
      </RightToolbarContainer>
    </GridToolbarContainer>
  );
}
