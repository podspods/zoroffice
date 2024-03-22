import { useState } from 'react';
import {TableFile} from './UploadedFilesTable';
import DownloadModal from './Modals/DownloadModal';
import DeleteModal from './Modals/DeleteModal';
import CancelModal from './Modals/CancelModal';

export type OpenedModal = {
  selectedRows: TableFile[],
  modalType: 'download' | 'cancel' | 'delete'
} | undefined;

export default function useModals() {

  const [openedModal, setOpenedModal] = useState<OpenedModal>();
  const commonProps = {
    open: true,
    onClose: () => setOpenedModal(undefined)
  };

  let modal: JSX.Element | null;
  switch (openedModal?.modalType) {
    case 'download':
      modal = (
        <DownloadModal
          {...commonProps}
          selectedRows={openedModal.selectedRows}
        />
      );
      break;
    case 'delete':
      modal = (
        <DeleteModal
          {...commonProps}
          selectedRows={openedModal.selectedRows}
        />
      );
      break;
    case 'cancel':
      modal = (
        <CancelModal
          {...commonProps}
          selectedRows={openedModal.selectedRows}
        />
      );
      break;
    default:
      modal = null;
  }
  return [modal, setOpenedModal] as const;
}
