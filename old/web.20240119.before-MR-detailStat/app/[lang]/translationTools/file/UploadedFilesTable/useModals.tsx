import { useState } from 'react';
import {TableFile} from './UploadedFilesTable';
import DownloadModal from '@/components/Modals/DownloadModal';
import DeleteModal from '@/components/Modals/DeleteModal';
import CancelModal from '@/components/Modals/CancelModal';
import Apis from '@/utils/apis';
import {triggerDownload} from '@/utils/dowload';
import {useTranslation} from 'react-i18next';
import {commonFetch} from '@/utils/fetcher';

export type OpenedModal = {
  selectedRows: TableFile[],
  modalType: 'download' | 'cancel' | 'delete'
} | undefined;

export default function useModals() {

  const { t } = useTranslation()
  const [openedModal, setOpenedModal] = useState<OpenedModal>();

  const commonProps = {
    open: true,
    onClose: () => setOpenedModal(undefined),
    filenames: openedModal ? openedModal.selectedRows.map(file => file.filename) : []
  };

  let modal: JSX.Element | null;
  switch (openedModal?.modalType) {
    case 'download':
      modal = (
        <DownloadModal
          {...commonProps}
          onDownload={() => onDownload({files: openedModal.selectedRows, errorMessage: t('Error Downloading')})}
        />
      );
      break;
    case 'delete':
      modal = (
        <DeleteModal
          {...commonProps}
          title={t('Delete Files')}
          onConfirm={() => onDelete({files: openedModal.selectedRows})}
        />
      );
      break;
    case 'cancel':
      modal = (
        <CancelModal
          {...commonProps}
          onCancel={() => onCancel({files: openedModal.selectedRows})}
        />
      );
      break;
    default:
      modal = null;
  }
  return [modal, setOpenedModal] as const;
}

const onDownload = async ({files, errorMessage}: {files: TableFile[], errorMessage: string}) => {
  try {
    if (files.length > 1) {
      const ids = files.map(file => file.id);
      const response = await fetch(Apis.fileTranslation.downloadFiles(ids));
      await triggerDownload({response, filename: 'Translated files.zip'});
    }
    else {
      const singleEntryUrl = Apis.fileTranslation.downloadFile(files[0].id);
      const response = await fetch(singleEntryUrl);
      await triggerDownload({response, filename: files[0].filename});
    }
  }
  catch (error) {
    throw new Error(errorMessage);
  }
};

const onDelete = async ({files}: {files: TableFile[]}) => {
  await Promise.allSettled(
    files.map(file => commonFetch(Apis.fileTranslation.delete, {
      method: 'POST',
      body: JSON.stringify({id: file.id})
    }))
  );
}

const onCancel = async ({files}: {files: TableFile[]}) => {
  await Promise.allSettled(
    files.map(file => commonFetch(Apis.fileTranslation.cancel(file.id), {
      method: 'POST',
      body: JSON.stringify({id: file.id})
    }))
  );
}
