import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useTranslation} from 'react-i18next';
import PropertyLine from '@systran/react-components/lib/atoms/PropertyLine';
import {TFunction} from 'i18next';
import {TComputingNode} from './types';
import ComputingNodeInstancesList from './ComputingNodeInstancesList';
import ComputingNodeDepsList from './ComputingNodeDepsList';

export function displayInstancesNb(nbInstances = 0, t: TFunction<'translation', undefined>) {
  const instanceText = nbInstances === 1 ? t('instance') : t('instances');
  return `${nbInstances} ${instanceText}`;
}

export default function ComputingNodeRoot({
  installOutput = '',
  convergenceState,
  status,
  expectedStatus,
  postConfigOutput = '',
  unconfigureOutput = '',
  uninstallOutput = '',
  nbInstances,
  instances,
  dependencies
}: Omit<TComputingNode, 'hostname' | 'statusFailed'>) {
  const {t} = useTranslation();
  return (
    <Box>
      <PropertyLine label={t('Convergence State')}>{t(convergenceState)}</PropertyLine>
      <PropertyLine label={t('Current Status')}>{t(status)}</PropertyLine>
      <PropertyLine label={t('Expected Status')}>{t(expectedStatus)}</PropertyLine>

      {Boolean(installOutput) && (
        <PropertyLine label={t('Install output')}>
          <Typography component='pre'>{t(installOutput)}</Typography>
        </PropertyLine>
      )}

      {Boolean(postConfigOutput) && (
        <PropertyLine label={t('PostConfig output')}>
          <Typography component='pre'>{t(postConfigOutput)}</Typography>
        </PropertyLine>
      )}

      {Boolean(unconfigureOutput) && (
        <PropertyLine label={t('Unconfigure output')}>
          <Typography component='pre'>{t(unconfigureOutput)}</Typography>
        </PropertyLine>
      )}

      {Boolean(uninstallOutput) && (
        <PropertyLine label={t('Uninstall output')}>
          <Typography component='pre'>{t(uninstallOutput)}</Typography>
        </PropertyLine>
      )}

      <PropertyLine label={t('Number of instances')}>{displayInstancesNb(nbInstances, t)}</PropertyLine>

      {Boolean(instances) && (
        <PropertyLine label={t('Instances')}>
          <ComputingNodeInstancesList instances={instances} />
        </PropertyLine>
      )}

      {Boolean(dependencies) && (
        <PropertyLine label={t('Installed Dependencies')}>
          <ComputingNodeDepsList dependencies={dependencies} />
        </PropertyLine>
      )}
    </Box>
  );
}
