import { GridToolbarContainer, GridToolbarQuickFilter, useGridApiContext } from '@systran/react-components/lib/organisms/Table/Table';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import RefreshRateButton, { RefreshRate } from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import RowActionToolbar, {
  LeftToolbarContainer, RightToolbarContainer
} from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import { PrimaryButton } from '@systran/react-components/lib/atoms/Buttons/Primary';
import { useTranslation } from 'react-i18next';
import { pick, values } from 'lodash';
import DownloadIcon from '@systran/react-components/lib/atoms/Icons/DownloadIcon';
import {useParams} from 'next/navigation';
import { KeyedMutator } from 'swr';
import {OpenedModal} from './useModals';
import { Segment, FileInformations } from './EditorTable';
import IconButton from '@systran/react-components/lib/atoms/Buttons/IconButton';
import LanguageSelector from '@systran/react-components/lib/atoms/LanguageSelector';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import Tooltip from '@systran/react-components/lib/atoms/Tooltip';

export type Props = {
  actions: RowAction<Segment>[]
  setOpenedModal?: (openedModal: OpenedModal) => void
  isLoading: boolean
  isValidating: boolean
  refreshInterval: RefreshRate,
  setRefreshInterval: (value: RefreshRate) => void
  mutate: KeyedMutator<Segment[]>
  fileInformations: FileInformations
  setTargetLanguage: (languages: string | null) => void
  targetLanguage?: string | null
}

export default function Toolbar({ actions, isLoading, isValidating, refreshInterval, setRefreshInterval, mutate, fileInformations, setOpenedModal, setTargetLanguage, targetLanguage}: Props) {
  const gridApiRef = useGridApiContext();
  const dataRowIdToModelLookup = gridApiRef?.current.state.rows.dataRowIdToModelLookup as Record<string, Segment>;
  const rowSelection = gridApiRef?.current.state.rowSelection as string[];
  const selectedRows = values(pick(dataRowIdToModelLookup, rowSelection));
  const params = useParams();

  const {t} = useTranslation();

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
          availableLanguageCodes={fileInformations.targetLanguages}
          onLanguageSelection={setTargetLanguage}
          fullWidth={false}
        />
        <GridToolbarQuickFilter />
        <RefreshRateButton
          isLoading={isLoading || isValidating}
          onRefresh={mutate}
          refreshRate={refreshInterval}
          onRefreshChange={setRefreshInterval}
        />
        <Tooltip title={t('You should select a target before creating segments.')} show={!targetLanguage} placement='bottom'>
          <div>
            <PrimaryButton
              onClick={() => setOpenedModal && setOpenedModal({modalType: 'create'})}
              endIcon={<PlusIcon />}
              disabled={!targetLanguage}
            >
              {t('Create')}
            </PrimaryButton>
          </div>
        </Tooltip>
        <IconButton
          onClick={() => setOpenedModal && setOpenedModal({fileInformations: {filename: fileInformations.filename, id: fileInformations.id}, modalType: 'download'})}
          icon={<DownloadIcon />}
          tooltipLabel={t('Download')}
        />
        <IconButton
          onClick={() => setOpenedModal && setOpenedModal({ modalType: 'upload' })}
          icon={<DownloadIcon type={'upload'} />}
          tooltipLabel={t('Append')}
        />
      </RightToolbarContainer>
    </GridToolbarContainer>
  );
}
