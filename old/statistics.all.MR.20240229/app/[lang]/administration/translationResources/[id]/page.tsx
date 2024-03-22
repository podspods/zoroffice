'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Panel, PanelBody, PanelHeading} from '../components/TranslationResourcesElement';
import {useTranslation} from 'react-i18next';
import TranslationResourcesTableRowDetail from '../components/TranslationResourcesTableRowDetail';
import SkeletonContent from '@/components/IframeLoader';
import TranslationResourceDetailInstances from './components/TranslationResourcesDetailInstances';
import useSWR from 'swr';
import Apis from '@/utils/apis';
import {useState} from 'react';
import {RefreshRate} from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import {check} from '@/components/UserAuthorizations';

export default function AdministrationTranslationResourcesId({params}: {params: {id: string}}) {
  const hasAdminPermission = check('admin');

  if (!hasAdminPermission) {
    return null;
  }
  return <AdministrationTranslationResourcesIdContent id={params.id} />;
}

const AdministrationTranslationResourcesIdContent = ({id}: {id: string}) => {
  const {t} = useTranslation();
  const [refreshRate, setRefreshRate] = useState<RefreshRate>(5);
  const {data: trDetailData, mutate: refetchPage, isLoading} = useSWR(Apis.translationResources.getTranslationResourceDetail(id), {
    shouldRetryOnError: false,
    revalidateOnFocus: true,
    refreshInterval: refreshRate === 'Never' ? 0 : refreshRate * 1000
  });
  const {data: authorizeConfigTrOption} = useSWR(Apis.translationResources.getAuthorizeConfigTrOption);

  if (!trDetailData) {
    return <SkeletonContent />;
  }

  return (
    <Box width='100%'>
      <Panel>
        <PanelHeading style={{borderRadius: '4px'}}>
          <Typography variant='h6'>
            {t('Translation Resource')}{' '}
            <Typography variant='h6' component='span' color='primary'>
              {id}
            </Typography>
          </Typography>
        </PanelHeading>
      </Panel>

      <Panel>
        <PanelHeading>{t('Instances')}</PanelHeading>
        <PanelBody>
          <TranslationResourceDetailInstances refetchPage={refetchPage} trDetailData={trDetailData} isLoading={isLoading} refreshRate={refreshRate} setRefreshRate={setRefreshRate} id={id} />
        </PanelBody>
      </Panel>

      <Panel>
        <PanelHeading>{t('Detail')}</PanelHeading>
        <PanelBody>
          <TranslationResourcesTableRowDetail {...trDetailData} authorizeConfigTrOption={authorizeConfigTrOption} />
        </PanelBody>
      </Panel>
    </Box>
  );
};
