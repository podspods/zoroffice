'use client';

import { AppBar, Tab, Tabs, Typography, Box } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { tableSubject, typeTable } from './components/statisticTable';

export default function AdministrationStatisticsProfiles() {
  const [value, setValue] = useState<typeTable>(Object.values(typeTable)[0]);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(Object.values(typeTable)[newValue]);
  };
  const labelList = Object.entries(typeTable);

  return (
    <div>
      {/* <AppBar position='static'>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{ background: 'lightgrey' }}
        >
          {labelList.map(([key, label]) => (
            <Tab key={key} label={label} />
          ))}
        </Tabs>
      </AppBar>
      <ul>
        {labelList.map(([key, label]) => (
          <TabPanel key={key} value={value} index={label}>
            {tableSubject({ subject: value })}
          </TabPanel>
        ))}
      </ul> */}
    </div>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number | string;
  value: number | string;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <>
      {/* <div
        role='tabpanel'
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </div>
      <div>
        <AppBar position='static'>
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{ background: '#ecd1d1' }}
          >
            {labelList.map(([key, label]) => (
              <Tab key={key} label={label} />
            ))}
          </Tabs>
        </AppBar>
        <ul>
          {labelList.map(([key, label]) => (
            <TabPanel key={key} value={value} index={label}>
              {tableSubject({ subject: value })}
            </TabPanel>
          ))}
        </ul>
      </div> */}
    </>
  );
}
