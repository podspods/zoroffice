import PropertyLine from '@systran/react-components/lib/atoms/PropertyLine';
import WarningMessage from '@systran/react-components/lib/atoms/WarningMessage';
import {TComputingNode} from './types';
import {useTranslation} from 'react-i18next';
import Typography from '@mui/material/Typography';
import ComputingNodeRoot from './ComputingNodeRoot';
import ComputingNodeFlow from './ComputingNodeFlow';
import {GridStyled} from './TranslationResourcesElement';

export default function TranslationResourcesComputingNode({warning, statusFailed, hostname, flow, dependencies, ...props}: TComputingNode) {
  const {t} = useTranslation();
  return (
    <GridStyled>
      {warning && <WarningMessage text={t('Computing Node status not up to date')} />}
      {statusFailed && <WarningMessage text={t('Failed to get Computing Node status')} />}
      <PropertyLine label={t('Hostname')}>
        <ComputingNodeLink hostname={hostname} />
      </PropertyLine>

      <div>{flow ? <ComputingNodeFlow dependencies={dependencies} /> : <ComputingNodeRoot {...props} dependencies={dependencies} />}</div>
    </GridStyled>
  );
}

export function ComputingNodeLink({hostname}: {hostname: string}) {
  return <Typography component='span'>{hostname}</Typography>;
}
