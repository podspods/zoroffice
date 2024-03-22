import { stringToNumberOrDefault } from '@/utils/utils';
import { GroupSharingStatus } from '@/components/Permissions/SharingIndicator';

export type UnknownIndexationStatus = {
  status?: '-'
}

export type KnownIndexationStatus = {
  status: string,
  percentage: number,
  processSeg: number,
  totalSeg: number
}

export type IndexationStatus = UnknownIndexationStatus | KnownIndexationStatus

export type TranslationMemory = {
  id: string
  status?: string,
  filename: string
  sourceLanguage?: string,
  targetLanguages?: string[],
  createdAt?: Date,
  nbSegments?: number,
  indexationStatus?: IndexationStatus,
  type: 'file' | 'directory',
  permission?: string,
  isOwner: boolean,
  sharingStatus: GroupSharingStatus[] | {sharing: GroupSharingStatus[], type: string}
}

// Transform response from /corpusManager/list
export function transformApiResponse({DT_RowId, id, createdAt, nbSegments, ...row}: any): TranslationMemory {
  return {
    ...row,
    id: id || DT_RowId || row.filename,
    createdAt: createdAt ? new Date(createdAt) : undefined,
    nbSegments: stringToNumberOrDefault(nbSegments, undefined)
  };
}
