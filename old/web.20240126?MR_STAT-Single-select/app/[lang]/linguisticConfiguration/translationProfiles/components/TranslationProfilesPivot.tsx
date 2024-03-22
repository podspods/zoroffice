import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {useTranslation} from 'react-i18next';
import {FlowProfile} from '../context/TranslationProfilesAddContext';

type Props = {
  source: string;
  target: string;
  flowProfile: FlowProfile;
};

export default function TranslationProfilesPivot({source, target, flowProfile}: Props) {
  const i18n = useTranslation();
  return (
    <Box pl={'8%'}>
      <Typography ml={-2} component='label' fontWeight='bold' variant='body1'>
        {i18n.t('Pivot profile') + ' '}
        {source.toUpperCase()} {'>'} {target.toUpperCase()}
      </Typography>
      <Grid container mt={1}>
        <Grid item md={4} fontWeight='bold'>
          {i18n.t('ProfileName')}
        </Grid>
        <Grid item md={4} fontWeight='bold'>
          {i18n.t('Languages')}
        </Grid>
      </Grid>
      {flowProfile?.map((e, i) => (
        <Grid container className='row' key={i}>
          <Grid item md={4}>
            {e.profileName}
          </Grid>
          <Grid item md={4}>
            {' '}
            {e.source.toUpperCase()} <i className='fa fa-long-arrow-right' /> {e.target.toUpperCase()}{' '}
          </Grid>
        </Grid>
      ))}
    </Box>
  );
}