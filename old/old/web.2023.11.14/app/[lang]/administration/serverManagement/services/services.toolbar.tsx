import { Toolbar } from '@mui/material';
import RefreshRateButton from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import RowActionToolbar from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import React from 'react';
import { SearchInput } from './components/SearchInput';
import { useStore } from '@nanostores/react';
import {
  refreshChange,
  searchChange,
  servicesStore,
  setRefresh,
  startSearch
} from './services.store';
import { actionList, rowList } from './services';

export type ToolBarServiceProps = {
  isLoading: boolean;
};

export function ServiceToolbar({ ...props }: ToolBarServiceProps) {
  const {
    refreshRate,
    searchText,
    checkedList,
    serviceRegisteredList
  } = useStore(servicesStore);
  return (
    <div>
      <Toolbar style={{ paddingLeft: '0px' }}>
        <RefreshRateButton
          isLoading={props.isLoading}
          onRefresh={setRefresh}
          refreshRate={refreshRate}
          onRefreshChange={refreshChange}
        />
        <RowActionToolbar
          actions={actionList(checkedList)}
          selectedRows={rowList(checkedList, serviceRegisteredList)}
        />

        <SearchInput
          onChange={searchChange}
          value={searchText}
          onClick={startSearch}
        />
      </Toolbar>
    </div>
  );
}
