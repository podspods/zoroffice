import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, SelectChangeEvent, Switch, Typography } from '@mui/material';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import TextField from '@systran/react-components/lib/atoms/TextField';
import SelectBox from './SelectBox';
import { serviceList } from './serviceUtils';
import { ServiceName } from './serviceType';

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
  const [secureService, setSecureService] = useState<boolean>(true);
  const toogleSecureService = () => {
    setSecureService(!secureService);
  };
  const handeServiceChange = (event: SelectChangeEvent<string>) => {
    setServiceSelected(event.target.value);
    setSwitchDisabled(isSecureSwitchDisabled(event.target.value));
  };
  const handleConfirm = async () => {
    await props.onConfirm(serviceSelected, hostname, secureService);
    setHostname('');
  };

  return (
    <ConfirmModal
      open={props.open}
      title={t('Register a service')}
      width='medium'
      onConfirm={handleConfirm}
      onClose={props.onClose}
    >
      <Box sx={{ width: '100%' }}>
        <SelectBox
          itemList={serviceList()}
          onChange={handeServiceChange}
          name={t('Service type')}
          value={serviceSelected}
          sx={{ width: '100%' }}
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
          <Box sx={{ alignItems: 'center' }}>
            <Typography>{'Secure'}</Typography>
            <Typography style={{ paddingLeft: '2rem' }}>{'No'}</Typography>
            <Switch onChange={toogleSecureService} defaultChecked />
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
