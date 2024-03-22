import {useState} from 'react';
import TranslationProfilesActiveModal from '../components/TranslationProfilesActiveModal';
import {useTranslation} from 'react-i18next';
import TranslationProfilesManagePermissionsModal from '../components/TranslationProfilesManagePermissionsModal';
import {PostApi} from '../components/PostApi';
import {TranslationProfilesAddContextProvider} from '../context/TranslationProfilesAddContext';
import {KeyedMutator} from 'swr';
import TranslationProfilesAdd from '../components/TranslationProfilesAdd';
import {Profile} from '../components/TranslationProfilesTable';

export type OpenedModal = {
  modalType: 'ACTIVATE' | 'DEACTIVATE' | 'DELETE' | 'ADD' | 'PERMISSIONS' | undefined;
  selectedProfiles: Profile[];
};

export default function useProfileModal({mutate}: {mutate: KeyedMutator<any>}) { // todo : set to KeyedMutator<Profile> when the react-components is fixed
  const {t} = useTranslation();
  const [openedModal, setOpenedModal] = useState<OpenedModal>({modalType: undefined, selectedProfiles: []});

  const onActiveProfiles = async () => {
    try {
      const steps = openedModal.selectedProfiles.map((profile) => {
        return PostApi.activateProfiles(profile);
      });
      await Promise.all(steps);
      mutate();
    }
    catch (error: any) {
      throw new Error(error.message);
    }
  };
  const onDeactivateProfiles = async () => {
    try {
      const steps = openedModal.selectedProfiles.map((profile) => {
        return PostApi.deactivateProfiles(profile);
      });
      await Promise.all(steps);
      mutate();
    }
    catch (error: any) {
      throw new Error(error.message);
    }
  };
  const onDeleteProfiles = async () => {
    try {
      const steps = openedModal.selectedProfiles.map((profile) => {
        return PostApi.deleteProfiles(profile);
      });
      await Promise.all(steps);
      mutate();
    }
    catch (error: any) {
      throw new Error(error.message);
    }
  };
  const onClose = () => setOpenedModal({modalType: undefined, selectedProfiles: []});

  let modal: JSX.Element | null;
  switch (openedModal?.modalType) {
    case 'ADD':
      modal = (
        <TranslationProfilesAddContextProvider>
          <TranslationProfilesAdd openedModal={openedModal} onClose={onClose} />
        </TranslationProfilesAddContextProvider>
      );
      break;
    case 'ACTIVATE':
      modal = (
        <TranslationProfilesActiveModal
          title={t('Activate')}
          subTitle={t('Are you sure you want to activate the following profiles ?')}
          selectedProfiles={openedModal.selectedProfiles}
          onConfirm={onActiveProfiles}
          onClose={onClose}
        />
      );
      break;
    case 'DEACTIVATE':
      modal = (
        <TranslationProfilesActiveModal
          title={t('Deactivate')}
          subTitle={t('Are you sure you want to deactivate the following profiles ?')}
          selectedProfiles={openedModal.selectedProfiles}
          onConfirm={onDeactivateProfiles}
          onClose={onClose}
        />
      );
      break;
    case 'DELETE':
      modal = (
        <TranslationProfilesActiveModal
          title={t('Delete Profiles')}
          subTitle={t('Are you sure you want to delete the following profiles ?')}
          selectedProfiles={openedModal.selectedProfiles}
          onConfirm={onDeleteProfiles}
          onClose={onClose}
        />
      );
      break;
    case 'PERMISSIONS':
      modal = <TranslationProfilesManagePermissionsModal onClose={onClose} eleFilters={{enable: true}} profile={openedModal.selectedProfiles[0]} mutate={mutate} />;
      break;
    default:
      modal = null;
  }

  return [modal, setOpenedModal] as const;
}
