import { GridToolbarContainer, GridToolbarQuickFilter, useGridApiContext } from '@systran/react-components/lib/organisms/Table/Table';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import RefreshRateButton, { RefreshRate } from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import RowActionToolbar from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import { PrimaryButton } from '@systran/react-components/lib/atoms/Buttons/Primary';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import { useTranslation } from 'react-i18next';
import { pick, values } from 'lodash';
import { License, OpenedModal} from './LicensesTable';

export type Props = {
  actions: RowAction<License>[]
  setOpenedModal: (openedModal: OpenedModal) => void
  isLoading: boolean
  isValidating: boolean
  refreshInterval: RefreshRate,
  setRefreshInterval: (value: RefreshRate) => void
  mutate: () => Promise<void>
}

export default function Toolbar({ actions, setOpenedModal, isLoading, isValidating, refreshInterval, setRefreshInterval, mutate }: Props) {
  const gridApiRef = useGridApiContext();
  const dataRowIdToModelLookup = gridApiRef?.current.state.rows.dataRowIdToModelLookup as Record<string, License>;
  const rowSelection = gridApiRef?.current.state.rowSelection as string[];
  const selectedRows = values(pick(dataRowIdToModelLookup, rowSelection));

  const {t} = useTranslation();

  return (
    <GridToolbarContainer style={{justifyContent: 'space-between'}}>
      <div style={{display: 'flex'}}>
        <RowActionToolbar
          actions={actions}
          selectedRows={selectedRows}
        />
      </div>
      <div>
        <RefreshRateButton
          isLoading={isLoading || isValidating}
          onRefresh={mutate}
          refreshRate={refreshInterval}
          onRefreshChange={setRefreshInterval}
        />
        <PrimaryButton
          onClick={() => setOpenedModal({modalType: 'add'})}
          endIcon={<PlusIcon />}
        >
          {t('Add Product Key')}
        </PrimaryButton>
        <GridToolbarQuickFilter />
      </div>
    </GridToolbarContainer>
  );
}
