import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from 'react-i18next';

export type selectBoxProps = {
  value?: string;
  defautValue?: string;
  name: string;
  itemList: string[];
  onChange: (event: SelectChangeEvent<number>) => void;
};

export function SelectBox({ ...props }: selectBoxProps) {
  const { t } = useTranslation();
  let itemCount = 0 ; 
  return (
    <FormControl variant='standard'>
      <InputLabel>{props.name}</InputLabel>
      <Select
        value={props.defautValue ? props.defautValue  : null}
        label={props.name}
        displayEmpty
        onChange={props.onChange}
        defaultValue={0}
      >
        {props.defautValue && (
          <MenuItem key={props.defautValue} value={props.defautValue}>
          <em>{t(props.defautValue)}</em>
          </MenuItem>
        )}
        {props.itemList.map((item) => {
          return (
          <MenuItem key={props.defautValue} value={props.defautValue}>
              {t(item)}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>

   
  );
}
