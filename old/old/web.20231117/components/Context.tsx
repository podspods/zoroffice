'use client';

import {createContext} from 'react';

export const MyContext = createContext<{
  globalSettings: object,
  updateGlobalSettings: React.Dispatch<React.SetStateAction<object>>
}>({globalSettings: {}, updateGlobalSettings: () => {}});
