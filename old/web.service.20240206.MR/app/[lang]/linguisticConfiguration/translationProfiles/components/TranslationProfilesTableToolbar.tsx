import RefreshRateButton, {RefreshRate} from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import RowActionToolbar, {LeftToolbarContainer, RightToolbarContainer} from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import {pick, values} from 'lodash';
import {GridToolbarContainer, gridRowSelectionStateSelector, gridRowsLookupSelector, useGridApiContext, useGridSelector} from '@systran/react-components/lib/organisms/Table/Table';
import {KeyedMutator} from 'swr';
import {Profile} from './TranslationProfilesTable';
import {PrimaryButton} from '@systran/react-components/lib/atoms/Buttons/Primary';
import {OpenedModal} from '../hooks/useProfileModal';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import {useTranslation} from 'react-i18next';
import {getProfilesPermission} from './TranslationProfilesContainer';
import {RowAction} from '@systran/react-components/lib/organisms/RowAction/RowAction';

export type ToolbarProps = {
  actions: RowAction<Profile>[];
  isLoading: boolean;
  refreshRate: RefreshRate;
  setRefreshRate: (value: RefreshRate) => void;
  mutate: KeyedMutator<Profile[]>;
  setOpenedModal: (openedModal: OpenedModal) => void;
};

function TranslationProfilesTableToolbar({actions, isLoading, refreshRate, setRefreshRate, mutate, setOpenedModal}: ToolbarProps) {
  const gridApiRef = useGridApiContext();
  const rowSelectionModel = (useGridSelector(gridApiRef, gridRowSelectionStateSelector) as unknown) as number[];
  const profiles = (useGridSelector(gridApiRef, gridRowsLookupSelector) as unknown) as Profile[];
  const selectedRows = values(pick(profiles, rowSelectionModel));

  const {hasProfileSelfPermission, hasProfileSharedPermission, hasProfilePublicPermission} = getProfilesPermission();

  const {t} = useTranslation();

  return (
    <GridToolbarContainer>
      <LeftToolbarContainer>
        <RowActionToolbar actions={actions} selectedRows={selectedRows} />
      </LeftToolbarContainer>
      <RightToolbarContainer>
        <RefreshRateButton isLoading={isLoading} onRefresh={mutate} refreshRate={refreshRate} onRefreshChange={setRefreshRate} />
        {(hasProfileSelfPermission || hasProfileSharedPermission || hasProfilePublicPermission) && (
          <PrimaryButton onClick={() => setOpenedModal({modalType: 'ADD', selectedProfiles: []})} endIcon={<PlusIcon />}>
            {t('Create')}
          </PrimaryButton>
        )}
      </RightToolbarContainer>
    </GridToolbarContainer>
  );
}

export default TranslationProfilesTableToolbar;
