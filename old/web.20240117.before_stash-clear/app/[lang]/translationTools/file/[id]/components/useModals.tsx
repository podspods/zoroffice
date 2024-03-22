import { useState } from 'react';
import { commonFetch } from '@/utils/fetcher';
import Apis from '@/utils/apis';
import {OpenedModal} from './types';
import CreateTMModal from './CreateTMModal';
import DownloadTMModal from './DownloadTMModal';
import {Tm} from '../../../../monitoring/translationReviews/components/FeedbackType';
import AddToTmModal from '../../../../monitoring/translationReviews/components/Modals/AddToTmModal';

export default function useModals() {

  const [openedModal, setOpenedModal] = useState<OpenedModal>();

  const commonProps = {
    open: true,
    onClose: () => setOpenedModal(undefined)
  };

  const createTM = async (name: string) => {
    const datas = {
      filename: name,
      sourceLng: openedModal?.fileInformations.source,
      targetLng: openedModal?.fileInformations.target,
      selectedData: openedModal?.selectedSentences
    };
    try {
      await commonFetch(Apis.filePostEditor.createTM, {method: 'POST', body: JSON.stringify(datas)});
    }
    catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  const appendToTM = async (tm: Tm) => {
    const datas = {
      corpusId: tm.id,
      fileId: openedModal?.selectedSentences[0].fileId,
      sourceLng: openedModal?.fileInformations.source,
      targetLng: openedModal?.fileInformations.target,
      selectedData: openedModal?.selectedSentences
    };
    try {
      await commonFetch(Apis.filePostEditor.appendTM, {method: 'POST', body: JSON.stringify(datas)});
    }
    catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  const downloadTM = async (format: string) => {
    const datas = {
      fileId: openedModal?.selectedSentences[0].fileId,
      format: format,
      sourceLng: openedModal?.fileInformations.source,
      targetLng: openedModal?.fileInformations.target,
      selectedData: openedModal?.selectedSentences
    };
    try {
      const downloadResponse = await fetch(Apis.filePostEditor.downloadTM,
        {method: 'POST', body: JSON.stringify(datas), headers: {'Content-Type': 'application/json',
          'x-requested-with': 'XMLHttpRequest'}});
      if (downloadResponse.ok) {
        const blob = await downloadResponse.blob();
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = openedModal?.fileInformations.fileName || `TMFromFile.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      else {
        // eslint-disable-next-line no-console
        console.error('Failed to download');
      }
    }
    catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  let modal: JSX.Element | null;
  switch (openedModal?.modalType) {
    case 'createTM':
      modal = (
        <CreateTMModal
          {...commonProps}
          filename={openedModal.fileInformations.fileName}
          onConfirm={createTM}
        />
      );
      break;
    case 'addToTM':
      modal = (
        <AddToTmModal
          {...commonProps}
          onConfirm={appendToTM}
        />
      );
      break;
    case 'downloadTM':
      modal = (
        <DownloadTMModal
          {...commonProps}
          onConfirm={downloadTM}
        />
      );
      break;
    default:
      modal = null;
  }

  return [modal, setOpenedModal] as const;
}
