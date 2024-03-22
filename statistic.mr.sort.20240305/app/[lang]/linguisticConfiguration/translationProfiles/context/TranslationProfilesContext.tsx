import {useState, createContext, Dispatch, SetStateAction, ReactNode} from 'react';

export const TranslationProfilesContext = createContext<{
  data: {
    enabledProfilesNFA: boolean;
    connectedUserId: string;
  };
  setData: Dispatch<SetStateAction<{enabledProfilesNFA: boolean; connectedUserId: string}>>;
}>({
  data: {
    enabledProfilesNFA: false,
    connectedUserId: ''
  },
  setData: () => void undefined
});
type TProps = {children: ReactNode};
export const TranslationProfilesContextProvider = ({children}: TProps) => {
  const [data, setData] = useState({
    enabledProfilesNFA: false,
    connectedUserId: ''
  });

  return <TranslationProfilesContext.Provider value={{data, setData}}>{children}</TranslationProfilesContext.Provider>;
};
