import RefreshRateButton, {
  RefreshRate
} from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import React from 'react';
import { useStore } from '@nanostores/react';
import {
  markAllAsRead,
  markAsRead,
  markAsUnRead,
  notificationsStore,
  refreshChange,
  requestRefresh
} from './notifications.store';
import {
  MARK_ALL_AS_READ, MARK_AS_READ, MARK_AS_UNREAD, toolbarElement,
} from './notifications.constant';
import { BaseButton } from '@systran/react-components/lib/atoms/Buttons/Base';
import { styled } from '@mui/material';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';

import { NotificationInput } from './notifications.type';
export type NotificationsToolbarProps = {
  isLoading?: boolean;
  refreshRate?: number;
  checkedList?: Notification[];
  leftActionList: RowAction<NotificationInput>[];

  refreshChange?: (value: RefreshRate) => void;
  setRefresh?: () => void;
  markAllAsRead?: () => void;

};

export function NotificationsToolbar({ ...props }: NotificationsToolbarProps) {
  const { refreshRate, checkedList } = useStore(notificationsStore);

  return (
    <Toolbar>
      <LeftSide>
        <RefreshRateButton
          isLoading={props.isLoading}
          onRefresh={requestRefresh}
          refreshRate={props.refreshRate ? props.refreshRate : refreshRate}
          onRefreshChange={refreshChange}
        />

        {/* {props.leftActionList &&
          props.leftActionList.map((oneButton) => (
            <BaseButton
              onClick={oneButton.onClick}
              startIcon={oneButton.icon}
              disabled={checkedList.length <= 0}
              style={{
                marginRight: '0.6rem'
              }}
            >
              {oneButton.label}
              {oneButton.onClick}

            </BaseButton>
          ))} */}

        <BaseButton
          onClick={markAsRead}
          startIcon={<PlusIcon />}
          disabled={checkedList.length <= 0}
          style={{
            marginRight: '0.6rem'
          }}
        >
          {MARK_AS_READ}
        </BaseButton>
        <BaseButton
          onClick={markAsUnRead}
          startIcon={<PlusIcon />}
          disabled={checkedList.length <= 0}
          style={{
            marginRight: '0.6rem'
          }}
        >
          {MARK_AS_UNREAD}
        </BaseButton>
      </LeftSide>
      <RightSide>
        <BaseButton
          style={{ marginRight: '0.5rem' }}
          startIcon={<PlusIcon />}
          onClick={void markAllAsRead}
        >
          {MARK_ALL_AS_READ}
        </BaseButton>
      </RightSide>
    </Toolbar>
  );
}

const Toolbar = styled('div')`
  padding-left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftSide = styled('div')`
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
`;
const RightSide = styled('div')`
  padding-left: 0;
  display: flex;
  justify-content: flex-end;
`;
