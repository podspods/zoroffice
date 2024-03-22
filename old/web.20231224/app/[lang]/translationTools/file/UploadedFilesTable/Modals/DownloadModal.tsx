import { useTranslation } from 'react-i18next';
import ModalListBody from '@systran/react-components/lib/atoms/ModalListBody';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import {TableFile} from '../UploadedFilesTable';
import Apis from '@/utils/apis';
import {triggerDownload} from '@/utils/dowload';

export type Props = {
  open: boolean
  selectedRows: TableFile[]
  onClose: () => void
}

export default function DownloadModal({open, selectedRows, onClose}: Props) {

  const { t } = useTranslation();
  const selectedNames = selectedRows.map(file => file.filename);

  const handleDownload = async () => {
    try {
      if (selectedRows.length > 1) {
        const ids = selectedRows.map(row => row.id);
        const response = await fetch(Apis.fileTranslation.downloadFiles(ids));
        await triggerDownload({response, filename: 'Translated files.zip'});
      }
      else {
        const singleEntryUrl = Apis.fileTranslation.downloadFile(selectedRows[0].id);
        const response = await fetch(singleEntryUrl);
        await triggerDownload({response, filename: selectedRows[0].filename});
      }
    }
    catch (error) {
      throw new Error(t('Error Downloading'));
    }
  };

  return (
    <ConfirmModal
      title={t('Download Files')}
      open={open}
      onClose={onClose}
      onConfirm={handleDownload}
    >
      <ModalListBody list={selectedNames} />
    </ConfirmModal>
  );
}
