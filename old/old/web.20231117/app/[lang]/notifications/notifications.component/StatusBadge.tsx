import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Status } from '../notifications.type';

export type StatusBadgeProps = {
  title: string;
  status: Status;
  outliner?: boolean;
};

export default function StatusBadge({ ...props }: StatusBadgeProps) {
  if (props.outliner)
    return <Chip label={props.title} color={props.status} variant='outlined' />;
  return <Chip label={props.title} color={props.status} />;
}
