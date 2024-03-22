import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export type selectBoxProps = {
  defaultValue?: string;
  name: string;
  itemList: string[];
  onChange: (event: SelectChangeEvent<string>) => void;
};

export function SelectBox({ ...props }: selectBoxProps) {
  console.log('props ==>',props );
  
  return (
    <>
      <InputLabel>{props.name}</InputLabel>
      <Select
        id={props.name}
        // value={props.value}
        label={props.name}
        onChange={props.onChange}
        defaultValue={props.defaultValue}
      >
        {props.defaultValue && (
          <MenuItem key={props.defaultValue} value={props.defaultValue} selected={true}>
            {props.defaultValue}
          </MenuItem>
        )}
        {props.itemList.map((item) => {
          return (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
}
