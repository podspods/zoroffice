import React, { useState } from 'react';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import TextField from '@mui/material/TextField';
import {useTranslation} from 'react-i18next';

type Props = {
  open: boolean;
  onConfirm: (key: string) => Promise<void>;
  onClose: () => void;
}

export default function AddProductKeyForm({open, onClose, onConfirm}: Props) {
  const [key, setKey] = useState('');
  const {t} = useTranslation();

  return (
    <ConfirmModal
      open={open}
      title={t('Add a product key')}
      width='large'
      disabled={!key}
      onConfirm={() => onConfirm(key)}
      onClose={onClose}
    >
      <TextField
        variant='outlined'
        placeholder={t('Product Key')}
        fullWidth
        multiline
        rows={10}
        value={key}
        onChange={(e) => {
          setKey(e.target.value);
        }}
      />
    </ConfirmModal>
  );
}
