import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import React from 'react';
import { NotificationInput } from '@/components/Notifications/type';
import { MARK_AS_UNREAD } from '@/components/Notifications/constant';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import { markAsUnRead } from '@/components/Notifications/store';

export default function ButtonMarkAsUnRead(): RowAction<NotificationInput> {
  return {
    label: MARK_AS_UNREAD,
    icon: <PlusIcon />,
    onClick: (params) => void markAsUnRead(params),
    disable: (checkedRows) => !checkedRows.length
  };
}
