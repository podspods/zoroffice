import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import { FormGroup } from '@mui/material';
import TextField from '@systran/react-components/lib/atoms/TextField';

export type Props = {
  open: boolean
  onClose: () => void
  onConfirm: (name: string) => Promise<void>
  filename: string
}
export default function CreateTMModal({open, onConfirm, onClose, filename}: Props) {
  const {t} = useTranslation();

  const [name, setName] = useState(filename || '');

  const confirmHandler = async () => {
    await onConfirm(name);
  };

  return (
    <ConfirmModal
      title={t('Create a Translation Memory')}
      open={open}
      primaryActionText={t('Create')}
      onClose={onClose}
      onConfirm={confirmHandler}
      disabled={!name}
    >
      <FormGroup>
        <TextField
          style={{width: '100%'}}
          required
          autoFocus
          label={t('FileName')}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </FormGroup>
    </ConfirmModal>
  );
}
