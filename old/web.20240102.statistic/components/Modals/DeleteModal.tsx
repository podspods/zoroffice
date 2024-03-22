import { useTranslation } from 'react-i18next';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import ModalListBody from '@systran/react-components/lib/atoms/ModalListBody';

export type Props = {
  title: string
  description: string
  open: boolean
  filenames: string[]
  onClose: () => void
  onConfirm: () => Promise<void>
}

export default function DeleteModal({title, description, open, filenames = [], onClose, onConfirm}: Props) {
  const {t} = useTranslation();

  return (
    <ConfirmModal
      title={t(title)}
      open={open}
      primaryActionText={t('Delete')}
      onClose={onClose}
      onConfirm={onConfirm}
    >
      <ModalListBody
        description={t(description)}
        list={filenames}
      />
    </ConfirmModal>
  );
}
