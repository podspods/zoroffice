import Typography from '@mui/material/Typography/Typography';
import LanguagePairsRender from '@systran/react-components/lib/molecules/LanguagePairsRender';
import { useTranslation } from 'react-i18next';

export type DetailsProps = {
  source: string;
  target?: string | string[];
  localized?: boolean;
}


export default function Details({source}: DetailsProps) {
  const {t} = useTranslation();

  return (
    <div>
      <Typography sx={{color: 'inherit'}}>
        <b>{t('Language')}: </b>
        <LanguagePairsRender source={source} localized />
      </Typography>
    </div>
  );
}
