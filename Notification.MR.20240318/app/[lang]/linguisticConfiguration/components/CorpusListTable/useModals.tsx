import { useContext, useState } from 'react';
import { Corpus } from './Corpus';
import { commonFetch } from '@/utils/fetcher';
import Apis from '@/utils/apis';
import DeleteCorpusModal from '../Modals/DeleteCorpusModal';
import LinguisticResourceModal from '../Modals/LinguisticResourceModal';
import { useTranslation } from 'react-i18next';
import { KeyedMutator } from 'swr';
import PermissionsResourcesModal from '../PermissionsResourcesModal';
import AppendCorpusModal from './AppendCorpusModal';
import { SettingsContext } from '@/components/SettingProvider';

export type OpenedModal = {
  selectedRows: Corpus[],
  modalType: 'delete'
} | {
  modalType: 'create'
} | {
  selectedRow: Corpus,
  modalType: 'append' | 'details' | 'usersPermissions' | 'groupsPermissions'
} | undefined;

export function useModals(dictType: 'UD' | 'NORM', mutate: KeyedMutator<{data: unknown[]}>) {
  const { t } = useTranslation();

  const [openedModal, setOpenedModal] = useState<OpenedModal>();

  const commonProps = {
    open: true,
    onClose: () => setOpenedModal(undefined)
  };

  const { settings } = useContext(SettingsContext);

  let modal: JSX.Element | null;
  switch (openedModal?.modalType) {
    case 'create':
      modal = (
        <LinguisticResourceModal
          {...commonProps}
          title={(dictType === 'UD') ? 'Create a Dictionary' : 'Create a Normalization'}
          withComments
          withTargets={dictType === 'UD'}
          primaryActionText={t('Create')}
          onConfirm={async (details) => {
            try {
              const body = JSON.stringify({
                type: dictType,
                name: details.filename,
                srcLang: details.source,
                tgtLangs: details.targets.join(','),
                comments: details.comments
              });

              await commonFetch(Apis.dictionary.add, {method: 'POST', body});
            }
            catch (error) {
              console.error('create.onConfirm', error); // eslint-disable-line no-console
            }
            finally {
              await mutate();
            }
          }}
        />
      );
      break;
    case 'details': {
      const { id, accountId, name, srcLang, tgtLangs, comments } = openedModal.selectedRow;

      modal = (
        <LinguisticResourceModal
          {...commonProps}
          title={(dictType === 'UD') ? 'Dictionary Details' : 'Normalization Details'}
          id={id}
          withComments
          withTargets={dictType === 'UD'}
          sourceReadOnly
          initialName={name}
          initialSourceLanguageSelection={srcLang}
          initialTargetsLanguageSelection={tgtLangs}
          initialComments={comments}
          primaryActionText={t('Modify')}
          onConfirm={async (details) => {
            try {
              const body = JSON.stringify({
                type: dictType,
                id,
                accountId,
                name: details.filename,
                tgtLangs: details.targets.join(','),
                comments: details.comments
              });

              await commonFetch(Apis.dictionary.update, {method: 'POST', body});
            }
            catch (error) {
              console.error('details.onConfirm', error); // eslint-disable-line no-console
            }
            finally {
              await mutate();
            }
          }}
        />
      );
      break;
    }
    case 'delete':
      modal = (
        <DeleteCorpusModal
          {...commonProps}
          selectedRows={openedModal.selectedRows}
          onConfirm={async () => {
            try {
              await Promise.allSettled(openedModal.selectedRows.map(({id}) => commonFetch(Apis.dictionary.delete, {method: 'POST', body: JSON.stringify({id})})));
            }
            catch (error) {
              console.error('delete.onConfirm', error); // eslint-disable-line no-console
            }
            finally {
              await mutate();
            }
          }}
        />
      );
      break;
    case 'append':
      modal = (
        <AppendCorpusModal
          {...commonProps}
          whiteList={settings?.uploadWhiteList.dictionary || []}
          dictType={dictType}
          dictId={openedModal.selectedRow.id}
          accountId={openedModal.selectedRow.accountId}
        />
      );
      break;
    case 'usersPermissions':
      modal = (
        <PermissionsResourcesModal
          {...commonProps}
          resourceType={dictType}
          entityType={'users'}
          resourceId={openedModal.selectedRow.id}
        />
      );
      break;
    case 'groupsPermissions':
      modal = (
        <PermissionsResourcesModal
          {...commonProps}
          resourceType={dictType}
          entityType={'groups'}
          resourceId={openedModal.selectedRow.id}
        />
      );
      break;
    default:
      modal = null;
  }

  return [modal, setOpenedModal] as const;
}
