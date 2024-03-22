import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Status } from '../notifications.type';

export type StatusBadgeProps = {
  title: string;
  status: string;
  outliner?: boolean;
};


export default function StatusBadge({ ...props }: StatusBadgeProps) {

  const color =Status[props.status] ;
  if (props.outliner)
    return <Chip label={props.title} color={color} variant='outlined' />;
  return <Chip label={props.title} color={color} />;
}

