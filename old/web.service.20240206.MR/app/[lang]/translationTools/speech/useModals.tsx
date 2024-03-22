import { useState } from 'react';
import {TableFile} from '../UploadedFilesTable/UploadedFilesTable';
import DeleteModal from '@/components/Modals/DeleteModal';
import CancelModal from '@/components/Modals/CancelModal';
import Apis from '@/utils/apis';
import {useTranslation} from 'react-i18next';
import {commonFetch} from '@/utils/fetcher';

export type OpenedModal = {
  selectedRows: TableFile[],
  modalType: 'cancel' | 'delete'
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

const onDelete = async ({files}: {files: TableFile[]}) => {
  await Promise.allSettled(
    files.map(file => commonFetch(Apis.speechTranslation.delete, {
      method: 'POST',
      body: JSON.stringify({id: file.id})
    }))
  );
}

const onCancel = async ({files}: {files: TableFile[]}) => {
  await Promise.allSettled(
    files.map(file => commonFetch(Apis.speechTranslation.cancel(file.id), {
      method: 'POST',
      body: JSON.stringify({id: file.id})
    }))
  );
}
