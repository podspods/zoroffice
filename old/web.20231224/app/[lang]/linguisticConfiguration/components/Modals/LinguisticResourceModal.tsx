import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import LanguageSelector from '@systran/react-components/lib/atoms/LanguageSelector';
import useConditionalErrorDisplay from '@systran/react-components/lib/hooks/useConditionalErrorDisplay';
import { FormGroup } from '@mui/material';
import Apis from '@/utils/apis';
import { map, uniq } from 'lodash';
import TextField from '@systran/react-components/lib/atoms/TextField';

type LanguagePair = {
  source: string
  target: string
}

export type Props = {
  title: string
  open: boolean
  id?: string
  withTargets?: boolean
  withComments?: boolean
  sourceReadOnly?: boolean
  initialName?: string
  initialSourceLanguageSelection?: string
  initialTargetsLanguageSelection?: string[]
  initialComments?: string
  primaryActionText: string
  onClose: () => void
  onConfirm: (details: {filename: string, source: string, targets: string[], comments: string}) => Promise<void>
}

function normalizeLocale(locale: string | null) {
  return (locale || '').replace('-', '_'); // Backend wants only '_'
}

// Modal to create or edit a linguistic resource
export default function LinguisticResourceModal({
  open,
  title,
  id,
  withTargets = true,
  withComments = false,
  sourceReadOnly = false,
  initialName = '',
  initialSourceLanguageSelection,
  initialTargetsLanguageSelection = [],
  initialComments = '',
  primaryActionText,
  onConfirm,
  onClose
}: Props) {
  const {t} = useTranslation();

  const [name, setName] = useState(initialName);
  const [comments, setComments] = useState<string>(initialComments);

  const { data = [] } = useSWR<LanguagePair[]>(Apis.lps);

  const availableSources = useMemo(() => uniq(map(data, 'source')), [data, t]);
  const availableTargets = useMemo(() => uniq(map(data, 'target')), [data, t]);

  const [source, setSource] = useState<string | null>(initialSourceLanguageSelection || null);
  const [targets, setTargets] = useState<string[]>(initialTargetsLanguageSelection);

  const {errors, hasErrors, setShowErrors} = useConditionalErrorDisplay({
    name: !name,
    source: !source,
    targets: withTargets && targets.length === 0
  } as const);

  const confirmHandler = async () => { // eslint-disable-line consistent-return
    if (hasErrors) {
      setShowErrors(true);
      return true; // keep open
    }

    await onConfirm({
      filename: name,
      source: normalizeLocale(source),
      targets: targets.map(normalizeLocale),
      comments
    });
  };

  return (
    <ConfirmModal
      title={t(title)}
      open={open}
      primaryActionText={primaryActionText}
      onClose={onClose}
      onConfirm={confirmHandler}
    >
      <FormGroup>
        <TextField
          autoFocus
          label='Name'
          value={name}
          error={errors.name}
          onChange={(event) => setName(event.target.value)}
          style={{marginBottom: '20px'}}
        />
        {id && <TextField
          label={t('ID')}
          InputProps={{
            readOnly: true
          }}
          value={id}
          onChange={(event) => setComments(event.target.value)}
          style={{marginBottom: '20px'}}
        />}
        <LanguageSelector
          label={t(withTargets ? 'Source' : 'Language')}
          error={errors.source}
          readOnly={sourceReadOnly}
          initialLanguageSelection={initialSourceLanguageSelection}
          availableLanguageCodes={availableSources}
          onLanguageSelection={setSource}
        />
        <div style={{marginBottom: '20px'}} />
        {withTargets && <LanguageSelector
          label={t('Target(s)')}
          error={errors.targets}
          initialLanguageSelection={initialTargetsLanguageSelection}
          availableLanguageCodes={availableTargets}
          multiple
          onLanguageSelection={setTargets}
        />}
        {withComments && (<>
          <div style={{marginBottom: '20px'}} />
          <TextField
            multiline
            label={t('Comments')}
            value={comments}
            onChange={(event) => setComments(event.target.value)}
          />
        </>)}
      </FormGroup>
    </ConfirmModal>
  );
}