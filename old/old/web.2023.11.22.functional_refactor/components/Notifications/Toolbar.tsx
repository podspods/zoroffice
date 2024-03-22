import RefreshRateButton from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import React from 'react';
import { useStore } from '@nanostores/react';
import {
  markAllAsRead,
  notificationsStore,
  refreshChange,
  requestRefresh
} from './store';
import { MARK_ALL_AS_READ, actionList } from '@/components/Notifications/constant';
import { styled } from '@mui/material';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import RowActionToolbar from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import RowActionButton from '@systran/react-components/lib/organisms/RowAction/RowActionButton';
import { idTorowList } from '@/components/Notifications/utils';

export type NotificationsToolbarProps = {
  isLoading?: boolean;
};

export function NotificationsToolbar({ ...props }: NotificationsToolbarProps) {
  const { refreshRate, checkedList, notificationList } = useStore(
    notificationsStore
  );

  return (
    <Toolbar>
      <LeftSide>
        <RefreshRateButton
          isLoading={props.isLoading as boolean}
          onRefresh={requestRefresh}
          refreshRate={refreshRate}
          onRefreshChange={refreshChange}
        />
        <RowActionToolbar
          actions={actionList}
          selectedRows={idTorowList(checkedList, notificationList)}
        />
      </LeftSide>
      <RightSide>
        <RowActionButton
          key={MARK_ALL_AS_READ}
          icon={<PlusIcon />}
          label={MARK_ALL_AS_READ}
          onClick={() => void markAllAsRead()}
        />
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
