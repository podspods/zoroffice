import { useContext, useState } from 'react';
import { commonFetch } from '@/utils/fetcher';
import Apis from '@/utils/apis';
import AppendCorpusModal from '../../../../components/CorpusListTable/AppendCorpusModal';
import DeleteEntryModal from './Modals/DeleteEntryModal';
import { useTranslation } from 'react-i18next';
import { KeyedMutator } from 'swr';
import { FileInformations, DictEntry } from './EditorTable';
import { ToastMessageContext } from '@/components/contexts/ToastMessageContext';
import { SettingsContext } from '@/components/SettingProvider';
import CreateEntryModal from './Modals/CreateEntryModal';


export type OpenedModal = {
  selectedRows: DictEntry[],
  modalType: 'delete'
} | {
  modalType: 'append'
} | {
  selectedRow?: DictEntry
  modalType: 'create'
} | undefined;

export default function useModals({fileInformations, mutate, targetLanguage}: {fileInformations: FileInformations, mutate: KeyedMutator<DictEntry[]>, targetLanguage: string | null}) {
  const { t } = useTranslation();
  const {updateToastMessage} = useContext(ToastMessageContext);

  const [openedModal, setOpenedModal] = useState<OpenedModal>();

  const commonProps = {
    open: true,
    onClose: () => setOpenedModal(undefined)
  };

  const { settings } = useContext(SettingsContext);

  function deleteEntry({selectedRows}: {selectedRows: DictEntry[]}) {
    return async function() {
      const entriesToDelete = selectedRows.map((row) => ({
        srcId: row.srcId,
        tgtId: row.tgtId,
        srcVid: row.srcVid,
        tgtVid: row.tgtVid
      }));
      try {
        await commonFetch(Apis.dictionary.entry.delete, {
          method: 'POST',
          body: JSON.stringify({
            dict: { dictId: fileInformations.id},
            entries: entriesToDelete
          })
        });
        updateToastMessage({
          label: t('Entries deleted successfully'),
          status: 'success'
        });
      }
      catch (error) {
        updateToastMessage({
          label: t('Unable to delete selected entries correctly'),
          status: 'error'
        });
      }
      finally {
        await mutate();
      }
    };
  }

  function addEntry() {
    return async function(entry: Partial<DictEntry>) {
      try {
        await commonFetch(Apis.dictionary.entry.add, {
          method: 'POST',
          body: JSON.stringify({
            dict: {
              dictId: fileInformations.id,
              srcLang: fileInformations.srcLang,
              tgtLang: targetLanguage,
              multiLangs: fileInformations.multiTgtLangs
            },
            entry
          })
        });
        updateToastMessage({
          label: t('Entry added successfully'),
          status: 'success'
        });
      }
      catch (error) {
        updateToastMessage({
          label: t('Unable to add the entry correctly'),
          status: 'error'
        });
      }
      finally {
        await mutate();
      }
    };
  }

  let modal: JSX.Element | null;
  switch (openedModal?.modalType) {
    case 'delete':
      modal = (
        <DeleteEntryModal
          {...commonProps}
          onConfirm={deleteEntry({selectedRows: openedModal.selectedRows})}
        />
      );
      break;
    case 'append':
      modal = (
        <AppendCorpusModal // TODO: Improve AppendCorpusModal
          {...commonProps}
          whiteList={settings?.uploadWhiteList.dictionary || []}
          dictType={'UD'}
          dictId={fileInformations.id}
          accountId={fileInformations.accountId}
          updateToastMessage={updateToastMessage}
          mutate={mutate}
        />
      );
      break;
    case 'create':
      modal = (
        <CreateEntryModal
          {...commonProps}
          selectedRow={openedModal.selectedRow}
          onConfirm={addEntry()}
        />
      );
      break;

    default:
      modal = null;
  }

  return [modal, setOpenedModal] as const;
}
