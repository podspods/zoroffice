import { useState } from 'react';
import TextField from '@systran/react-components/lib/atoms/TextField';
import { useTranslation } from 'react-i18next';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import ModalListBody from '@systran/react-components/lib/atoms/ModalListBody';

export type Props = {
  open: boolean
  selectedRows: {filename: string}[]
  onClose: () => void
  onConfirm: (corpusName: string) => Promise<void>
}

export default function MergeTranslationMemoryModal({open, selectedRows = [], onClose, onConfirm}: Props) {
  const {t} = useTranslation();
  const [corpusName, setCorpusName] = useState<string | undefined>();

  return (
    <ConfirmModal
      title={t('Merge Corpus')}
      open={open}
      primaryActionText={t('Merge')}
      disabled={!corpusName}
      onClose={onClose}
      onConfirm={() => onConfirm(corpusName!)}
    >
      <ModalListBody
        description={t('Are you sure you want to merge the following resources?')}
        list={selectedRows.map(({filename}) => filename)}
      />
      <TextField
        required
        label='Corpus Name'
        error={!corpusName}
        value={corpusName}
        onChange={(event) => setCorpusName(event.target.value)}
        style={{marginTop: '20px'}}
      />
    </ConfirmModal>
  );
}
