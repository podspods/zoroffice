import {useState, createContext, ReactNode} from 'react';

export const initialDataProfile: ProfileAddType = {step: undefined, profileOptions: {source: '', target: ''}};

export type Selectors = {owner?: string; languagePair?: string; size?: string; tech?: {details: Array<{type: string; name: string}>; type: string; name: string}; domain?: string};
export type SupportedFeature = {ND: boolean; UD: boolean; TM: boolean; NFA: boolean};
export type ModelOptions = {supported_features: SupportedFeature; json_schema?: string};
export type Engine = {name?: string; type?: string; id?: string; modelOptions?: ModelOptions} | null | 'v7';
export type FilterOptions = {
  formatting?: {feedDefinitionName?: string; segmentCharacterName?: string; textualFormattingName?: string};
  noTranslateOptions?: {
    languageMarkupName?: boolean;
    nFWCountName?: string;
    noFontListName?: string;
    noStyleListName?: string;
    noTranslateAddressesName?: boolean;
    noTranslateCapitalizedWordsName?: boolean;
  };
};
export type GenericOptions = Array<{name: string; value: string; id: string}>;
export type LinguisticOptions = {sourceAnalysis?: {entityRule?: {id: string}}};
export type Dictionary = {id: string; dictName: string; domain?: Array<string> | string; name?: string | undefined; key?: string; type?: string};
export type Dictionaries = Array<Dictionary>;
export type Normalizations = Array<{id: string; dictName: string; domain: Array<string> | string}>;
export type TranslationMemoryTmListItem = {name?: string; id: string; type?: string; key?: string};
export type TranslationMemories = Array<TranslationMemoryTmListItem>;
export type Resources = {engine?: Engine | 'v7'; userDict?: Dictionaries; normalization?: Normalizations; translationMemory?: {corpusIds?: Array<string>}};
export type FlowProfile = Array<{profileName: string; source: string; target: string; profileId: string}> | null;
export type ResourceOptions = {
  dictionaries?: {dictionaries: Dictionaries};
  normalizations?: {normalizations: Normalizations};
  translationMemories?: {translationMemories: TranslationMemories};
};

export type OptionsType = {
  source: string;
  target: string;
  profileName?: string;
  genericOptions?: GenericOptions;
  filterOptions?: FilterOptions;
  linguisticOptions?: LinguisticOptions;
  flowProfile?: FlowProfile;
  selectors?: Selectors;
  resources?: Resources;
  modelOptions?: ModelOptions;
  noCache?: boolean;
  enabledNFA?: boolean;
  engineSelected?: Engine;
  deactivated?: boolean;
  profileId?: string;
  serviceName?: string;

  groups?: string[];
  users?: string[];
  translationResourceId?: string;
  public?: boolean;
  translationResources?: Array<{label: string; value: string}>;

  domain?: string;
  resourcesOptions?: ResourceOptions;
};
export type ProfileOnChangeOptionsType = Omit<OptionsType, 'source' | 'target'> & {
  source?: string;
  target?: string;
};
export type Step = 'LANGUAGE_SELECTORS' | 'PROFILE_OPTIONS' | 'MANAGE_PERMISSIONS' | 'PIVOT' | undefined;
export type ProfileAddType = {
  step: Step;
  profileOptions: OptionsType;
};

export type ProfileOnChangeEvent = {step?: Step; profileOptions?: OptionsType};

type TContext = {
  data: ProfileAddType;
  setData: (newData: ProfileOnChangeEvent) => void;
  clearData: () => void;
};

export const TranslationProfilesAddContext = createContext<TContext>({
  data: initialDataProfile,
  setData: () => {},
  clearData: () => {}
});

export const TranslationProfilesAddContextProvider = ({children}: {children: ReactNode}) => {
  const [data, setData] = useState<ProfileAddType>(initialDataProfile);

  const clearData = () => {
    setData(initialDataProfile);
  };

  const setContextData = (options: ProfileOnChangeEvent) => {
    setData((prev) => ({...prev, ...options}));
  };

  return <TranslationProfilesAddContext.Provider value={{data, setData: setContextData, clearData}}>{children}</TranslationProfilesAddContext.Provider>;
};
