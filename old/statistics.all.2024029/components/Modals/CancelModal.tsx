import { useTranslation } from 'react-i18next';
import ModalListBody from '@systran/react-components/lib/atoms/ModalListBody';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';

export type Props = {
  open: boolean
  filenames: string[]
  onClose: () => void
  onCancel: () => Promise<void>
}

export default function CancelModal({open, filenames, onClose, onCancel}: Props) {

  const { t } = useTranslation();

  return (
    <ConfirmModal
      title={t('Cancel Translations')}
      open={open}
      onClose={onClose}
      onConfirm={onCancel}
    >
      <ModalListBody list={filenames} />
    </ConfirmModal>
  );
}
