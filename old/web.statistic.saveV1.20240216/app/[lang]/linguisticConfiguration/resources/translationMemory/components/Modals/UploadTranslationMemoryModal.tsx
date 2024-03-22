import UploadFileModal from '@/components/Modals/UploadFileModal';
import { SystranFile } from '@systran/react-components/lib/organisms/FileUploadCore';
import { useContext } from 'react';
import { ToastMessage, ToastMessageContext } from '@/components/contexts/ToastMessageContext';


type UpdateToastMessage = (toastMessage: ToastMessage) => void

export type Props = {
  open: boolean;
  onClose: () => void;
  whiteList: string[];
  onConfirmUpload: (file: SystranFile, fctToastMsg: UpdateToastMessage) => Promise<{ error: void | { type: string; message: string; }; }>;
}

export default function UploadTranslationMemoryModal({open, onClose, whiteList, onConfirmUpload}: Props) {
  const {updateToastMessage} = useContext(ToastMessageContext);

  return (
    <UploadFileModal
      open={open}
      onClose={onClose}
      whiteList={whiteList}
      uploadFile={(file) => onConfirmUpload(file, updateToastMessage)}
    />
  );
}
