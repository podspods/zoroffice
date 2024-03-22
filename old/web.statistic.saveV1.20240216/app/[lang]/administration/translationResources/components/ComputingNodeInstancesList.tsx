import {useTranslation} from 'react-i18next';
import {displayBytes} from '@systran/react-components/lib/atoms/utils';
import Box from '@mui/material/Box';
import {TComputingNodeInstance} from './types';
import {ComputingNodeCommonList} from './TranslationResourcesElement';

export default function ComputingNodeInstancesList({instances}: {instances: TComputingNodeInstance[]}) {
  const {t} = useTranslation();

  return (
    <Box>
      {instances.map((instance) => {
        const renderedIntancesData = [
          {label: t('Id'), value: instance.id},
          {label: t('Number of restart'), value: instance.nbRestart},
          {label: t('Status'), value: instance.status},
          {label: t('Memory'), value: displayBytes(instance.memory, 'kB')},
          {label: t('Pid'), value: instance.pid}
        ];
        return <ComputingNodeCommonList key={`instance_${instance.id}`} list={renderedIntancesData} labelMd={3} valueMd={9} />;
      })}
    </Box>
  );
}
