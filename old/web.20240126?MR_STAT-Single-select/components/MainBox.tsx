import React, { PropsWithChildren } from 'react';
import { Box } from '@mui/material';

export type Props = PropsWithChildren<object>;

export default function MainBox(props: Props) {
  return <Box sx={{ width: '100%', margin: '2rem' }}>{props.children}</Box>;
}
