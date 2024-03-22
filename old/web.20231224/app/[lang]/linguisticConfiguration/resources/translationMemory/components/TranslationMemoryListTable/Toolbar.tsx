import {
  gridRowSelectionStateSelector, gridRowsLookupSelector,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  useGridApiContext,
  useGridSelector
} from '@systran/react-components/lib/organisms/Table/Table';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import { TranslationMemory } from '../../lib/TranslationMemory';
import RefreshRateButton, { RefreshRate } from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import RowActionToolbar, {
  LeftToolbarContainer,
  RightToolbarContainer
} from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import { PrimaryButton } from '@systran/react-components/lib/atoms/Buttons/Primary';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import DownloadIcon from '@systran/react-components/lib/atoms/Icons/DownloadIcon';
import { useTranslation } from 'react-i18next';
import { pick, values } from 'lodash';
import { OpenedModal } from './useModals';
import { KeyedMutator } from 'swr';

export type Props = {
  currentDirectory: string
  actions: RowAction<TranslationMemory>[]
  setOpenedModal: (openedModal: OpenedModal) => void
  isLoading: boolean
  isValidating: boolean
  refreshInterval: RefreshRate,
  setRefreshInterval: (value: RefreshRate) => void
  mutate: KeyedMutator<{files: unknown[]}>
}

export default function Toolbar({ currentDirectory, actions, setOpenedModal, isLoading, isValidating, refreshInterval, setRefreshInterval, mutate }: Props) {
  const gridApiRef = useGridApiContext();
  const rowSelectionModel = useGridSelector(gridApiRef, gridRowSelectionStateSelector) as unknown as number[];
  const files = useGridSelector(gridApiRef, gridRowsLookupSelector) as unknown as TranslationMemory[];
  const selectedRows = values(pick(files, rowSelectionModel));

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
        <RefreshRateButton
          isLoading={isLoading || isValidating}
          onRefresh={mutate}
          refreshRate={refreshInterval}
          onRefreshChange={setRefreshInterval}
        />
        <PrimaryButton
          onClick={() => setOpenedModal({modalType: 'create'})}
          style={{
            marginRight: '10px'
          }}
          title={t('Create')}
          endIcon={<PlusIcon />}
        >
          {t('Create')}
        </PrimaryButton>
        <PrimaryButton
          onClick={() => setOpenedModal({modalType: 'upload', currentDirectory })}
          style={{
            marginRight: '10px'
          }}
          title={t('Upload')}
          endIcon={<DownloadIcon type={'upload'} />}
        >
          {t('Upload')}
        </PrimaryButton>
        <GridToolbarQuickFilter />
      </RightToolbarContainer>
    </GridToolbarContainer>
  );
}
