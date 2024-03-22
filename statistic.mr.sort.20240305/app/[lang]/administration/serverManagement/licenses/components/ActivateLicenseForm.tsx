import {useState} from 'react';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import FormEntry from '@systran/react-components/lib/atoms/FormEntry';
import TextField from '@mui/material/TextField';
import { License } from './LicensesTable';
import {useTranslation} from 'react-i18next';
import { MenuItem, Select } from '@mui/material';

export type ActivationMethod = 'online' | 'offline' | 'phone'

type Props = {
  open: boolean;
  license: License;
  installationId: string;
  onClose: () => void;
  onConfirm: (activationMethod: ActivationMethod, license: string, activationCode: string) => Promise<void>;
}

export default function ActivateLicenseForm({open, license, onClose, onConfirm, installationId}: Props) {
  const [activationMethod, setActivationMethod] = useState<ActivationMethod>('online');
  const [activationCode, setActivationCode] = useState('');
  const [activationCodeError, setActivationCodeError] = useState<string | undefined>();
  const {t} = useTranslation();

  const activationMethods = {
    online: { value: 'online' as const, label: t('Online Activation') },
    offline: { value: 'offline' as const, label: t('Offline Activation') },
    phone: { value: 'phone' as const, label: t('Phone Activation') }
  };

  const activationMethodsList = [
    activationMethods.online,
    activationMethods.offline,
    ...(license.activation?.toLowerCase() === 'phone' ? [activationMethods.phone] : [])
  ];

  return (
    <ConfirmModal
      open={open}
      title={t('Activate')}
      width='extraLarge'
      disabled={activationMethod !== 'online' && !activationCode}
      onConfirm={async () => onConfirm(activationMethod, license.productKey, activationCode)}
      onClose={onClose}
    >
      <div>
        <FormEntry label='Activation method'>
          <Select
            placeholder={t('Activation method')}
            onChange={(event) => {
              setActivationMethod(event.target.value as ActivationMethod);
            }}
            defaultValue={activationMethods.online.value}
            value={activationMethod}
            style={{width: '100%'}}
          >
            {activationMethodsList.map(({value, label}) => <MenuItem value={value}>{label}</MenuItem>)}
          </Select>
        </FormEntry>
        {activationMethod !== 'online' && (
          <FormEntry label='Installation Id'>
            <TextField
              variant='outlined'
              placeholder={t('Installation Id')}
              fullWidth
              disabled
              value={installationId}
            />
          </FormEntry>
        )}
        {activationMethod !== 'online' && (
          <FormEntry label='Activation Code'>
            <TextField
              variant='outlined'
              placeholder={t('Activation Code')}
              fullWidth
              multiline
              rows={activationMethod === 'offline' ? 7 : 1}
              disabled={false}
              value={activationCode}
              onChange={(event) => {
                setActivationCode(event.target.value);
              }}
            />
          </FormEntry>
        )}
      </div>
    </ConfirmModal>
  );
}
