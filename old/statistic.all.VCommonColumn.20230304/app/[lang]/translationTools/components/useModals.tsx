import {useContext, useState} from 'react';
import { commonFetch } from '@/utils/fetcher';
import Apis from '@/utils/apis';
import {FileInformations, OpenedModal, Sentence} from './types';
import CreateTMModal from '../file/[id]/components/CreateTMModal';
import DownloadTMModal from '../file/[id]/components/DownloadTMModal';
import {Tm} from '../../monitoring/translationReviews/components/FeedbackType';
import AddToTmModal from '@/components/Modals/AddToTmModal';
import {ToastMessageContext} from '@/components/contexts/ToastMessageContext';
import {FilePostEditorMessages} from './Messages';
import DownloadSpeechPostEditionModal from '../speech/[id]/components/DownloadModal';

export default function useModals() {

  const [openedModal, setOpenedModal] = useState<OpenedModal>();
  const {updateToastMessage} = useContext(ToastMessageContext);

  const commonProps = {
    open: true,
    onClose: () => setOpenedModal(undefined)
  };

  const createTM = async (name: string, fileInformations: FileInformations, selectedSentences: Sentence[]) => {
    const datas = {
      filename: name,
      sourceLng: fileInformations.source,
      targetLng: fileInformations.target,
      selectedData: selectedSentences
    };
    try {
      const createTMresponse = await commonFetch(Apis.filePostEditor.createTM, {method: 'POST', body: JSON.stringify(datas)});
      if (createTMresponse) {
        updateToastMessage({
          label: FilePostEditorMessages.success.creatingTM,
          status: 'success'
        });
      }
    }
    catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      updateToastMessage({
        label: FilePostEditorMessages.error.creatingTM,
        status: 'error'
      });
    }
  };

  const appendToTM = async (tm: Tm, fileInformations: FileInformations, selectedSentences: Sentence[]) => {
    const datas = {
      corpusId: tm.id,
      fileId: selectedSentences[0].fileId,
      sourceLng: fileInformations.source,
      targetLng: fileInformations.target,
      selectedData: selectedSentences
    };
    try {
      const appendTMresponse = await commonFetch(Apis.filePostEditor.appendTM, {method: 'POST', body: JSON.stringify(datas)});
      if (appendTMresponse) {
        updateToastMessage({
          label: FilePostEditorMessages.success.updatingTM,
          status: 'success'
        });
      }
    }
    catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      updateToastMessage({
        label: FilePostEditorMessages.error.updatingTM,
        status: 'error'
      });
    }
  };

  const downloadTM = async (format: string, fileInformations: FileInformations, selectedSentences: Sentence[]) => {
    const datas = {
      fileId: selectedSentences[0].fileId,
      format: format,
      sourceLng: fileInformations.source,
      targetLng: fileInformations.target,
      selectedData: selectedSentences
    };
    try {
      const downloadResponse = await fetch(Apis.filePostEditor.downloadTM,
        {method: 'POST', body: JSON.stringify(datas), headers: {'Content-Type': 'application/json',
          'x-requested-with': 'XMLHttpRequest'}});
      if (downloadResponse.ok) {
        const blob = await downloadResponse.blob();
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `TMFromFile_${fileInformations.fileName || ''}_.${format}` || `TMFromFile.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      else {
        // eslint-disable-next-line no-console
        console.error('Failed to download');
        updateToastMessage({
          label: FilePostEditorMessages.error.downloadingTM,
          status: 'error'
        });
      }
    }
    catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      updateToastMessage({
        label: FilePostEditorMessages.error.downloadingTM,
        status: 'error'
      });
    }
  };

  let modal: JSX.Element | null;
  switch (openedModal?.modalType) {
    case 'createTM':
      modal = (
        <CreateTMModal
          {...commonProps}
          filename={openedModal.fileInformations.fileName}
          onConfirm={(name) => createTM(name, openedModal.fileInformations, openedModal.selectedSentences)}
        />
      );
      break;
    case 'addToTM':
      modal = (
        <AddToTmModal
          {...commonProps}
          onConfirm={(tm) => appendToTM(tm, openedModal.fileInformations, openedModal.selectedSentences)}
          languagePair={{source: openedModal.fileInformations.source, target: openedModal.fileInformations.target}}
        />
      );
      break;
    case 'downloadTM':
      modal = (
        <DownloadTMModal
          {...commonProps}
          onConfirm={(format) => downloadTM(format, openedModal.fileInformations, openedModal.selectedSentences)}
        />
      );
      break;
    case 'downloadSpeechTrans':
      modal = (
        <DownloadSpeechPostEditionModal
          {...commonProps}
          fileInformations={openedModal.fileInformations}
        />
      );
      break;
    default:
      modal = null;
  }

  return [modal, setOpenedModal] as const;
}
