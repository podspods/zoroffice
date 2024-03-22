import { MenuItem, Select } from '@mui/material';
import React from 'react';

export default function MarkChoice() {
  const optionList = ['Marquer comme lu', 'Marquer comme non lu'];
  return (<React.Fragment>
    <Select label='Read'>
      {optionList.map((option, index) => (
        <MenuItem value={index}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </React.Fragment>);
}
