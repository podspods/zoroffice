import { GridRenderCellParams } from '@mui/x-data-grid';
import React from 'react';
import { NotificationInput } from '@/components/Notifications/type';
import StatusBadge, {
  Status as badgeStatus
} from '@systran/react-components/lib/atoms/StatusBadge';
export type DisplayStatusProps = {
  params: GridRenderCellParams<NotificationInput, string>;
};

export default function DisplayStatus({ ...props }: DisplayStatusProps) {
  return (
    <StatusBadge
      title={props.params.row.level}
      status={props.params.row.level as badgeStatus}
    >
      {props.params.row.level}
    </StatusBadge>
  );
}
