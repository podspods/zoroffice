import { GridToolbarContainer, useGridApiContext } from '@systran/react-components/lib/organisms/Table/Table';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import RefreshRateButton, { RefreshRate } from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import RowActionToolbar, { LeftToolbarContainer, RightToolbarContainer} from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import { pick, values } from 'lodash';
import { Feedback } from './FeedbackType';
import { KeyedMutator } from 'swr';

export type Props = {
  currentDirectory: string
  actions: RowAction<Feedback>[]
  isLoading?: boolean
  isValidating: boolean
  refreshInterval: RefreshRate,
  setRefreshInterval: (value: RefreshRate) => void
  mutate: KeyedMutator<Feedback[]>
}

export default function Toolbar({ actions, isLoading, isValidating, refreshInterval, setRefreshInterval, mutate }: Props) {
  const gridApiRef = useGridApiContext();
  const dataRowIdToModelLookup = gridApiRef?.current.state.rows.dataRowIdToModelLookup as Record<string, Feedback>;
  const rowSelection = gridApiRef?.current.state.rowSelection as string[];
  const selectedRows = values(pick(dataRowIdToModelLookup, rowSelection));

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
