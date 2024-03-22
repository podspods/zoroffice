import TextField from '@systran/react-components/lib/atoms/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {Dispatch, SetStateAction} from 'react';
import {useTranslation} from 'react-i18next';

export type DownloadFormat = {
  label: string;
  value: string;
} | null

export default function FormatSelector({format, changeFormat}: {format: DownloadFormat, changeFormat: Dispatch<SetStateAction<DownloadFormat>>}) {
  const {t} = useTranslation();

  const availableDownloadFormats = [
    {label: 'text/bitext', value: 'txt'},
    {label: 'application/x-tmx+xml', value: 'tmx'}
  ];

  return (
    <Autocomplete
      options={availableDownloadFormats}
      id='Download Format Selector'
      value={format}
      renderInput={(params) => <TextField {...params} fullWidth label={t('Format')} />}
      onChange={(event, newSelectedFormat) => changeFormat(newSelectedFormat)}
    />
  );
}
