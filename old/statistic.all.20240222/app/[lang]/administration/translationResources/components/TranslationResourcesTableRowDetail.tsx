import {TTranslationResource} from './types';
import PropertyLine from '@systran/react-components/lib/atoms/PropertyLine';
import {useTranslation} from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import RowDetailInfoArea from './RowDetailInfoArea';
import RowDetailSelectorsArea from './RowDetailSelectorsArea';
import RowDetailComputingNodesArea from './RowDetailComputingNodesArea';
import RowDetailPackageDependenciesArea from './RowDetailPackageDependenciesArea';
import RowDetailFlowArea from './RowDetailFlowArea';
import RowDetailRoutesArea from './RowDetailRoutesArea';
import RowDetailOptionsValuesArea from './RowDetailOptionsValuesArea';
import RowDetailModelOptionsArea from './RowDetailModelOptionsArea';

export default function TranslationResourcesTableRowDetail({
  selectors,
  noSelectors,
  store,
  computingNodes,
  packageDependencies,
  flow,
  runnable,
  routes,
  authorizeConfigTrOption,
  installBodyOptions,
  modelOptions,
  ...props
}: TTranslationResource) {
  const {t} = useTranslation();
  return (
    <>
      <RowDetailInfoArea {...props} store={store} runnable={runnable} />

      <RowDetailSelectorsArea selectors={selectors} noSelectors={noSelectors} />

      {!store && (
        <PropertyLine label={t('Computing Nodes')}>
          <RowDetailComputingNodesArea computingNodes={computingNodes} />
        </PropertyLine>
      )}

      {packageDependencies && (
        <PropertyLine label={t('Package Dependencies')}>
          <RowDetailPackageDependenciesArea {...packageDependencies} />
        </PropertyLine>
      )}

      {flow && (
        <PropertyLine label={t('Flow Dependencies')}>
          <RowDetailFlowArea flow={flow} store={store} />
        </PropertyLine>
      )}

      {!store && runnable && (
        <PropertyLine label={t('Routes')}>
          <RowDetailRoutesArea routes={routes} />
        </PropertyLine>
      )}
      {authorizeConfigTrOption && !isEmpty(installBodyOptions) && (
        <PropertyLine label={t('Options Values')}>
          <RowDetailOptionsValuesArea installBodyOptions={installBodyOptions} />
        </PropertyLine>
      )}

      {authorizeConfigTrOption && modelOptions && !isEmpty(modelOptions) && (
        <PropertyLine label='Model Options'>
          <RowDetailModelOptionsArea {...modelOptions} />
        </PropertyLine>
      )}
    </>
  );
}
