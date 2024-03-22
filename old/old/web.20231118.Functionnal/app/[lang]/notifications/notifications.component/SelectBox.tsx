import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from 'react-i18next';

export type selectBoxProps = {
  defaultValue?: string;
  value?: string;
  name: string;
  itemList: string[];
  onChange: (event: SelectChangeEvent<string>) => void;
};

export function SelectBox({ ...props }: selectBoxProps) {
  const { t } = useTranslation();
  return (
    <>
      <InputLabel id={props.name}>{t(props.name)}</InputLabel>
      {/* <InputLabel id="demo-simple-select-standard-label">Age</InputLabel> */}
      <Select
        labelId={props.name}
        // labelId="demo-simple-select-standard-label"
        id={props.name}
        // label={props.name}
        onChange={props.onChange}
        defaultValue={props.defaultValue}
        value={props.value}
      >
        {props.defaultValue && (
          <MenuItem key={props.defaultValue} value={props.defaultValue}>
            {t(props.defaultValue)}
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
    </>
  );
}
