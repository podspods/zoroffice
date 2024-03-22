import React, { PropsWithChildren } from 'react';
import { Box } from '@mui/material';

export type MainBoxProps = PropsWithChildren<object>;

export default function MainBox(props: MainBoxProps) {
  return <Box sx={{ width: '100%', margin: '2rem' }}>{props.children}</Box>;
}
