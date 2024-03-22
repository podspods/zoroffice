import { ListItemIcon, MenuItem, Select } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

import React from 'react';
export type MarkChoiceProps = {
  optionList: string[];
};

export default function MarkChoice({ ...props }: MarkChoiceProps) {
  const optionList = props.optionList;
  return (
    <React.Fragment>
      <ListItemIcon>
        <ConstructionIcon />
      </ListItemIcon>
      <Select label='Read'>
        {optionList.map((option, index) => (
          <MenuItem value={index} selected={false}>{option}</MenuItem>
        ))}
      </Select>
    </React.Fragment>
  );
}
