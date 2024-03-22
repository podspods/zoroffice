import { useTranslation } from 'react-i18next';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import ModalListBody from '@systran/react-components/lib/atoms/ModalListBody';

export type ModalDeRegisterProps = {
  open: boolean;
  serviceName: string;
  onConfirm: () => Promise<void>;
  onClose: () => void;
};

export default function ModalDeRegister({ ...props }: ModalDeRegisterProps) {
  const { t } = useTranslation();
  const list: string[] = [t(props.serviceName)];
  return (
    <ConfirmModal
      primaryActionText={t('Submit')}
      open={props.open}
      title={t('Deregister')}
      onConfirm={props.onConfirm}
      onClose={props.onClose}
    >
      <ModalListBody
        list={list}
        description={t(
          'Are you sure you want to unregister the following services?'
        )}
      />
    </ConfirmModal>
  );
}
