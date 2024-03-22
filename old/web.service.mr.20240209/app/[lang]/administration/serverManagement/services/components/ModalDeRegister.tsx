import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import TextField from '@systran/react-components/lib/atoms/TextField';

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
      primaryActionText={t('Submit')}
      open={props.open}
      title={t('Deregister')}
      onConfirm={props.onConfirm}
      onClose={props.onClose}
    >
      <Typography sx={{ paddingBottom: '1rem' }}>
        {t('Are you sure you want to unregister the following services?')}
      </Typography>

      <TextField label={t(props.serviceName)} readOnly fullWidth />
    </ConfirmModal>
  );
}
