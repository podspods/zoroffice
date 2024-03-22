import { GridToolbarContainer, useGridApiContext } from '@systran/react-components/lib/organisms/Table/Table';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import RefreshRateButton, { RefreshRate } from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import RowActionToolbar, {
  LeftToolbarContainer, RightToolbarContainer
} from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import { useTranslation } from 'react-i18next';
import { pick, values } from 'lodash';
import { KeyedMutator } from 'swr';
import {OpenedModal} from './useModals';
import { DictEntry, FileInformations } from './EditorTable';
import LanguageSelector from '@systran/react-components/lib/atoms/LanguageSelector';
import IconButton from '@systran/react-components/lib/atoms/Buttons/IconButton';
import DownloadIcon from '@systran/react-components/lib/atoms/Icons/DownloadIcon';
import Tooltip from '@systran/react-components/lib/atoms/Tooltip';
import { PrimaryButton } from '@systran/react-components/lib/atoms/Buttons/Primary';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';

export type Props = {
  actions: RowAction<DictEntry>[]
  setOpenedModal?: (openedModal: OpenedModal) => void
  isLoading: boolean
  isValidating: boolean
  refreshInterval: RefreshRate,
  setRefreshInterval: (value: RefreshRate) => void
  mutate: KeyedMutator<DictEntry[]>
  fileInformations: FileInformations
  setTargetLanguage: (languages: string | null) => void
  targetLanguage?: string | null
}

export default function Toolbar({ actions, isLoading, isValidating, refreshInterval, setRefreshInterval, mutate, fileInformations, setOpenedModal, setTargetLanguage, targetLanguage}: Props) {
  const gridApiRef = useGridApiContext();
  const dataRowIdToModelLookup = gridApiRef?.current.state.rows.dataRowIdToModelLookup as Record<string, DictEntry>;
  const rowSelection = gridApiRef?.current.state.rowSelection as string[];
  const selectedRows = values(pick(dataRowIdToModelLookup, rowSelection));
  const {t} = useTranslation();
  const targets = fileInformations?.tgtLangs.split(',');

  return (
    <GridToolbarContainer>
      <LeftToolbarContainer>
        <RowActionToolbar
          actions={actions}
          selectedRows={selectedRows}
        />
      </LeftToolbarContainer>
      <RightToolbarContainer>
        <LanguageSelector
          label={t('Target(s)')}
          initialLanguageSelection={targetLanguage || undefined}
          availableLanguageCodes={targets}
          onLanguageSelection={setTargetLanguage}
          fullWidth={false}
        />
        <RefreshRateButton
          isLoading={isLoading || isValidating}
          onRefresh={mutate}
          refreshRate={refreshInterval}
          onRefreshChange={setRefreshInterval}
        />
        <Tooltip title={t('You should select a target before creating segments.')} show={!targetLanguage} placement='bottom'>
          <PrimaryButton
            onClick={() => setOpenedModal?.({modalType: 'create'})}
            endIcon={<PlusIcon />}
            disabled={!targetLanguage}
          >
            {t('Create')}
          </PrimaryButton>
        </Tooltip>
        <IconButton
          onClick={() => setOpenedModal?.({ modalType: 'append' })}
          icon={<DownloadIcon type={'upload'} />}
          tooltipLabel={t('Append')}
        />
      </RightToolbarContainer>
    </GridToolbarContainer>
  );
}
