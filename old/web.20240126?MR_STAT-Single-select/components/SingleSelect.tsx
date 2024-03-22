import {
  AutocompleteProps,
  AutocompleteRenderInputParams,
  Box,
  InputLabelProps
} from '@mui/material';
import { SyntheticEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import TextField from '@systran/react-components/lib/atoms/TextField';
import Autocomplete from '@systran/react-components/lib/atoms/Autocomplete';

export type SelectorProps =
  | {
      value: string | number;
      [key: string]: string | number;
    }
  | string
  | undefined
  | null;

export type SingleSelectProps = {
  options: Exclude<SelectorProps, undefined | null>[];
  width?: string;
  value?: SelectorProps;
  onChange?: (newValue: SelectorProps) => void;
  loading?: boolean;
  helperText?: string;
  label?: string;
  placeHolder?: string;
  renderInput?: (params: AutocompleteRenderInputParams) => JSX.Element;
  disableClearable?: boolean; // It's used in case you don't want your selection to be clearable
} & Omit<
  AutocompleteProps<
    SelectorProps,
    false,
    boolean | undefined,
    boolean | undefined
  >,
  'onChange' | 'renderInput'
>;

const customGetOptionLabel = (option: SelectorProps) =>
  typeof option === 'string' ? option : option?.label.toString() || '';

const inputLabelProps: InputLabelProps = {
  style: {
    pointerEvents: 'auto'
  }
};

const customIsOptionEqualToValue = (
  option: SelectorProps,
  value: SelectorProps
) => {
  const comparedOption = typeof option === 'string' ? option : option?.value;
  const comparedValue = typeof value === 'string' ? value : value?.value;
  return comparedOption === comparedValue;
};

export default function SingleSelect({
  options,
  value,
  onChange,
  loading,
  helperText,
  label,
  placeHolder,
  getOptionLabel,
  renderInput,
  isOptionEqualToValue,
  ...props
}: SingleSelectProps) {
  const { t } = useTranslation();

  const handleOnChange = useCallback(
    (
      _event: SyntheticEvent<Element, Event>,
      newValue: SelectorProps | null
    ) => {
      onChange?.(newValue);
    },
    [onChange]
  );

  const customRenderInput = useCallback(
    (params: AutocompleteRenderInputParams) => (
      <TextField
        {...params}
        label={label}
        fullWidth
        placeholder={placeHolder}
        InputLabelProps={inputLabelProps}
        helperText={helperText}
      />
    ),
    [t, helperText]
  );

  return (
    <Box sx={{ width: props.width }}>
      <Autocomplete
        // disableClearable={disableClearable}
        loading={loading}
        options={options}
        getOptionLabel={getOptionLabel || customGetOptionLabel}
        value={value}
        onChange={handleOnChange}
        renderInput={renderInput || customRenderInput}
        isOptionEqualToValue={
          isOptionEqualToValue || customIsOptionEqualToValue
        }
        {...props}
        clearIcon={null}
        fullWidth
      />
    </Box>
  );
}
