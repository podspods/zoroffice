import React from 'react';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import { Label } from './components/Label';

export type ModalDeRegisterProps = {
  open: boolean;
  title: string;
  message: string;
  serviceName: string;
  onConfirm: (event) => void;
  onClose: (event) => void;
};

export default function ModalDeRegister({ ...props }: ModalDeRegisterProps) {
  return (
    <ConfirmModal
      open={props.open}
      title={props.title}
      // width='large'
      onConfirm={props.onConfirm}
      onClose={props.onClose}
    >
      <Label message={props.serviceName} />
    </ConfirmModal>
  );
}
