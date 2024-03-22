import RefreshRateButton, { RefreshRate } from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import RowActionToolbar from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import React from 'react';
import { useStore } from '@nanostores/react';
import {
  markAllAsRead,
  notificationsStore,
  refreshChange,
  searchChange,
  setCheckedList,
  setRefresh,
  startSearch
} from './notifications.store';
import { SearchInput } from '@/components/SearchInput';
import { MARK_ALL_AS_READ, SEARCH, leftActionList, notificationsActions } from './notifications.constant';
import { BaseButton } from '@systran/react-components/lib/atoms/Buttons/Base';
import { styled } from '@mui/material';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import { isDisable } from './notifications';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import { Notification } from './notifications.type';

export type NotificationsToolbarProps = {
  isLoading?: boolean;
  // searchText?: string;
  // refreshRate?: number;
  // checkedList?: Notification[];
  // leftActionList?: RowAction<Notification>[];

  // refreshChange?: (value: RefreshRate) => void;
  // setRefresh?: () => void;
  // markAllAsRead?: () => void;

  // searchChange?: (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => void;
  // startSearch?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export function NotificationsToolbar({ ...props }: NotificationsToolbarProps) {
  const {
    refreshRate, checkedList
  } = useStore(notificationsStore);
  return (
    <Toolbar>
      <LeftSide>
        <RefreshRateButton
          isLoading={props.isLoading}
          onRefresh={setRefresh}
          refreshRate={refreshRate}
          onRefreshChange={refreshChange}
        />
        <RowActionToolbar
          actions={leftActionList}
          selectedRows={checkedList}
        />
      </LeftSide>
      <RightSide>
        <BaseButton
          style={{ marginRight: '0.5rem' }}
          startIcon={<PlusIcon />}
          onClick={void markAllAsRead}
        >{MARK_ALL_AS_READ}
        </BaseButton>
        {/* <SearchInput
          placeholder={SEARCH}
          onChange={searchChange}
          value={props.searchText}
          onClick={startSearch}
        /> */}
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
