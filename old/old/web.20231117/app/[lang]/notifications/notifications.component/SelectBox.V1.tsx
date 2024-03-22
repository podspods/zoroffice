import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export type selectBoxProps = {
  value?: string;
  name: string;
  itemList: string[];
  onChange: (event: SelectChangeEvent<string>) => void;
};

export function SelectBox({ ...props }: selectBoxProps) {
  return (
    <Select
      labelId='demo-select-small-label'
      id='demo-select-small'
      // value={age}
      label='Age'
      onChange={props.onChange}
    >
      <MenuItem value=''>
        <em>None</em>
      </MenuItem>
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
  );
}
