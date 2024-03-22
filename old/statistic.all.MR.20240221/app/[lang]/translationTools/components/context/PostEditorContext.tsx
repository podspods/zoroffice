'use client';

import {PropsWithChildren, createContext, useState} from 'react';

export type ModePostEditorType = 'file' | 'speech';
interface ModeContextProps {
  mode: ModePostEditorType;
  updateMode: (mode: ModePostEditorType) => void;
}

export const PostEditorContext = createContext<ModeContextProps>({
  mode: 'file',
  updateMode: () => {}
});

export default function ModeProvider({children, initialMode = 'file'}: PropsWithChildren & {initialMode?: ModePostEditorType}) {
  const [mode, setMode] = useState<ModePostEditorType>(initialMode);

  const updateMode = (mode: ModePostEditorType) => {
    setMode(mode);
  };

  return (
    <PostEditorContext.Provider value={{mode, updateMode}}>
      {children}
    </PostEditorContext.Provider>
  );
}
