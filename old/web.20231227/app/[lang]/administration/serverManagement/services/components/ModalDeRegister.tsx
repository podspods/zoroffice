import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';

export type ModalDeRegisterProps = {
  open: boolean;
  serviceName: string;
  onConfirm: () => Promise<void>;
  onClose: () => void;
};

export default function ModalDeRegister({ ...props }: ModalDeRegisterProps) {
  const { t } = useTranslation();
  return (
    <ConfirmModal
      open={props.open}
      title={t('Deregister')}
      onConfirm={props.onConfirm}
      onClose={props.onClose}
    >
      <Typography>{t(props.serviceName)}</Typography>
    </ConfirmModal>
  );
}
