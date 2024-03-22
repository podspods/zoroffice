import { DateTime } from 'luxon';

export type DetailStat = {
  id: string;
  date: DateTime;
  userName: string;
  groupName: string;
  sourceLanguage: string;
  targetLanguage: string;
  languagePair: string;
  profileName: string;
  userAgent: string;
  mimeType: string;
  numberChar: number;
};

export type RawDetailStat = {
  id: string;
  date: string;
  accountId: string;
  accountName: string;
  sourceLanguage: string;
  targetLanguage: string;
  profileId: string;
  profileName: string;
  operation: string;
  success: boolean;
  elapsedTime: number;
  mimetype: string;
  nbCharacters: number;
  nbTokens: string;
  nbTus: number;
  nbTusFailed: number;
  userAgent: string;
  nbSegments: number;
  nbCacheHits: number;
};


