import {
  GridToolbarContainer,
  GridToolbarQuickFilter,
  useGridApiContext
} from '@systran/react-components/lib/organisms/Table/Table';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import RefreshRateButton, { RefreshRate } from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import RowActionToolbar, {
  LeftToolbarContainer,
  RightToolbarContainer
} from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import { PrimaryButton } from '@systran/react-components/lib/atoms/Buttons/Primary';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import { useTranslation } from 'react-i18next';
import { pick, values } from 'lodash';
import { OpenedModal } from './useModals';
import { KeyedMutator } from 'swr';
import { Corpus } from './Corpus';

export type Props = {
  actions: RowAction<Corpus>[]
  setOpenedModal: (openedModal: OpenedModal) => void
  isLoading: boolean
  isValidating: boolean
  refreshInterval: RefreshRate,
  setRefreshInterval: (value: RefreshRate) => void
  mutate: KeyedMutator<{data: unknown[]}>
}

export default function Toolbar({ actions, setOpenedModal, isLoading, isValidating, refreshInterval, setRefreshInterval, mutate }: Props) {
  const gridApiRef = useGridApiContext();
  const dataRowIdToModelLookup = gridApiRef?.current.state.rows.dataRowIdToModelLookup as Record<string, Corpus>;
  const rowSelection = gridApiRef?.current.state.rowSelection as string[];
  const selectedRows = values(pick(dataRowIdToModelLookup, rowSelection));

  const { t } = useTranslation();

  return (
    <GridToolbarContainer style={{justifyContent: 'space-between'}}>
      <LeftToolbarContainer>
        <RowActionToolbar
          actions={actions}
          selectedRows={selectedRows}
        />
      </LeftToolbarContainer>
      <RightToolbarContainer>
        <GridToolbarQuickFilter />
        <RefreshRateButton
          isLoading={isLoading || isValidating}
          onRefresh={mutate}
          refreshRate={refreshInterval}
          onRefreshChange={setRefreshInterval}
        />
        <PrimaryButton
          onClick={() => setOpenedModal({modalType: 'create'})}
          title={t('Create')}
          endIcon={<PlusIcon />}
        >
          {t('Create')}
        </PrimaryButton>
      </RightToolbarContainer>
    </GridToolbarContainer>
  );
}
