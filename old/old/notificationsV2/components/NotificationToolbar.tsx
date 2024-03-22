'use client';

import React from 'react';
import { Toolbar } from '@mui/material';
import RefreshButtonGroup from '@systran/react-components/lib/organisms/table/RefreshButtonGroup';
import ToolbarButton from '@systran/react-components/lib/organisms/table/ToolbarButton';
import {
  MARK_ALL_AS_READ,
  MARK_AS_READ,
  MARK_AS_UNREAD,
  REFRESH
} from '../common/constant';
import { setRead } from '../store/notifications.store';

export const toolbarElement = [
  {
    label: MARK_AS_READ,
    disable: false,
    onClick: (e) => {
    // eslint-disable-next-line no-alert
      setRead(e);
    }
  },
  {
    label: MARK_AS_UNREAD,
    disable: false,
    onClick: () => {
    // eslint-disable-next-line no-alert
      alert(MARK_AS_UNREAD);
    }
  },
  {
    label: MARK_ALL_AS_READ,
    disable: false,
    onClick: () => {
    // eslint-disable-next-line no-alert
      alert(MARK_ALL_AS_READ);
    }
  }
];

export default function NotificationToolbar() {
  return (
    <React.Fragment>
      <Toolbar>
        <RefreshButtonGroup
          onRefreshChange={() => null}
          refreshRate='5'
          onClick={() => {
            // eslint-disable-next-line no-alert
            alert(REFRESH);
          }}
        />
        {toolbarElement &&
          toolbarElement.map((element, index) => {
            return (
              <ToolbarButton
                key={index}
                label={element.label}
                onClick={element.onClick}
              />
            );
          })}
      </Toolbar>
    </React.Fragment>
  );
}
