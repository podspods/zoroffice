'use client';

import React from 'react';

import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import { PlusIcon } from '@systran/react-components/lib/atoms/Icons/Icons';
import { markAsRead, markAsUnRead } from './NotificationsUtils';
import { Notifications } from './NotificationsTypes';

export const actions: RowAction<Notifications>[] = [
  {
    label: 'Mark as read',
    icon: <PlusIcon />,
    onClick: (params) => void markAsRead(params)
  },
  {
    label: 'Mark as unread',
    icon: <PlusIcon />,
    onClick: (params) => void markAsUnRead(params)
  }
];
