import { useTranslation } from 'react-i18next';
import ModalListBody from '@systran/react-components/lib/atoms/ModalListBody';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';

export type Props = {
  open: boolean
  filenames: string[]
  onClose: () => void,
  onDownload: () => Promise<void>
}

export default function DownloadModal({open, filenames, onClose, onDownload}: Props) {

  const { t } = useTranslation();

  return (
    <ConfirmModal
      title={t('Download Files')}
      open={open}
      primaryActionText={t('Download')}
      onClose={onClose}
      onConfirm={onDownload}
    >
      <ModalListBody list={filenames} />
    </ConfirmModal>
  );
}
