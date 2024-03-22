import { useTranslation } from 'react-i18next';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import { some } from 'lodash';
import FileUploadCore, { SystranFile } from '@systran/react-components/lib/organisms/FileUploadCore';
import useFileUploadCore from '@systran/react-components/lib/organisms/useFileUploadCore';

export type Props = {
  open: boolean
  onClose: () => void
  whiteList: string[]
  uploadFile: (file: SystranFile) => Promise<{error: void | {type: string, message: string}}>
}

export default function UploadFileModal({open, onClose, whiteList, uploadFile}: Props) {
  const { t } = useTranslation();

  const { uploadFiles, ...fileUploadCoreProps } = useFileUploadCore({
    uploadFile
  });

  return (
    <ConfirmModal
      title={t('Upload Files')}
      width={'large'}
      open={open}
      primaryActionText={t('Upload')}
      onClose={onClose}
      onConfirm={async () => some(await uploadFiles(), result => !result)}
    >
      <FileUploadCore
        {...fileUploadCoreProps}
        tableTitle={'File upload'}
        whiteList={whiteList}
        getFileType={undefined}
        getOptions={undefined}
        optionHeader={undefined}
      />
    </ConfirmModal>
  );
}
