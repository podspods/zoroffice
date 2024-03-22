'use client';

import React from 'react';
import { Toolbar } from '@mui/material';
import RefreshButtonGroup from '@systran/react-components/lib/organisms/table/RefreshButtonGroup';
import ToolbarButton from '@systran/react-components/lib/organisms/table/ToolbarButton';
import {
  REFRESH,
  toolbarElement
} from '../common/constant';


export default function NotificationToolbar() {
  return (
    <React.Fragment>
      <Toolbar>
        <RefreshButtonGroup
          options={[1, 2, 3, 'Never']}
          onRefreshChange={(a) => console.log('REFRESH + a 19  ==>', `${REFRESH}  ${a} sec`)}
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
