import {useTranslation} from 'react-i18next';
import {Grid} from '@mui/material';
import AppAutocomplete from '@systran/react-components/lib/atoms/AppAutocomplete';
import useGetLps from '../hooks/useGetLps';

type TranslationProfilesLanguageSelectorsType = {sourceSelected: string; targetSelected: string; onChange: (args: {sourceSelected: string; targetSelected: string}) => void};

export default function TranslationProfilesLanguageSelectors({sourceSelected, targetSelected, onChange}: TranslationProfilesLanguageSelectorsType) {
  const {t} = useTranslation();
  const {sourceList, targetList, fillTargetLanguage} = useGetLps({sourceSelected});

  return (
    <Grid container spacing={2} justifyContent='center'>
      <Grid item lg={4}>
        <AppAutocomplete
          placeholder={t('Source')}
          noResultsText={t('No results found')}
          options={sourceList}
          value={sourceSelected}
          onChange={(event) => {
            onChange({sourceSelected: event.value, targetSelected});
            fillTargetLanguage();
          }}
        />
      </Grid>
      <Grid item lg={4}>
        <AppAutocomplete
          placeholder={t('Target')}
          noResultsText={t('No results found')}
          options={targetList}
          value={targetSelected}
          onChange={(event) => {
            onChange({sourceSelected, targetSelected: event.value});
          }}
        />
      </Grid>
    </Grid>
  );
}
