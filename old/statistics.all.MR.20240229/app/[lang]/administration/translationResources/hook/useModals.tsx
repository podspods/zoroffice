import {useState} from 'react';
import {KeyedMutator} from 'swr';
import {TTranslationResource} from '../components/types';
import TranslationResourcesListBodyModal from '../components/TranslationResourcesListBodyModal';
import {useTranslation} from 'react-i18next';
import {PostApi} from '../components/PostApi';
import TranslationResourcesUpgradeListModal from '../components/TranslationResourcesUpgradeListModal';
import Apis from '@/utils/apis';
import TranslationResourcesAddProfileModal from '../components/TranslationResourcesAddProfileModal';
import TranslationResourcesAddRouteModal from '../components/TranslationResourcesAddRouteModal';

export type OpenedModal = {
  modalType: 'CREATE_PROFILE' | 'ADD_ROUTE' | 'ACTIVE_ALL' | 'DEACTIVE_ALL' | 'UPGRADE' | 'DOWNGRADE' | 'UNINSTALL' | undefined;
  selectedResources: TTranslationResource[];
};

export default function useModals({mutate}: {mutate: KeyedMutator<TTranslationResource[]>}) {
  const {t} = useTranslation();
  const [openedModal, setOpenedModal] = useState<OpenedModal>({modalType: undefined, selectedResources: []});

  const onClose = () => setOpenedModal({modalType: undefined, selectedResources: []});

  const onActiveAll = async () => {
    const steps = openedModal.selectedResources.map((resource) => {
      return PostApi.activeResource(resource.id);
    });
    await Promise.all(steps);
    mutate();
  };
  const onDeactivateAll = async () => {
    const steps = openedModal.selectedResources.map((resource) => {
      return PostApi.deactivateResource(resource.id);
    });
    await Promise.all(steps);
    mutate();
  };
  const onDeleteAll = async () => {
    const steps = openedModal.selectedResources.map((resource) => {
      return PostApi.deleteResource(resource.id);
    });
    await Promise.all(steps);
    mutate();
  };
  const onUpgradeResource = async (id: string) => {
    await PostApi.upgradeResource(id);
    mutate();
  };
  const onDowngradeResource = async (id: string) => {
    await PostApi.downgradeResource(id);
    mutate();
  };

  let modal: JSX.Element | null;
  switch (openedModal?.modalType) {
    case 'CREATE_PROFILE':
      modal = <TranslationResourcesAddProfileModal onClose={onClose} resourceData={openedModal.selectedResources[0]} />;
      break;
    case 'ADD_ROUTE':
      modal = <TranslationResourcesAddRouteModal onClose={onClose} resourceData={openedModal.selectedResources[0]} />;
      break;
    case 'ACTIVE_ALL':
      modal = (
        <TranslationResourcesListBodyModal
          title={t('Activate All')}
          subTitle={t('Are you sure you want to activate all the following TR ?')}
          selectedResources={openedModal.selectedResources}
          onConfirm={onActiveAll}
          onClose={onClose}
        />
      );
      break;
    case 'DEACTIVE_ALL':
      modal = (
        <TranslationResourcesListBodyModal
          title={t('Deactivate All')}
          subTitle={t('Are you sure you want to deactivate all the following TR ?')}
          selectedResources={openedModal.selectedResources}
          onConfirm={onDeactivateAll}
          onClose={onClose}
        />
      );
      break;
    case 'UPGRADE':
      modal = (
        <TranslationResourcesUpgradeListModal
          title={t('Upgrade a Translation Resource')}
          onConfirm={onUpgradeResource}
          onClose={onClose}
          api={Apis.translationResources.getUpgradeList(openedModal.selectedResources[0].id)}
        />
      );
      break;
    case 'DOWNGRADE':
      modal = (
        <TranslationResourcesUpgradeListModal
          title={t('Downgrade a Translation Resource')}
          onConfirm={onDowngradeResource}
          onClose={onClose}
          api={Apis.translationResources.getDowngradeList(openedModal.selectedResources[0].id)}
        />
      );
      break;
    case 'UNINSTALL':
      modal = (
        <TranslationResourcesListBodyModal
          title={t('Delete translation resources')}
          subTitle={t('Are you sure you want to delete the following translation resources?')}
          selectedResources={openedModal.selectedResources}
          onConfirm={onDeleteAll}
          onClose={onClose}
        />
      );
      break;
    default:
      modal = null;
  }

  return [modal, setOpenedModal] as const;
}
