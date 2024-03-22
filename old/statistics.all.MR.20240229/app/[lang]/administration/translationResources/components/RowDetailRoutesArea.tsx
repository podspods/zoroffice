import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {useTranslation} from 'react-i18next';
import {isInteger} from '@systran/react-components/lib/atoms/utils';
import {LinkInternal} from '@systran/react-components/lib/atoms/Link';
import InternalRoutes from '@/utils/internalRoutes';
import {TRoute} from './types';
import {GridStyled} from './TranslationResourcesElement';

export function RouteLink({profileId, serviceName = ''}: {profileId: string; serviceName?: string}) {
  return (
    <LinkInternal href={InternalRoutes.serverManagementRoutes(profileId)}>
      {profileId} {serviceName}
    </LinkInternal>
  );
}

export default function RowDetailRoutesArea({routes = []}: {routes?: TRoute[]}) {
  const {t} = useTranslation();
  if (!routes.length) {
    return <div>{t('None')}</div>;
  }

  return (
    <GridStyled>
      <Grid container>
        <Grid item md={4}>
          {t('Profile Id')}
        </Grid>
        <Grid item md={2}>
          {t('Public')} / {t('Private')}
        </Grid>
        <Grid item md={2}>
          {t('Activated')} / {t('Deactivated')}
        </Grid>
        <Grid item md={4}>
          {t('Service Name')}
        </Grid>
      </Grid>
      {routes.map((elem, i) => (
        <Box key={`route_elem_${i}`}>
          <Grid container>
            <Grid item md={4}>
              {isInteger(elem.profileId) && elem.profileId}
              {!isInteger(elem.profileId) && <RouteLink profileId={elem.profileId} />}
            </Grid>
            <Grid item md={2}>
              {elem.public ? t('Public') : t('Private')}
            </Grid>
            <Grid item md={2}>
              {elem.deactivated ? t('Deactivated') : t('Activated')}
            </Grid>
            <Grid item md={4}>
              {elem.serviceName}
            </Grid>
          </Grid>
        </Box>
      ))}
    </GridStyled>
  );
}
