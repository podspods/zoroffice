import {useState, useEffect} from 'react';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import FormEntry from '@systran/react-components/lib/atoms/FormEntry';
import AutoComplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { License } from './LicensesTable';
import {useTranslation} from 'react-i18next';

const getValue = ({activationMethod, optionsList}) => {
  if (activationMethod !== null && activationMethod !== undefined) {
    return Array.isArray(optionsList) && {activationMethod, label: optionsList.find((option) => option.value === activationMethod)?.label || ''};
  }
  return null;
};

type Props = {
  open: boolean;
  license?: License;
  installationId: string;
  onClose: () => void;
  onConfirm: (activationMethod, license, activationCode) => Promise<void>;
}

export default function ActivateLicenseForm({open, license, onClose, onConfirm, installationId}: Props) {
  const [activationMethod, setActivationMethod] = useState<'online' | 'offline' | 'phone'>('online');
  const [activationCode, setActivationCode] = useState('');
  const [activationCodeError, setActivationCodeError] = useState<string | undefined>();
  const {t} = useTranslation();

  const activationMethods = {
    online: { value: 'online', label: t('Online Activation') },
    offline: { value: 'offline', label: t('Offline Activation') },
    phone: { value: 'phone', label: t('Phone Activation') }
  };

  const activationMethodsList = [activationMethods.online, activationMethods.offline];

  useEffect(() => {
    if (license?.activation?.toLowerCase() === 'phone') {
      activationMethodsList.push(activationMethods.phone);
    }
    setActivationCode('');
    setActivationCodeError(undefined);
  }, [license]);

  return (
    <ConfirmModal
      open={open}
      title={t('Activate')}
      width='large'
      disabled={activationMethod !== 'online' && !activationCode}
      onConfirm={async () => onConfirm(activationMethod, license?.productKey, activationCode)}
      onClose={onClose}
    >
      <div>
        <FormEntry label='Activation method'>
          <AutoComplete
            placeholder={t('Activation method')}
            noOptionsText={<span style={{fontSize: 13}}>{t('No results found')}</span>}
            options={activationMethodsList}
            onChange={(e, newValue) => {
              setActivationMethod(newValue?.value);
            }}
            value={getValue({activationMethod, optionsList: activationMethodsList})}
            disablePortal
            renderInput={(params) =>
              (<TextField
                {...params}
              />)}
          />
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
          <FormEntry className={(activationCodeError ? ' has-error' : '')} label='Activation Code'>
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
