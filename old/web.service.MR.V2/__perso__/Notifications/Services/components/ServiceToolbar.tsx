import React from 'react';
import { Typography, styled } from '@mui/material';
import { useStore } from '@nanostores/react';
import { useTranslation } from 'react-i18next';

import RefreshRateButton from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import RowActionToolbar from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import RowActionButton from '@systran/react-components/lib/organisms/RowAction/RowActionButton';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import {
  refreshChange,
  searchChange,
  servicesStore,
  setModalRegisterVisible,
  setRefresh,
  startSearch
} from '@/components/Services/store';
import { actionList, rowList } from '@/components/Services/utils';
import SearchField from '@/components/SearchField';
import { INFO_DISPLAY_ACTIONS, REGISTER_NEW_SERVICE } from '@/components/Services/constant';

export type ToolBarServiceProps = {
  isLoading: boolean;
};

export default function ServiceToolbar({ ...props }: ToolBarServiceProps) {
  const {
    refreshRate,
    searchText,
    checkedList,
    serviceRegisteredList
  } = useStore(servicesStore);
  const { t } = useTranslation();
  return (
    <div>
      <Toolbar>
        <LeftSide>
          {checkedList.length > 0 ? (
            <RowActionToolbar
              actions={actionList(checkedList)}
              selectedRows={rowList(checkedList, serviceRegisteredList)}
            />
          ) : (
            <Typography>{t(INFO_DISPLAY_ACTIONS)}</Typography>
          )}
        </LeftSide>
        <RightSide>
          <SearchField
            onChange={searchChange}
            value={searchText}
            onClick={startSearch}
          />
          <RefreshRateButton
            isLoading={props.isLoading}
            onRefresh={setRefresh}
            refreshRate={refreshRate}
            onRefreshChange={refreshChange}
          />
          <RowActionButton
            key={REGISTER_NEW_SERVICE}
            icon={<PlusIcon />}
            label={REGISTER_NEW_SERVICE}
            onClick={() => void setModalRegisterVisible()}
          />
        </RightSide>
      </Toolbar>
    </div>
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
