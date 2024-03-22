import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Switch, Typography } from '@mui/material';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import TextField from '@systran/react-components/lib/atoms/TextField';
import { serviceList } from './serviceUtils';
import { ServiceName } from './serviceType';
import SingleSelect from '@/components/SingleSelect';

export type ModalRegisterProps = {
  open: boolean;
  onConfirm: (
    service: string,
    hostname: string,
    secure: boolean
  ) => Promise<void>;
  onClose: () => void;
};

export default function ModalRegister({ ...props }: ModalRegisterProps) {
  const { t } = useTranslation();
  const [switchDisabled, setSwitchDisabled] = useState<boolean>(true);
  const [serviceSelected, setServiceSelected] = useState<string>('');
  const [hostname, setHostname] = useState<string>('');
  const [secureService, setSecureService] = useState<boolean>(false);
  const toogleSecureService = () => {
    setSecureService(!secureService);
  };
  const handeServiceChange = (newValue: string) => {
    setServiceSelected(newValue);
    setSwitchDisabled(isSecureSwitchDisabled(newValue));
  };

  const handleConfirm = async () => {
    await props.onConfirm(serviceSelected, hostname, secureService);
    setHostname('');
  };
  const optionList = serviceList();
  return (
    <ConfirmModal
      open={props.open}
      title={t('Register a service')}
      width='medium'
      onConfirm={handleConfirm}
      onClose={props.onClose}
      primaryActionText={'Submit'}
    >
      <Box sx={{ width: '100%' }}>
        <SingleSelect
          sx={{ paddingBottom: '0.3rem' }}
          width={'100%'}
          options={optionList}
          label={t('Service type')}
          placeHolder={t('Service type')}
          value={serviceSelected}
          disableClearable
          onChange={(newValue) => handeServiceChange(newValue as string)}
        />
        <TextField
          label={t('Hostname')}
          placeholder={t('Hostname')}
          fullWidth
          value={hostname}
          onChange={(event) => setHostname(event.target.value)}
        />
      </Box>

      <Box>
        {!switchDisabled && (
          <Box sx={{ alignItems: 'center', display: 'flex' }}>
            <Typography>{'Secure'}</Typography>
            <Typography style={{ paddingLeft: '2rem' }}>{'No'}</Typography>
            <Switch onChange={toogleSecureService} />
            <Typography>{'Yes'}</Typography>
          </Box>
        )}
      </Box>
    </ConfirmModal>
  );
}

function isSecureSwitchDisabled(service: string): boolean {
  switch (service) {
    case ServiceName.REDIS_NODE:
      return true;
    case ServiceName.COMPUTING_NODE:
    case ServiceName.DISPATCHER:
    case ServiceName.ROUTING_SERVER:
    case ServiceName.BROKER:
    default:
      return false;
  }
}
