import UploadFileModal from '@/components/Modals/UploadFileModal';
import { uploadFile } from '@/utils/upload';
import Apis from '@/utils/apis';
import { partial } from 'lodash';

export type Props = {
  open: boolean
  onClose: () => void
  whiteList: string[]
  currentDirectory: string
}

export default function UploadTranslationMemoryModal({open, onClose, whiteList, currentDirectory}: Props) {
  const parts = [
    {name: 'currentDir', value: currentDirectory}
  ];

  return (
    <UploadFileModal
      open={open}
      onClose={onClose}
      whiteList={whiteList}
      uploadFile={partial(uploadFile, Apis.corpus.upload, parts)}
    />
  );
}
