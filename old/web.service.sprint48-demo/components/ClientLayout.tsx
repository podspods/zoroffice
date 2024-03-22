'use client';

import {useMemo, PropsWithChildren} from 'react';
import {DEFAULT_THEME} from '@systran/react-components/lib/Theme';
import {commonFetch} from '@/utils/fetcher';
import {SWRConfig} from 'swr';
import SettingsProvider from '@/components/SettingProvider';
import {SystranThemeProvider as ThemeProvider} from '@systran/react-components/lib/Theme/ThemeProvider';
import merge from 'lodash/merge';
import isEmpty from 'lodash/isEmpty';
import {Theme} from '@mui/material';

export const ClientLayout = ({children, theme = {}}: PropsWithChildren<{theme: Theme | {}}>) => {

  const completeTheme = useMemo(() => {
    if (isEmpty(theme)) {
      return DEFAULT_THEME;
    }
    return merge({}, DEFAULT_THEME, theme);
  }, [theme]);

  return (
    <SettingsProvider>
      <ThemeProvider theme={completeTheme}>
        <SWRConfig
          value={{
            shouldRetryOnError: false,
            fetcher: commonFetch
          }}
        >
          {children}
        </SWRConfig>
      </ThemeProvider>
    </SettingsProvider>
  );
};
