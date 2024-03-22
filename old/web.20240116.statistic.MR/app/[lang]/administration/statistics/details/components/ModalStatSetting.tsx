import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import { useTranslation } from 'react-i18next';

export type ModalStatSettingProps = {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export default function ModalStatSetting({ ...props }: ModalStatSettingProps) {
  const handleConfirm = () => {
    props.onConfirm();
  };
  const { t } = useTranslation();

  return (
    <ConfirmModal
      open={props.open}
      title={t('Register a service')}
      width='medium'
      onConfirm={handleConfirm}
      onClose={props.onClose}
    >
      not implemented yet
    </ConfirmModal>
  );
}
