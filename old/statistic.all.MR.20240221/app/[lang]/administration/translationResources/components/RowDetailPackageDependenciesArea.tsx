import {useTranslation} from 'react-i18next';
import Grid from '@mui/material/Grid';
import {GridStyled} from './TranslationResourcesElement';

export default function RowDetailPackageDependenciesArea(props: {[key: string]: string}) {
  const {t} = useTranslation();
  return (
    <GridStyled container>
      <Grid item md={4}>
        {t('Systran Translation Dispatcher')}
      </Grid>
      <Grid item md={8}>
        {props['systran-translation-dispatcher']}
      </Grid>
    </GridStyled>
  );
}
