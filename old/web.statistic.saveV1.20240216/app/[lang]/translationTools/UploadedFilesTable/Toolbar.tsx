import RowActionToolbar, {LeftToolbarContainer, RightToolbarContainer} from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import {TableFile} from './UploadedFilesTable';
import {GridToolbarContainer, gridRowSelectionStateSelector, gridRowsLookupSelector, useGridApiContext, useGridSelector} from '@systran/react-components/lib/organisms/Table/Table';
import {pick, values} from 'lodash';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import RefreshRateButton, {RefreshRate} from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';

export type Props = {
  actions: RowAction<TableFile>[]
  isLoading: boolean,
  isValidating: boolean,
  mutate: () => Promise<void>,
  refreshInterval: RefreshRate,
  setRefreshInterval: (refreshRate: RefreshRate) => void
}

export default function UploadedFilesToolbar({actions, isLoading, isValidating, mutate, refreshInterval, setRefreshInterval}: Props) {

  const gridApiRef = useGridApiContext();
  const rowSelectionModel = useGridSelector(gridApiRef, gridRowSelectionStateSelector) as unknown as number[];
  const files = useGridSelector(gridApiRef, gridRowsLookupSelector) as unknown as TableFile[];
  const selectedFiles = values(pick(files, rowSelectionModel));

  return (
    <GridToolbarContainer>
      <LeftToolbarContainer>
        <RowActionToolbar actions={actions} selectedRows={selectedFiles} />
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
