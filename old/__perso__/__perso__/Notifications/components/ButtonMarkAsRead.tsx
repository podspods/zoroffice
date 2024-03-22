import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import React from 'react';
import { NotificationInput } from '@/components/Notifications/type';
import { MARK_AS_READ } from '@/components/Notifications/constant';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import { markAsRead } from '@/components/Notifications/store';

export default function ButtonMarkAsRead(): RowAction<NotificationInput> {
  return {
    label: MARK_AS_READ,
    icon: <PlusIcon />,
    onClick: (params) => void markAsRead(params),
    disable: (checkedRows) => !checkedRows.length
  };
}
