import { useContext, useState } from 'react';
import { TranslationMemory } from '../../lib/TranslationMemory';
import { commonFetch } from '@/utils/fetcher';
import Apis from '@/utils/apis';
import RenameTranslationMemoryModal from './Modals/RenameTranslationMemoryModal';
import DeleteTranslationMemoryModal from './Modals/DeleteTranslationMemoryModal';
import DetailsTranslationMemoryModal from './Modals/DetailsTranslationMemoryModal';
import MergeTranslationMemoryModal from './Modals/MergeTranslationMemoryModal';
import DownloadTranslationMemoryModal from './Modals/DownloadTranslationMemoryModal';
import UploadTranslationMemoryModal from './Modals/UploadTranslationMemoryModal';
import LinguisticResourceModal from '../../../../components/Modals/LinguisticResourceModal';
import { useTranslation } from 'react-i18next';
import { SettingsContext } from '@/components/SettingProvider';
import PermissionsResourcesModal from '../../../../components/PermissionsResourcesModal';
import { KeyedMutator } from 'swr';

export type OpenedModal = {
  selectedRows: TranslationMemory[],
  modalType: 'rename' | 'delete' | 'merge' | 'download'
} | {
  selectedRow: TranslationMemory,
  modalType: 'details' | 'usersPermissions' | 'groupsPermissions'
} | {
  modalType: 'create'
} | {
  modalType: 'upload',
  currentDirectory: string
} | undefined;

export default function useModals(mutate: KeyedMutator<{files: unknown[]}>) {
  const { t } = useTranslation();

  const [openedModal, setOpenedModal] = useState<OpenedModal>();

  const commonProps = {
    open: true,
    onClose: () => setOpenedModal(undefined)
  };

  const { settings } = useContext(SettingsContext);

  let modal: JSX.Element | null;
  switch (openedModal?.modalType) {
    case 'rename':
      modal = (
        <RenameTranslationMemoryModal
          {...commonProps}
          name={openedModal.selectedRows[0].filename}
          onConfirm={async (newName) => {
            try {
              await commonFetch(Apis.corpus.rename({id: openedModal.selectedRows[0].id}), {method: 'POST', body: JSON.stringify({filename: newName})});
            }
            finally {
              await mutate();
            }
          }}
        />
      );
      break;
    case 'delete':
      modal = (
        <DeleteTranslationMemoryModal
          {...commonProps}
          selectedRows={openedModal.selectedRows}
          onConfirm={async () => {
            try {
              await Promise.allSettled(openedModal.selectedRows.map(({id}) => commonFetch(Apis.corpus.delete({id}), {method: 'POST'})));
            }
            finally {
              await mutate();
            }
          }}
        />
      );
      break;
    case 'details':
      modal = (
        <DetailsTranslationMemoryModal
          {...commonProps}
          corpusId={openedModal.selectedRow.id}
        />
      );
      break;
    case 'merge':
      modal = (
        <MergeTranslationMemoryModal
          {...commonProps}
          selectedRows={openedModal.selectedRows}
          onConfirm={async (corpusName) => {
            try {
              await commonFetch(Apis.corpus.merge, {method: 'POST', body: JSON.stringify({
                filename: corpusName,
                ids: openedModal.selectedRows.map(({id}) => id)
              })});
            }
            finally {
              await mutate();
            }
          }}
        />
      );
      break;
    case 'download':
      modal = (
        <DownloadTranslationMemoryModal
          {...commonProps}
          selectedRow={openedModal.selectedRows[0]}
        />
      );
      break;
    case 'create':
      modal = (
        <LinguisticResourceModal
          {...commonProps}
          title={'Create a Translation Memory'}
          primaryActionText={t('Create')}
          onConfirm={async (corpus) => {
            try {
              await commonFetch(Apis.corpus.add, {method: 'POST', body: JSON.stringify(corpus)});
            }
            finally {
              await mutate();
            }
          }}
        />
      );
      break;
    case 'upload':
      modal = (
        <UploadTranslationMemoryModal
          {...commonProps}
          whiteList={settings?.uploadWhiteList.corpus || []}
          currentDirectory={openedModal.currentDirectory}
        />
      );
      break;
    case 'usersPermissions':
      modal = (
        <PermissionsResourcesModal
          {...commonProps}
          type={'users'}
          resourceId={openedModal.selectedRow.id}
        />
      );
      break;
    case 'groupsPermissions':
      modal = (
        <PermissionsResourcesModal
          {...commonProps}
          type={'groups'}
          resourceId={openedModal.selectedRow.id}
        />
      );
      break;
    default:
      modal = null;
  }

  return [modal, setOpenedModal] as const;
}
