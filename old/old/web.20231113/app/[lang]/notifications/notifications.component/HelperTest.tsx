import React, { useState } from 'react';
import { notificationsRoute } from '../notifications.type';
import { endPoint } from '../notifications';
export type HelperTestProps = {
  notificationsData: any;
  testEndPoint: boolean;
  testNode: boolean;
  testColumn: boolean;
  testSearch: boolean;
};
const HelperTest = ({ ...props }: HelperTestProps) => {

  return (
    <React.Fragment>
      <p>Helper Service</p>
      {props.testEndPoint && (
        <React.Fragment>
          <p>{endPoint(notificationsRoute.LIST)} </p>
          <p>{endPoint(notificationsRoute.READ)} </p>
          <p>{endPoint(notificationsRoute.UNREAD)} </p>
        
        </React.Fragment>
      )}
     
    </React.Fragment>
  );
};

export default HelperTest;
