import Box from '@mui/material/Box';
import {useTranslation} from 'react-i18next';
import {TComputingNode} from './types';
import TranslationResourcesComputingNode from './TranslationResourcesComputingNode';

export default function RowDetailComputingNodesArea({computingNodes = []}: {computingNodes?: TComputingNode[]}) {
  const {t} = useTranslation();

  if (!computingNodes.length) {
    return <div>{t('None')}</div>;
  }

  return (
    <Box>
      {computingNodes.map((computingNode) => (
        <TranslationResourcesComputingNode {...computingNode} key={`computingNode${computingNode.id}`} />
      ))}
    </Box>
  );
}
