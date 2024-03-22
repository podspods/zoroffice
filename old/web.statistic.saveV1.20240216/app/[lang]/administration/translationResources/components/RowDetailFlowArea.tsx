import {useTranslation} from 'react-i18next';
import PropertyLine from '@systran/react-components/lib/atoms/PropertyLine';
import {LinkInternal} from '@systran/react-components/lib/atoms/Link';
import InternalRoutes from '@/utils/internalRoutes';
import {TTranslationResourceFlow, TTranslationResourceFlowObject} from './types';
import {GridStyled} from './TranslationResourcesElement';

export default function RowDetailFlowArea({store, flow}: {store: unknown; flow: TTranslationResourceFlow}) {
  const {t} = useTranslation();
  if (store) {
    return (
      <GridStyled>
        {flow.map((flowItem, index) => (
          <div key={`trs_flow_${index}`}>{flowItem as string}</div>
        ))}
      </GridStyled>
    );
  }

  return (
    <GridStyled container>
      {flow.map((flowItem, i) => {
        const {role, depId} = flowItem as TTranslationResourceFlowObject;
        return (
          <PropertyLine label={role} key={'flow_elem_' + i} offset={4}>
            {depId && <LinkInternal href={InternalRoutes.translationResource(depId)}>{depId}</LinkInternal>}
            {!depId && t('Not found')}
          </PropertyLine>
        );
      })}
    </GridStyled>
  );
}
