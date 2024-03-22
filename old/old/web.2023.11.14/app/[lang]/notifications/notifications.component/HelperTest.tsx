import React, { useState } from 'react';
import { notificationsRoute } from '../notifications.type';
import { endPoint, getPalette } from '../notifications';
import { red } from '@mui/material/colors';
import { Status } from '../../administration/serverManagement/services/services.type';
import { type Theme } from '@mui/material';
import { DEFAULT_THEME } from '@systran/react-components/lib/Theme';
import {ModelStudioPrimaryPalette, TranslateCloudPrimaryPalette,  TranslateServerPrimaryPalette
} from '@systran/react-components/.storybook/static/primaryPalettes'
import { merge } from 'lodash';
export type HelperTestProps = {
  notificationsData: any;
  testEndPoint: boolean;
  testNode: boolean;
  testColumn: boolean;
  testSearch: boolean;
};
const HelperTest = ({ ...props }: HelperTestProps) => {

  const color = getPalette(myTheme, myStatus);
  return (
    <React.Fragment>
      <p>Helper Service</p>
      {props.testEndPoint && (
        <React.Fragment>
          <p>{endPoint(notificationsRoute.LIST)} </p>
          <p>{endPoint(notificationsRoute.READ)} </p>
          <p>{endPoint(notificationsRoute.UNREAD)} </p>
          <div style={{backgroundColor: '#666666'}}>666666 </div>
          <div style={{backgroundColor: '#666666'}}>666666 </div>
          DisplayLine
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default HelperTest;
