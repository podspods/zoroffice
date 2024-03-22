import {useTranslation} from 'react-i18next';
import Box from '@mui/material/Box';
import {TComputingNodeDependency} from './types';
import {LinkInternal} from '@systran/react-components/lib/atoms/Link';
import InternalRoutes from '@/utils/internalRoutes';
import {displayInstancesNb} from './ComputingNodeRoot';
import {ComputingNodeCommonList} from './TranslationResourcesElement';

export default function ComputingNodeDepsList({dependencies}: {dependencies: TComputingNodeDependency[]}) {
  const {t} = useTranslation();
  return (
    <Box>
      {dependencies.map((dependency) => {
        const renderedIntancesData = [
          {label: t('Id'), value: <LinkInternal href={InternalRoutes.translationResource(dependency.id)}>{dependency.id}</LinkInternal>},
          {label: t('Name'), value: dependency.name},
          {label: t('Role'), value: dependency.role},
          {label: t('Version'), value: dependency.version, hidden: !dependency.version},
          {label: t('Convergence State'), value: dependency.convergenceState},
          {label: t('Current Status'), value: dependency.status},
          {label: t('Expected Status'), value: dependency.expectedStatus},
          {label: t('Number of Instances'), value: displayInstancesNb(dependency.instanceCount, t)},
          {label: t('Number of Instances Requested'), value: displayInstancesNb(dependency.expectedInstanceCount, t)}
        ];
        return <ComputingNodeCommonList key={`dependency_${dependency.id}`} list={renderedIntancesData} />;
      })}
    </Box>
  );
}
