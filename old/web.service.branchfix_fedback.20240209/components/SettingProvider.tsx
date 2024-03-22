'use client';

import {PropsWithChildren, createContext, useState} from 'react';

export type Settings = {
  precisePDF: number,
  uploadFileSizeLimit: number,
  maxUploadFileTranslationNumber: number,
  fileUploadIsDisabled: number,
  uploadFileSizeLimitByExtension: Array<{extension: string, size: number}>,
  uploadWhiteList: {
    corpus: string[],
    dictionary: string[],
    fileTranslation: string[],
    speechTranslation: string[]
  },
  csrfToken: string,
  installationId: string,
  provider: string,
  speechProvider: string,
  speechProviderAllowUndefinedSource: boolean,

  // Todo: determine settings type
  hasConcordanceSearchLicense: unknown,
  node: unknown,
  globalLimitCharacters: unknown,
  globalSpeechRecognition: unknown,
  translationV2: unknown,
  translationV3: unknown,
  translateBoxCache: unknown,
  inactivityPolicy: unknown,
  interval: unknown,
  margin: unknown,
  sessionDuration: unknown,
  globalLimitCharactersConcordance: unknown,
  publicUrls: unknown,
  enabledFeatures: unknown,
  moviePath: unknown,
  locale: unknown,
}

type UpdateSettings = <S extends keyof Settings>(newSettings: Pick<Settings, S> | Settings) => void
type InitSettings = (initialSettings: Settings) => void
type SettingsContext = {updateSettings: UpdateSettings, initSettings: InitSettings, settings?: Settings}

export const SettingsContext = createContext<SettingsContext>({
  updateSettings: () => {},
  initSettings: () => {}
});

export type Props = PropsWithChildren

export default function SettingsProvider({children}: Props) {
  const [settings, setSettings] = useState<Settings | undefined>(undefined);

  const initSettings = (initialSettings: Settings) => {
    setSettings(initialSettings);
  };

  function updateSettings<S extends keyof Settings>(newSettings: Pick<Settings, S> | Settings) {
    setSettings(settings => {
      return settings ? { ...settings, ...newSettings } : undefined;
    });
  }

  return (
    <SettingsContext.Provider value={{settings, initSettings, updateSettings}}>
      {children}
    </SettingsContext.Provider>
  );
}
