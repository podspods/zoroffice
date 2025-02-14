import React from 'react';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import { useTranslation } from 'react-i18next';
import {
  SelectChangeEvent,
  Switch,
  TextField,
  Typography,
  styled
} from '@mui/material';
import { HOSTNAME, NO, SECURE, YES } from '@/components/Services/constant';
import SelectBox from '@/components/Services/components/SelectBox';

export type ModalRegisterProps = {
  open: boolean;
  secureService: boolean;
  switchDisabled: boolean;
  title: string;
  hostnameValue: string;
  serviceSelected: string;
  nameList: string;
  serviceList: string[];
  onConfirm: (signal: AbortSignal) => void;
  onClose: (event: React.SyntheticEvent<Element, Event>) => void;
  onChange: (event: SelectChangeEvent<string>) => void;
  onChangeHostname: (text: string) => void;
  toogleSecureService: () => void;
};

export default function ModalRegister({ ...props }: ModalRegisterProps) {
  const { t } = useTranslation();
  return (
    <ConfirmModal
      open={props.open}
      title={t(props.title)}
      width='large'
      onConfirm={props.onConfirm}
      onClose={props.onClose}
    >
      <SelectBox
        itemList={props.serviceList}
        onChange={props.onChange}
        name={t(props.nameList)}
        value={(props.serviceSelected)}
      />
      <TextField
        variant='outlined'
        placeholder={t(HOSTNAME)}
        fullWidth
        value={t(props.hostnameValue)}
        onChange={(e) => {
          props.onChangeHostname(e.target.value);
        }}
      />
      <div className='flex content-center item-center'>
        {!props.switchDisabled && (
          <StyledSwitch>
            <Typography>{SECURE}</Typography>
            <Typography style={{ paddingLeft: '2rem' }}>{NO}</Typography>
            <Switch
              onChange={props.toogleSecureService}
            />

            <Typography>{YES}</Typography>
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
