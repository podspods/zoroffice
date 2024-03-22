import {useContext, useState} from 'react';
import { useTranslation } from 'react-i18next';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import {FormGroup} from '@mui/material';
import TextField from '@systran/react-components/lib/atoms/TextField';
import Autocomplete from '@systran/react-components/lib/atoms/Autocomplete';
import Apis from '@/utils/apis';
import {useParams} from 'next/navigation';
import {FileInformations} from '../../../components/types';
import {ToastMessageContext} from '@/components/contexts/ToastMessageContext';

export type DownloadSpeechPostEditionModalProps = {
  open: boolean;
  onClose: () => void;
  fileInformations: FileInformations;
}

type DownloadFormat = {
  label: string;
  value: 'translation' | 'transcript';
} | null
export default function DownloadSpeechPostEditionModal({open, onClose, fileInformations}: DownloadSpeechPostEditionModalProps) {
  const {t} = useTranslation();
  const {updateToastMessage} = useContext(ToastMessageContext);
  const params = useParams();

  const [format, setFormat] = useState<DownloadFormat>({label: t('Translation'), value: 'translation'});
  const availableDownloadFormats: DownloadFormat[] = [
    {label: t('Translation'), value: 'translation'},
    {label: t('Transcript'), value: 'transcript'}
  ];

  const downloadFile = async (downloadFormat: 'translation' | 'transcript') => {
    const downloadResponse = await fetch(Apis.speechTranslation.download({mode: downloadFormat, ids: [params.id] as string[]}));
    if (downloadResponse.ok) {
      const blob = await downloadResponse.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      const filename = fileInformations.fileName.split('.')[0];
      link.download = `${filename}.${downloadFormat === 'translation' ? fileInformations.target : fileInformations.source}.srt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    else {
      // eslint-disable-next-line no-console
      console.error('Failed to download');
      updateToastMessage({
        label: 'There was an error while downloading the file',
        status: 'error'
      });
    }
  };

  const confirmHandler = async () => {
    if (format) {
      downloadFile(format.value);
    }
  };

  return (
    <ConfirmModal
      title={t('Download')}
      open={open}
      primaryActionText={t('Download')}
      onClose={onClose}
      onConfirm={confirmHandler}
      disabled={!format}
    >
      <FormGroup>
        <Autocomplete
          options={availableDownloadFormats}
          id='Download Format Selector'
          value={format}
          renderInput={(params) => <TextField {...params} fullWidth label={t('Format')} />}
          onChange={(event, newSelectedFormat) => setFormat(newSelectedFormat)}
        />
      </FormGroup>
    </ConfirmModal>
  );
}
