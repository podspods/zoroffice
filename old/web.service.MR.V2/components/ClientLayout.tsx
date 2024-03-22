'use client';

import React, {useMemo, useState} from 'react';
import {DEFAULT_THEME} from '@systran/react-components/lib/Theme';
import {commonFetch} from '@/utils/fetcher';
import {SWRConfig} from 'swr';
import {MyContext} from '@/components/Context';
import {SystranThemeProvider as ThemeProvider} from '@systran/react-components/lib/Theme/ThemeProvider';
import merge from 'lodash/merge';
import isEmpty from 'lodash/isEmpty';


export const ClientLayout = (props: React.PropsWithChildren<{theme: any}>) => {
  const { children } = props;
  const [globalSettings, setGlobalSettings] = useState({});

  const completeTheme = useMemo(() => {
    if (!props.theme || isEmpty(props.theme)) {
      return DEFAULT_THEME;
    }
    return merge({}, DEFAULT_THEME, props.theme);
  }, [props.theme]);

  return (
    <MyContext.Provider value={{globalSettings, updateGlobalSettings: setGlobalSettings}}>
      <ThemeProvider theme={completeTheme}>
        <SWRConfig
          value={{
            shouldRetryOnError: false,
            // refreshInterval: 300,
            // dedupingInterval: 1000000,
            fetcher: commonFetch
          }}
        >
          {children}
        </SWRConfig>
      </ThemeProvider>
    </MyContext.Provider>
  );
};
