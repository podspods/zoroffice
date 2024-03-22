import UploadFileModal from '@/components/Modals/UploadFileModal';
import { uploadFile } from '@/utils/upload';
import Apis from '@/utils/apis';
import { partial } from 'lodash';
import { UpdateToastMessage } from '@/components/contexts/ToastMessageContext';
import { useTranslation } from 'react-i18next';
import { SystranFile } from '@systran/react-components/lib/organisms/FileUploadCore';
import { DictEntry } from '../../resources/dictionary/[id]/components/EditorTable';
import { KeyedMutator } from 'swr';
import { memo } from 'react';
import { TFunction } from 'i18next';

export type AppendCorpusModalProps = {
  open: boolean
  onClose: () => void
  whiteList: string[]
  dictType: 'UD' | 'NORM'
  dictId: string
  accountId: string
  updateToastMessage?: UpdateToastMessage;
  mutate?: KeyedMutator<DictEntry[]>;
}

type GetDictUploaderProps = {
  t: TFunction;
  dictType: 'UD' | 'NORM';
  dictId: string
  accountId: string
  updateToastMessage?: UpdateToastMessage;
  mutate?: KeyedMutator<DictEntry[]>;
}

function getDictUploader({t, mutate, updateToastMessage, dictId, accountId, dictType}: GetDictUploaderProps) {
  const parts = [
    {name: 'dictType', value: dictType}
  ];

  return async function uploadDict(file: SystranFile) {
    const response = await partial(uploadFile, Apis.dictionary.upload({id: dictId, accountId}), parts)(file);
    if (response?.error) {
      updateToastMessage?.({
        label: t('Unable to import new dictionary'),
        status: 'error'
      });
      return response;
    }
    updateToastMessage?.({
      label: t('Dictionary import succesfully'),
      status: 'success'
    });
    await mutate?.();
    return response;
  };
}


export default memo(function AppendCorpusModal({open, onClose, whiteList, dictType, dictId, accountId, updateToastMessage, mutate}: AppendCorpusModalProps) {
  const {t} = useTranslation();

  const uploadDict = getDictUploader({t, dictType, dictId, accountId, updateToastMessage, mutate});

  return (
    <UploadFileModal
      open={open}
      onClose={onClose}
      whiteList={whiteList}
      uploadFile={uploadDict}
    />
  );
});
