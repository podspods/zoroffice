import React, { useState } from 'react';
import { notificationsRoute } from '../notifications.type';
import { convertMessage, endPoint, getPalette } from '../notifications';

import { useDemoData } from '@mui/x-data-grid-generator';
import { DataGridPro } from '@mui/x-data-grid-pro';
export type HelperTestProps = {
  notificationsData?: any;
  testEndPoint?: boolean;
  dataGrid?: boolean;
  link?: boolean;
  testColumn?: boolean;
  testSearch?: boolean;
};
const HelperTest = ({ ...props }: HelperTestProps) => {
  // const color = getPalette(myTheme, myStatus);
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 10,
    maxColumns: 6
  });
  return (
    <React.Fragment>
      <p>Helper Service</p>
      {props.testEndPoint && (
        <React.Fragment>
          <p>{endPoint(notificationsRoute.LIST)} </p>
          <p>{endPoint(notificationsRoute.READ)} </p>
          <p>{endPoint(notificationsRoute.UNREAD)} </p>
          <div style={{ backgroundColor: '#666666' }}>666666 </div>
          <div style={{ backgroundColor: '#666666' }}>666666 </div>
          DisplayLine
        </React.Fragment>
      )}
      {props.dataGrid && (
        <div style={{ height: 400, width: '100%' }}>
          <DataGridPro
            initialState={{
              ...data.initialState,
              pagination: { paginationModel: { pageSize: 5 } }
            }}
            pageSizeOptions={[5, 10, 25]}
            {...data}
          />
        </div>
      )}

      {props.link && (
        <div style={{ height: 400, width: '100%' }}>
          {convertMessage(props.notificationsData.notifications[0].str)}
        </div>
      )}
    </React.Fragment>
  );
};

export default HelperTest;
