import {useTranslation} from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import {Grid} from '@mui/material';
import PropertyLine from '@systran/react-components/lib/atoms/PropertyLine';
import {TModelOptions} from './types';
import {GridStyled} from './TranslationResourcesElement';
import ReactJson from '@microlink/react-json-view';

export default function RowDetailModelOptionsArea({json_schema = {}, supported_features = {}}: TModelOptions) {
  const {t} = useTranslation();
  const supportedFeatures = Object.entries(supported_features).map(([key, value]) => value === true && key);
  return (
    <GridStyled container>
      {!isEmpty(json_schema) && (
        <Grid item md={12}>
          <PropertyLine offset={3} label={t('JSON Schema')}>
            <ReactJson src={json_schema as object} name={false} collapsed={1} />
          </PropertyLine>
        </Grid>
      )}
      {supportedFeatures.length && (
        <Grid item md={12}>
          <PropertyLine offset={3} label={t('Supported Features')}>
            {supportedFeatures.join(', ')}
          </PropertyLine>
        </Grid>
      )}
    </GridStyled>
  );
}
