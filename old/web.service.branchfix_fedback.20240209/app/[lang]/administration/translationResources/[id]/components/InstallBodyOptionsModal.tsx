import ModalListBody from '@systran/react-components/lib/atoms/ModalListBody';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import Typography from '@mui/material/Typography';
import {useTranslation} from 'react-i18next';
import {ChangeEvent, useState} from 'react';
import {Box, Collapse} from '@mui/material';
import BaseButton from '@systran/react-components/lib/atoms/Buttons/Base';
import CaretIcon from '@systran/react-components/lib/atoms/Icons/CaretIcon';
import DangerIcon from '@systran/react-components/lib/atoms/Icons/DangerIcon';
import {LinkInternal} from '@systran/react-components/lib/atoms/Link';
import {useTheme} from '@systran/react-components/lib/Theme';
import TextField from '@systran/react-components/lib/atoms/TextField';

type TProps = {
  selectedIntances: Array<{hostname: string; id: string; status: string}>;
  onClose: () => void;
  onConfirm: (options: string) => void;
};

export default function InstallBodyOptionsModal({selectedIntances, onClose, onConfirm: onInstallFollowingNodes}: TProps) {
  const {t} = useTranslation();
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [options, setOptions] = useState('{}');
  const [error, setError] = useState('');

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    try {
      setOptions(event.target.value);
      JSON.parse(event.target.value); // for json value validation
      setError('');
    }
    catch (error) {
      setError((error as any).message);
    }
  };

  return (
    <ConfirmModal width='large' title={t('Install')} open onConfirm={() => onInstallFollowingNodes(options)} onClose={onClose}>
      <Typography variant='h6' style={{marginBottom: '15px'}}>
        {t('Are you sure you want to install on the following nodes?')}
      </Typography>
      <ModalListBody list={selectedIntances.map((intance) => intance.hostname)} />
      <BaseButton style={{marginTop: '16px'}} variant='text' onClick={() => setIsExpanded((prev) => !prev)}>
        <Typography mr={1}>{t('Add Options')}</Typography>
        <CaretIcon direction={isExpanded ? 'down' : 'right'} />
      </BaseButton>
      <Collapse in={isExpanded}>
        <Box bgcolor={theme.palette.warning.light} p={2} mb={2}>
          <Box component='span' color={theme.palette.warning.main}>
            <DangerIcon shape='solid' size='xl' />
          </Box>
          <span style={{marginLeft: '10px'}}>
            <strong> {t('Limited to admin only')}</strong> <LinkInternal href={t('LINK_TO_TR_OPTS_INSTALL_DOC')}>{t('Consult the documentation')}</LinkInternal>{' '}
            {t('In order to specify advanced option')}
          </span>
        </Box>
        <TextField multiline minRows={4} fullWidth value={options} onChange={onChange} />
        {error && <Typography color='error'>{error}</Typography>}
      </Collapse>
    </ConfirmModal>
  );
}
