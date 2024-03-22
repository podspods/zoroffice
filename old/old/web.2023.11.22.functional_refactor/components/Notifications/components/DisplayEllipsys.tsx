import React from 'react';
import { NotificationInput } from '@/components/Notifications/type';
import RowActionMenu from '@systran/react-components/lib/organisms/RowAction/RowActionMenu';
import { actionList } from '@/components/Notifications/constant';
export type DisplayStatusProps = {
  row: NotificationInput;
};

export default function DisplayEllipsys({ ...props }: DisplayStatusProps) {
  return <RowActionMenu actions={actionList} selectedRow={props.row} />;
}
