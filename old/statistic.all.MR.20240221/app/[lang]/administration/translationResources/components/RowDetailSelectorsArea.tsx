import {useTranslation} from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import PropertyLine from '@systran/react-components/lib/atoms/PropertyLine';
import {TSelectors} from './types';
import TranslationResourcesSelectors from './TranslationResourcesSelectors';

export default function RowDetailSelectorsArea({selectors, noSelectors}: {selectors?: TSelectors; noSelectors?: boolean}) {
  const {t} = useTranslation();

  if (isEmpty(selectors) && !noSelectors) {
    return null;
  }

  return (
    <PropertyLine label={t('Selectors')}>
      <TranslationResourcesSelectors selectors={selectors} noSelectors={noSelectors} />
    </PropertyLine>
  );
}
