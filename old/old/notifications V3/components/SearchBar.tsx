import { Button, TextField, TextFieldVariants } from '@mui/material';
import React from 'react';

import SearchIcon from '@mui/icons-material/Search';

export type SearchBarProps = {
  placeholder?: string;
  id?: string;
  label?: string;
  variant?: TextFieldVariants;
};

export default function SearchBar({ ...props }: SearchBarProps) {
  return (
    <React.Fragment>
      <div>
        <TextField id={props.id} label={props.label} variant={props.variant} />
        <Button variant='outlined'>
          <SearchIcon />
        </Button>
      </div>
    </React.Fragment>
  );
}
