import {SetStateAction, useEffect, useState} from 'react';
import StatusBadge from '@systran/react-components/lib/atoms/StatusBadge';
import {SecondaryButton} from '@systran/react-components/lib/atoms/Buttons/Secondary';
import CheckIcon from '@systran/react-components/lib/atoms/Icons/CheckIcon';
import CancelIcon from '@systran/react-components/lib/atoms/Icons/CancelIcon';
import SearchIcon from '@systran/react-components/lib/atoms/Icons/SearchIcon';
import {Box, IconButton, InputAdornment, TextField, Toolbar} from '@mui/material';
import {styled} from '@mui/material/styles';
import ObjectSettings from './ObjectSettings';
import PageTitle from '@/components/PageTitle';
import {PostApi} from './PostApi';
import {useTranslation} from 'react-i18next';

export type Settings = Record<string, any>;

export type Template = Record<string, any>;

export type Props = {
  settings: Settings
  template: Template
  mutateSetting: () => Promise<void>
  mutateTemplate: () => Promise<void>
}

export default function SettingsWrapper({settings, template, mutateSetting, mutateTemplate}: Props) {
  const [localSettings, setLocalSettings] = useState(settings);
  const [localTemplate, setLocalTemplate] = useState(template);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState({error: '', success: ''});
  const {t} = useTranslation();

  useEffect(() => {
    setLocalSettings(settings);
    setLocalTemplate(template);
  }, [settings, template]);

  const onSaveSettings = async () => {
    try {
      const data = await PostApi.saveSettings(localSettings);
      setStatus({success: data?.success, error: ''});
      await mutateTemplate();
      await mutateSetting();
    }
    catch (error: any) {
      setStatus({success: '', error: error});
    }
  };

  const onCancel = async () => {
    await mutateTemplate();
    await mutateSetting();
    setStatus({success: '', error: ''});
  };

  const onSearchChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearch(event?.target?.value);
  };

  return (
    <Box sx={{width: '100%', margin: '2rem'}}>
      <PageTitle>{t('Server Settings')}</PageTitle>
      <Toolbar disableGutters sx={{justifyContent: 'space-between', marginBottom: '20px'}}>
        <div style={{display: 'inline-flex'}}>
          <SecondaryButton style={{marginRight: '10px'}} onClick={onSaveSettings} endIcon={<CheckIcon />}>
            {t('Save')}
          </SecondaryButton>
          <SecondaryButton style={{marginRight: '10px'}} onClick={onCancel} endIcon={<CancelIcon />}>
            {t('Cancel')}
          </SecondaryButton>
          <div style={{marginLeft: '10px'}}>
            {status?.error && <StatusBadge status='error'>{t(status.error)}</StatusBadge>}
            {status?.success && <StatusBadge status='success'>{t(status.success)}</StatusBadge>}
          </div>
        </div>
        <Box sx={{width: 500, maxWidth: '100%'}}>
          <StyledTextField
            fullWidth
            type='search'
            size='small'
            variant='outlined'
            placeholder={t('Search in settings')}
            value={search}
            onChange={onSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: search && (
                <IconButton
                  onClick={() => setSearch('')}
                >
                  <CancelIcon />
                </IconButton>
              )
            }}
          />
        </Box>
      </Toolbar>
      <ObjectSettings
        attribute={''}
        search={search}
        template={localTemplate}
        settingValues={localSettings || settings}
        onSettingsChange={({values}) => {
          setLocalSettings(values);
        }}
        onError={(error) => {
          setStatus({error: error.message, success: ''});
        }}
      />
    </Box>
  );
}

const StyledTextField = styled(TextField)`
  input[type='search']::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
`;
