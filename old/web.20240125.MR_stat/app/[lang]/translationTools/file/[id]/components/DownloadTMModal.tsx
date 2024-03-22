import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import useConditionalErrorDisplay from '@systran/react-components/lib/hooks/useConditionalErrorDisplay';
import {FormGroup} from '@mui/material';
import FormatSelector, {DownloadFormat} from '@/components/FormatSelector';

export type Props = {
  open: boolean
  onClose: () => void
  onConfirm: (format: string) => Promise<void>
}
export default function DownloadTMModal({open, onConfirm, onClose}: Props) {
  const {t} = useTranslation();

  const [format, setFormat] = useState<DownloadFormat>({label: 'text/bitext', value: 'txt'});

  const {errors, hasErrors, setShowErrors} = useConditionalErrorDisplay({
    format: !format
  } as const);

  const confirmHandler = async () => { // eslint-disable-line consistent-return
    if (hasErrors || !format) {
      setShowErrors(true);
      return true; // keep open
    }
    await onConfirm(format.value);
  };

  return (
    <ConfirmModal
      title={t('Download a Translation Memory')}
      open={open}
      primaryActionText={t('Download')}
      onClose={onClose}
      onConfirm={confirmHandler}
      disabled={!format}
    >
      <FormGroup>
        <FormatSelector
          format={format}
          changeFormat={setFormat}
        />
      </FormGroup>
    </ConfirmModal>
  );
}
