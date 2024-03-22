import crypto from 'crypto';
import {useState} from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import uniqBy from 'lodash/uniqBy';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import {SecondaryButton} from '@systran/react-components/lib/atoms/Buttons/Secondary';
import EditIcon from '@systran/react-components/lib/atoms/Icons/EditIcon';
import {useTranslation} from 'react-i18next';

export type Child = {
  _description: string
  _label: string
  _secret: string
  _readOnly: boolean
  _type: string
  _enum: []
}

export type Options = {
  disableClearable?: boolean
  multiple?: boolean
  size?: 'small'| 'medium' | undefined
}

export type Props = {
  name: string
  child: Child
  childValue: any
  onChange: (event: { target: any; }, value: string) => void
  options: Options
}

const filter = createFilterOptions();

const sha256 = (buffer: string) => {
  return crypto.createHash('sha256').update(buffer).digest().toString();
};

const hidePassword = (clearedPassword = '') => {
  return sha256(clearedPassword).substring(0, clearedPassword.length);
};

export const toReactSelect = (value: string, label: string | null) => {
  return {label: label ? label : value, value};
};

const buildOptions = ({ _enum = [], current }: { _enum: any[], current: any }) => {
  const checkStringBeforeToReactSelect = (c: any) =>
    typeof c === 'string' ? toReactSelect(c, null) : c;
  current = current ? (Array.isArray(current) ? current : [current]) : [];
  return uniqBy(
    _enum.map(checkStringBeforeToReactSelect).concat(
      current.map(checkStringBeforeToReactSelect)
    ),
    'value'
  );
};

export default function CreatableSetting({ name, child, childValue, onChange, options = {}}: Props) {
  const [editInProgress, setEditInProgress] = useState(false);
  const {t} = useTranslation();

  const onChangePassword = (event: { target: any; }) => {
    if (event.target) {
      onChange(event, event.target.value);
    }
  };

  const onEditPassword = () => {
    onChangePassword({ target: { value: '' } });
    setEditInProgress(true);
  };

  const {disableClearable} = options;

  return (
    <Box sx={{marginTop: '10px', marginBottom: '10px'}}>
      <div>
        <label data-target={name} title={t(child._description)}>
          {t(child._label || name)}
        </label>
        {child._secret && (
          <form autoComplete='off'>
            <div style={{display: 'inline-flex', paddingTop: '15px'}}>
              <div style={{marginRight: '5px'}}>
                <TextField
                  size='small'
                  type='password'
                  autoComplete='off'
                  name={name}
                  label={t(name)}
                  variant='outlined'
                  sx={{width: 370}}
                  value={(editInProgress ? (childValue || '') : hidePassword(childValue || ''))}
                  disabled={child._readOnly || !editInProgress}
                  onChange={onChangePassword}
                  onFocus={(e) => e.target.removeAttribute('readonly')}
                  onBlur={(e) => e.target.setAttribute('readonly', 'true')}
                />
              </div>
              <div style={{paddingTop: '0.3px'}}>
                <SecondaryButton
                  onClick={onEditPassword}
                  endIcon={<EditIcon size='2xs' />}
                  title={t('Edit password field')}
                  aria-label={t('Edit password field')}
                >
                  {t('Edit')}
                </SecondaryButton>
              </div>

            </div>
          </form>
        )}
        {!child._secret && (
          <Autocomplete
            size='small'
            sx={{width: 450}}
            freeSolo
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            value={childValue}
            options={child._type === 'array' ? (child._enum || []) : buildOptions({_enum: child._enum, current: childValue})}
            onChange={onChange}
            renderInput={(params) => (
              <TextField {...params} />
            )}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              const { inputValue } = params;
              const isExisting = options.some((option) => inputValue === (child._type === 'array' ? option : option.label));
              if (inputValue !== '' && !isExisting && !disableClearable) {
                filtered.push({
                  inputValue,
                  label: t('Add') + ' ' + inputValue
                });
              }
              return filtered;
            }}
            getOptionLabel={(option) => {
              if (typeof option === 'string') {
                return option;
              }
              if (option.inputValue) {
                return option.inputValue;
              }
              return (child._type === 'array') ? option : option.label;
            }}
            renderOption={(props, option) => <li {...props}>{child._type === 'array' ? option : option.label}</li>}
            {...options}
          />
        )}
      </div>
    </Box>
  );
}
