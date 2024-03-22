import { useContext, useState } from 'react';
import { commonFetch } from '@/utils/fetcher';
import Apis from '@/utils/apis';
import DeleteSegmentModal from './Modals/DeleteSegmentModal';
import DownloadTranslationMemoryModal from '../../components/Modals/DownloadTranslationMemoryModal';
import UploadTranslationMemoryModal from '../../components/Modals/UploadTranslationMemoryModal';
import { useTranslation } from 'react-i18next';
import { SettingsContext } from '@/components/SettingProvider';
import { KeyedMutator } from 'swr';
import { FileInformations, Segment } from './EditorTable';
import CreateSegmentsModal from './Modals/CreateSegmentsModal';
import {Segment as SimplifiedSegment} from '@systran/react-components/lib/atoms/ModalAddSegmentsBody';
import { ToastMessageContext, UpdateToastMessage } from '@/components/contexts/ToastMessageContext';
import { formatLanguage } from '@systran/react-components/lib/utils';
import { TFunction } from 'i18next';
import { Part, uploadFile } from '@/utils/upload';
import { SystranFile } from '@systran/react-components/lib/organisms/FileUploadCore';
import { partial } from 'lodash';


export type OpenedModal = {
  selectedRows: Segment[],
  modalType: 'delete'
} | {
  fileInformations: {filename: string, id: string},
  modalType: 'download'
} | {
  selectedRows?: Segment[]
  modalType: 'create'
} | {
  modalType: 'upload'
} | undefined;

export default function useModals({fileInformations, mutate, targetLanguage}: {fileInformations: FileInformations, mutate: KeyedMutator<Segment[]>, targetLanguage: string | null}) {
  const { t } = useTranslation();
  const {updateToastMessage} = useContext(ToastMessageContext);

  const [openedModal, setOpenedModal] = useState<OpenedModal>();

  const commonProps = {
    open: true,
    onClose: () => setOpenedModal(undefined)
  };

  const { settings } = useContext(SettingsContext);

  function deleteSegment({selectedRows}: {selectedRows: Segment[]}) {
    return async function() {
      const segmentsToDelete = selectedRows.map((row) => ({segId: row.id, targetId: row.target.id}));
      try {
        await commonFetch(Apis.corpus.segment.delete({id: fileInformations.id}), {
          method: 'POST',
          body: JSON.stringify({
            segments: segmentsToDelete
          })
        });
        updateToastMessage({
          label: t('Segments deleted successfully'),
          status: 'success'
        });
      }
      catch (error) {
        updateToastMessage({
          label: t('Unable to delete selected segments correctly'),
          status: 'success'
        });
      }
      finally {
        await mutate();
      }
    }
  }

  function createSegment({selectedRows}: {selectedRows?: Segment[]}) {
    return async function(segments: SimplifiedSegment[]) {
      const segmentsToAdd = segments.map((segment) => ({
        srcLanguage: formatLanguage(fileInformations.sourceLanguage),
        srcSegment: segment.source,
        tgtLanguage: selectedRows && selectedRows[0].target.language || targetLanguage,
        tgtSegments: [segment.target]
      }));

      try {
        await Promise.all(
          segmentsToAdd.map(async (segment) => {
            await commonFetch(Apis.corpus.segment.add({ id: fileInformations.id}), {
              method: 'POST',
              body: JSON.stringify(segment)
            });
          })
        );

        updateToastMessage({
          label: t('New segment added successfully'),
          status: 'success'
        });
      }
      catch (error) {
        updateToastMessage({
          label: t('Unable to add new segment correctly'),
          status: 'error'
        });
      }
      finally {
        await mutate();
      }
    }
  }

  function uploadCorpus() {
    return async function(file: SystranFile) {
      const parts = [{name: 'corpusId', value: fileInformations.id}];
      const response = await partial(uploadFile, Apis.corpus.append, parts)(file);
      if (response && response.error) {
        updateToastMessage({
          label: t('Unable to append new corpus to TM'),
          status: 'error'
        });
        return response;
      }
      updateToastMessage({
        label: t('Corpus append succesfully to TM'),
        status: 'success'
      });
      return response;
    };
  }


  let modal: JSX.Element | null;
  switch (openedModal?.modalType) {
    case 'delete':
      modal = (
        <DeleteSegmentModal
          {...commonProps}
          onConfirm={deleteSegment({selectedRows: openedModal.selectedRows})}
        />
      );
      break;
    case 'download':
      modal = (
        <DownloadTranslationMemoryModal
          {...commonProps}
          selectedRow={{ filename: fileInformations.filename, id: fileInformations.id}}
        />
      );
      break;
    case 'upload':
      modal = (
        <UploadTranslationMemoryModal
          {...commonProps}
          whiteList={settings?.uploadWhiteList.corpus || []}
          onConfirmUpload={uploadCorpus()}
        />
      );
      break;
    case 'create':

      modal = (
        <CreateSegmentsModal
          {...commonProps}
          title={t('Create Segments')}
          source={fileInformations.sourceLanguage}
          target={openedModal?.selectedRows && openedModal.selectedRows[0].target.language || targetLanguage}
          selectedRows={openedModal.selectedRows}
          onConfirm={createSegment({selectedRows: openedModal.selectedRows})}
        />
      );
      break;

    default:
      modal = null;
  }

  return [modal, setOpenedModal] as const;
}
