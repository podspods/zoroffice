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
import { SelectBox } from './SelectBox';


export type ModalRegisterProps = {
  open: boolean;
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
        placeholder={t('hostname')}
        fullWidth
        value={t(props.hostnameValue)}
        onChange={(event) => {
          props.onChangeHostname(event.target.value);
        }}
      />
      <div className='flex content-center item-center'>
        {!props.switchDisabled && (
          <StyledSwitch>
            <Typography>{'secure'}</Typography>
            <Typography style={{ paddingLeft: '2rem' }}>{'no'}</Typography>
            <Switch
              onChange={props.toogleSecureService}
            />

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
