import {useTranslation} from 'react-i18next';
import {Grid} from '@mui/material';
import PropertyLine from '@systran/react-components/lib/atoms/PropertyLine';
import {GridStyled} from './TranslationResourcesElement';
import ReactJson from '@microlink/react-json-view';

export default function RowDetailOptionsValuesArea({installBodyOptions}: {installBodyOptions?: unknown}) {
  const {t} = useTranslation();
  return (
    <GridStyled>
      <Grid item md={12}>
        <PropertyLine offset={3} label={t('JSON Schema')}>
          <ReactJson src={installBodyOptions as object} name={false} collapsed={1} />
        </PropertyLine>
      </Grid>
    </GridStyled>
  );
}
