import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from 'react-i18next';
import { SxProps } from '@mui/material';
export type selectBoxProps = {
  defaultValue?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  itemList: string[];
  onChange: (event: SelectChangeEvent<string>) => void;
  customSx?: SxProps;
};

export function SelectBox({ ...props }: selectBoxProps) {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      {props.name && <InputLabel id={props.name}>{t(props.name)}</InputLabel>}
      {/* <InputLabel id="demo-simple-select-standard-label">Age</InputLabel> */}
      <Select
        labelId={props.name}
        sx={props.customSx}
        // labelId="demo-simple-select-standard-label"
        id={props.name}
        // label={props.name}
        onChange={props.onChange}
        defaultValue={props.defaultValue}
        value={props.value}
        MenuProps={{
          style: {
            maxHeight: 400,
            border: 'none'
          }
        }}
      >
        {props.placeholder && (
          <MenuItem key={props.placeholder} value='' disabled>
            {t(props.placeholder)}
          </MenuItem>
        )}
        {props.itemList.map((item) => {
          return (
            <MenuItem key={item} value={item}>
              {t(item)}
            </MenuItem>
          );
        })}
      </Select>
    </React.Fragment>
  );
}
