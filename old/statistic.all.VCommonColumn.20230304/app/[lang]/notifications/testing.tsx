/* eslint-disable no-console */
import * as React from 'react';
import { useDemoData } from '@mui/x-data-grid-generator';
import { DataGridPro } from '@systran/react-components/lib/organisms/Table/Table';

export default function HeaderFilteringDataGridPro() {
  const { data } = useDemoData({
    dataSet: 'Employee',
    rowLength: 100
  });

  console.log('data 11==>', data);
  console.log('data 12 ==>', data.columns[9]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      data
      {/* <DataGridPro
        {...data}
        initialState={{
          ...data.initialState,
          columns: {
            columnVisibilityModel: {
              avatar: false,
              id: false
            }
          }
        }}
        unstable_headerFilters
      /> */}
    </div>
  );
}
