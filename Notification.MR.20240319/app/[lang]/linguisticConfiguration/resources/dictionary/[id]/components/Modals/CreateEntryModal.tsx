import { useState} from 'react';
import {styled, type Theme} from '@systran/react-components/lib/Theme';
import {Checkbox, FormControlLabel, MenuItem} from '@mui/material';
import {useTranslation} from 'react-i18next';
import AtomTextField from '@systran/react-components/lib/atoms/TextField';
import { DictEntry } from '../EditorTable';
import useConditionalErrorDisplay from '@systran/react-components/lib/hooks/useConditionalErrorDisplay';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import {POS_MAP, PRIORITY_MAP} from '../EditorColumns';

export type Segment = {
  source?: string;
  target?: string;
  key: string;
}

export type CreateEntryModalProps = {
  selectedRow?: DictEntry;
  open: boolean
  onClose: () => void
  onConfirm: (entry: Partial<DictEntry>) => Promise<void>
};

export default function CreateEntryModal({
  selectedRow,
  open,
  onClose,
  onConfirm
}: CreateEntryModalProps) {

  const {t} = useTranslation();
  const [source, setSource] = useState<undefined | string>(selectedRow?.src);
  const [target, setTarget] = useState<string>(selectedRow ? selectedRow.tgt : '');
  const [pos, setPos] = useState<undefined | typeof POS_MAP[number]['value']>(selectedRow?.pos as typeof POS_MAP[number]['value']); // TODO: improve type of DictEntry
  const [priority, setPriority] = useState<undefined | typeof PRIORITY_MAP[number]['value']>(selectedRow?.priority as typeof PRIORITY_MAP[number]['value']); // TODO: improve type of DictEntry
  const [doNotTranslate, setDoNotTranslate] = useState(selectedRow?.type === 'dnt');
  const [comments, setComments] = useState<undefined | string>(selectedRow?.comments);


  const {errors, hasErrors, setShowErrors} = useConditionalErrorDisplay({
    source: !source,
    target: !target,
    priority: !priority,
    pos: !pos
  });

  const confirmHandler = async () => { // eslint-disable-line consistent-return
    if (hasErrors) {
      setShowErrors(true);
      return true;
    }

    await onConfirm({
      src: source,
      tgt: target,
      priority: priority,
      pos: pos,
      type: doNotTranslate ? 'dnt' : 'translation',
      comments: comments
    });
  };

  return (
    <ConfirmModal
      title={t('Create Dictionary Entry')}
      open={open}
      primaryActionText={t('Submit')}
      onClose={onClose}
      onConfirm={confirmHandler}
      width='large'
    >
      <TextField
        label={t('source')}
        value={source}
        fullWidth
        multiline
        required
        onChange={(e) => setSource(e.target.value)}
        status={errors.source ? 'error' : 'default'}
        helperText={errors.source ? t('This field is required') : ''}
      />


      <TextField
        label={t('target')}
        value={doNotTranslate ? t('Do not translate') : target}
        fullWidth
        multiline
        disabled={doNotTranslate}
        onChange={(e) => setTarget(e.target.value)}
        required={!doNotTranslate}
        status={errors.target ? 'error' : 'default'}
        helperText={errors.target ? t('This field is required') : ''}
      />
      <CheckBoxLabel
        control={
          <Checkbox
            value={doNotTranslate}
            onChange={() => setDoNotTranslate(!doNotTranslate)}
          />}
        label={t('Do not translate')}
      />

      <TextField
        InputProps={{disableUnderline: true}}
        select
        fullWidth
        label={t('Select Part Of Speech')}
        value={pos}
        onChange={(event) => setPos(event.target.value)}
        status={errors.pos ? 'error' : 'default'}
        helperText={errors.pos ? t('This field is required') : ''}
      >
        {POS_MAP.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        InputProps={{disableUnderline: true}}
        select
        fullWidth
        label={t('Select Priority')}
        value={priority}
        onChange={(event) => setPriority(event.target.value as unknown as typeof PRIORITY_MAP[number]['value'])}
        status={errors.priority ? 'error' : 'default'}
        helperText={errors.priority ? t('This field is required') : ''}
      >
        {PRIORITY_MAP.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label={t('Comments (Optional)')}
        value={comments}
        fullWidth
        multiline
        onChange={(e) => setComments(e.target.value)}
      />
    </ConfirmModal>
  );
}

const TextField = styled(AtomTextField)`
  margin-bottom: 16px;
  margin-top: 16px;
`;

const CheckBoxLabel = styled(FormControlLabel)<{theme?: Theme}>`
  margin-bottom: 16px;
  span {
    color: ${({theme}) => theme.palette.greyScale.extraDark};
    svg {
      color: ${({theme}) => theme.palette.greyScale.dark};
    }
    font-family: 'Quicksand';
    padding-top: 0px;
    padding-bottom: 0px;
  }
`;


const Container = styled.div<{maxHeight: string}>`
  display: flex;
  flex-direction: column;
  max-height: ${({ maxHeight }) => maxHeight};
  width: 100%;
`;
