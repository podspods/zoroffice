import React from 'react';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import { Typography } from '@mui/material';

export type ModalDeRegisterProps = {
  open: boolean;
  title: string;
  message: string;
  serviceName: string;
  onConfirm: () => void;
  onClose: () => void;
};

export default function ModalDeRegister({ ...props }: ModalDeRegisterProps) {
  return (
    <ConfirmModal
      open={props.open}
      title={props.title}
      onConfirm={props.onConfirm}
      onClose={props.onClose}
    >
      <Typography>{props.serviceName}</Typography>
    </ConfirmModal>
  );
}
