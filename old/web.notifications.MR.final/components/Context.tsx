'use client';

import {createContext} from 'react';

export const MyContext = createContext<{
  globalSettings: {
    installationId?: string
  },
  updateGlobalSettings: React.Dispatch<React.SetStateAction<object>>
}>({globalSettings: {}, updateGlobalSettings: () => {}});
