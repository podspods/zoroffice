import React, { useState } from 'react';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import { useTranslation } from 'react-i18next';
import {
  SelectChangeEvent,
  Switch,
  TextField,
  Typography,
  styled
} from '@mui/material';
import SelectBox from './SelectBox';
import { serviceList } from './serviceUtils';
import { ServiceName } from './serviceType';

export type ModalRegisterProps = {
  open: boolean;
  onConfirm: (service: string, hostname: string, secure: boolean) => void;
  onClose: (event: React.SyntheticEvent<Element, Event>) => void;
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
  const handleConfirm = () => {
    props.onConfirm(serviceSelected, hostname, secureService);
  };

  return (
    <ConfirmModal
      open={props.open}
      title={t('Register a service')}
      width='large'
      onConfirm={handleConfirm}
      onClose={props.onClose}
    >
      <div style={{ width: '100%' }}>
        <SelectBox
          itemList={serviceList()}
          onChange={handeServiceChange}
          name={t('Service type')}
          value={serviceSelected}
          sx={{ width: '100%' }}
        />
      </div>
      <TextField
        variant='outlined'
        placeholder={t('hostname')}
        fullWidth
        value={t(hostname)}
        onChange={(event) => setHostname(event.target.value)}
      />
      <div className='flex content-center item-center'>
        {!switchDisabled && (
          <StyledSwitch>
            <Typography>{'secure'}</Typography>
            <Typography style={{ paddingLeft: '2rem' }}>{'no'}</Typography>
            <Switch onChange={toogleSecureService} defaultChecked />
            <Typography>{'yes'}</Typography>
          </StyledSwitch>
        )}
      </div>
    </ConfirmModal>
  );
}

const StyledSwitch = styled('div')`
  display: flex;
  align-items: center;
`;

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
