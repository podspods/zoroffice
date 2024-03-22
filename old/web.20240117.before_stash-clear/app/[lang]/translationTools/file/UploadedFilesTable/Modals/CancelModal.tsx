import { useTranslation } from 'react-i18next';
import ModalListBody from '@systran/react-components/lib/atoms/ModalListBody';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import {TableFile} from '../UploadedFilesTable';
import {commonFetch} from '@/utils/fetcher';
import Apis from '@/utils/apis';

export type Props = {
  open: boolean
  selectedRows: TableFile[]
  onClose: () => void
}

export default function CancelModal({open, selectedRows, onClose}: Props) {
  const { t } = useTranslation();

  const selectedNames = selectedRows.map(file => file.filename);

  return (
    <ConfirmModal
      title={t('Cancel Translations')}
      open={open}
      onClose={onClose}
      onConfirm={async () => {
        await Promise.allSettled(
          selectedRows.map(file => commonFetch(Apis.fileTranslation.cancel(file.id), {
            method: 'POST',
            body: JSON.stringify({id: file.id})
          }))
        );
      }}
    >
      <ModalListBody list={selectedNames} />
    </ConfirmModal>
  );
}
