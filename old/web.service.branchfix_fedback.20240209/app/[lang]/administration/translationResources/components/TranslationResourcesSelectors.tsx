import {useTranslation} from 'react-i18next';
import {TSelectors} from './types';
import WarningMessage from '@systran/react-components/lib/atoms/WarningMessage';
import PropertyLine from '@systran/react-components/lib/atoms/PropertyLine';
import {ReactNode} from 'react';
import {GridStyled} from './TranslationResourcesElement';

type TProps = {
  selectors?: TSelectors;
  noSelectors?: boolean;
  children?: ReactNode;
};

export default function TranslationResourcesSelectors({selectors, noSelectors, children}: TProps) {
  const {t} = useTranslation();
  if (noSelectors || !selectors || (!selectors.domain && !selectors.size && !selectors.owner && !selectors.tech)) {
    return <WarningMessage text={t('No selectors')} />;
  }

  return (
    <GridStyled>
      {selectors.domain && <PropertyLine label={t('Domain')}>{selectors.domain}</PropertyLine>}
      {selectors.size && <PropertyLine label={t('Size')}>{selectors.size}</PropertyLine>}
      {selectors.owner && <PropertyLine label={t('Owner')}>{selectors.owner}</PropertyLine>}
      {selectors.tech && selectors.tech.name && <PropertyLine label={t('Technology')}>{selectors.tech.name}</PropertyLine>}
      {selectors.tech && selectors.tech.type && <PropertyLine label={t('Technology type')}>{selectors.tech.type}</PropertyLine>}
      {children}
    </GridStyled>
  );
}
