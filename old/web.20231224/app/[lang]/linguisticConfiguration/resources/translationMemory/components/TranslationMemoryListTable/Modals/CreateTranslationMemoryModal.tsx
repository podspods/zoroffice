import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import LanguageSelector from '@systran/react-components/lib/atoms/LanguageSelector';
import useConditionalErrorDisplay from '@systran/react-components/lib/hooks/useConditionalErrorDisplay';
import { FormGroup } from '@mui/material';
import TextField from '@systran/react-components/lib/atoms/TextField';
import Apis from '@/utils/apis';
import { map, uniq } from 'lodash';

type LanguagePair = {
  source: string
  target: string
}

export type Props = {
  open: boolean
  onClose: () => void
  onConfirm: ({filename, source, targets}: {filename: string, source: string, targets: string[]}) => Promise<void>
}

function normalizeLocale(locale: string | null) {
  return (locale || '').replace('-', '_'); // Backend wants only '_'
}

export default function CreateTranslationMemoryModal({open, onConfirm, onClose}: Props) {
  const {t} = useTranslation();

  const [name, setName] = useState('');

  const { data = [] } = useSWR<LanguagePair[]>(Apis.lps);

  const availableSources = useMemo(() => uniq(map(data, 'source')), [data, t]);
  const availableTargets = useMemo(() => uniq(map(data, 'target')), [data, t]);

  const [source, setSource] = useState<string | null>(null);
  const [targets, setTargets] = useState<string[]>([]);

  const {errors, hasErrors, setShowErrors} = useConditionalErrorDisplay({
    name: !name,
    source: !source,
    targets: targets.length === 0
  } as const);

  const confirmHandler = async () => { // eslint-disable-line consistent-return
    if (hasErrors) {
      setShowErrors(true);
      return true; // keep open
    }

    await onConfirm({
      filename: name,
      source: normalizeLocale(source),
      targets: targets.map(normalizeLocale)
    });
  };

  return (
    <ConfirmModal
      title={t('Create a Translation Memory')}
      open={open}
      primaryActionText={t('Create')}
      onClose={onClose}
      onConfirm={confirmHandler}
    >
      <FormGroup>
        <TextField
          required
          autoFocus
          label='Corpus Name'
          value={name}
          error={errors.name}
          onChange={(event) => setName(event.target.value)}
          style={{marginBottom: '20px'}}
        />
        <LanguageSelector
          label={'Source'}
          error={errors.source}
          availableLanguageCodes={availableSources}
          onLanguageSelection={setSource}
        />
        <div style={{marginBottom: '20px'}} />
        <LanguageSelector
          label={'Target(s)'}
          error={errors.targets}
          availableLanguageCodes={availableTargets}
          multiple
          onLanguageSelection={setTargets}
        />
      </FormGroup>
    </ConfirmModal>
  );
}
