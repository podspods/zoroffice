import {useEffect, useState} from 'react';
import Switch from '@systran/react-components/lib/atoms/ButtonsSpecial/Switch';
import Box from '@mui/material/Box';
import {useTranslation} from 'react-i18next';

type TProps = {data?: boolean; onChange: (event: boolean) => void};
export default function TranslationProfilesNFAOptions({data = false, onChange}: TProps) {
  const {t} = useTranslation();
  const [enabledNFA, setEnabledNFA] = useState(data);

  useEffect(() => {
    setEnabledNFA(data);
  }, [data]);

  const onChangeData = (bool: boolean) => {
    setEnabledNFA(bool);
    onChange(bool);
  };

  return (
    <Box style={{display: 'inline-flex', alignItems: 'center', width: '50%'}}>
      <Box component='label' style={{marginRight: 4, marginBottom: 0}}>
        {t('Enable Neural Fuzzy Adaption')}
      </Box>
      <Switch onChange={onChangeData} value={enabledNFA} />
    </Box>
  );
}
