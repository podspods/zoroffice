import UploadFileModal from '@/components/Modals/UploadFileModal';
import { uploadFile } from '@/utils/upload';
import Apis from '@/utils/apis';
import { partial } from 'lodash';

export type Props = {
  open: boolean
  onClose: () => void
  whiteList: string[]
  dictType: 'UD' | 'NORM'
  dictId: string
  accountId: string
}

export default function AppendCorpusModal({open, onClose, whiteList, dictType, dictId, accountId}: Props) {
  const parts = [
    {name: 'dictType', value: dictType}
  ];

  return (
    <UploadFileModal
      open={open}
      onClose={onClose}
      whiteList={whiteList}
      uploadFile={partial(uploadFile, Apis.dictionary.upload({id: dictId, accountId}), parts)}
    />
  );
}
