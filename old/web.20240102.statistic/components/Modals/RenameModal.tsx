import { useState } from 'react';
import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';

export type Props = {
  title: string
  label: string
  open: boolean
  name: string
  onClose: () => void
  onConfirm: (name: string) => Promise<void>
}

export default function RenameModal({title, label, open, name, onClose, onConfirm}: Props) {
  const { t } = useTranslation();
  const [newName, setNewName] = useState<string>(name);

  return (
    <ConfirmModal
      title={t(title)}
      open={open}
      primaryActionText={t('Rename')}
      disabled={!newName}
      onClose={onClose}
      onConfirm={async () => await onConfirm(newName)}
    >
      <TextField
        required
        autoFocus
        label={label}
        error={!newName}
        value={newName}
        onChange={(event) => setNewName(event.target.value)}
      />
    </ConfirmModal>
  );
}
