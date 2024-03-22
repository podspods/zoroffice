import {useState, createContext, Dispatch, SetStateAction, ReactNode, useEffect} from 'react';
import useSWR from 'swr';
import Apis from '@/utils/apis';

type TCheckBoxFieldItem = {label: string; checked: boolean};

export type CheckboxKeys = 'onlyMaster' | 'onlyLastVersion' | 'onlyUpgradeable';

type TDataForFiltering = {
  checkbox: {[key in CheckboxKeys]: TCheckBoxFieldItem};
  autocomplete: {computingNode?: {label: string; value: string}};
};
type TContextTranlsationResources = {filteringData: TDataForFiltering; connectedUserId: string};

const DEFAULT_CONTEXT_DATA = {
  filteringData: {
    checkbox: {
      onlyMaster: {label: 'Hide TRs dependencies', checked: true},
      onlyLastVersion: {label: 'Show All Versions', checked: false},
      onlyUpgradeable: {label: 'Show only upgradeable TRs', checked: false}
    },
    autocomplete: {
      computingNode: undefined
    }
  },
  connectedUserId: ''
};
export const TranslationResourcesContext = createContext<{
  data: {
    filteringData: TDataForFiltering;
    connectedUserId: string;
  };
  setData: Dispatch<SetStateAction<{filteringData: TDataForFiltering; connectedUserId: string}>>;
}>({
  data: DEFAULT_CONTEXT_DATA,
  setData: () => {}
});

type TProps = {children: ReactNode};
export const TranslationResourcesContextProvider = ({children}: TProps) => {
  const {data: user} = useSWR(Apis.userRoles, {
    shouldRetryOnError: false,
    revalidateOnFocus: false
  });

  const [data, setData] = useState<TContextTranlsationResources>(DEFAULT_CONTEXT_DATA);

  useEffect(() => {
    setData((prev) => ({...prev, connectedUserId: user?.id}));
  }, [user]);

  return <TranslationResourcesContext.Provider value={{data, setData}}>{children}</TranslationResourcesContext.Provider>;
};
