'use client';

import React from 'react';
import { Toolbar } from '@mui/material';
import { REFRESH, toolbarElement } from '../common/constant';
import { requestRefresh } from '../common/notification.store';
import RefreshRateButton from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import RowActionButton from '@systran/react-components/lib/organisms/RowAction/RowActionButton';

export default function NotificationToolbar() {
  return (
    <Toolbar>
      <RefreshRateButton
        onRefresh={requestRefresh}
        isLoading={false}
        refreshRate={1}
        onRefreshChange={() => null}
      />
      {toolbarElement &&
        toolbarElement.map((element, index) => {
          return (
            <RowActionButton
              key={index}
              label={element.label}
              onClick={element.onClick}
              selectedRows={[]}
            />
          );
        })}
    </Toolbar>
  );
}
