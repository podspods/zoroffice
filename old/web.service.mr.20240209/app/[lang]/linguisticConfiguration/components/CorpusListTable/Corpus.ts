import { Sharing } from '@/components/Permissions/SharingIndicator';

export type CorpusImport = {
  endDate: number,
  fileName: string,
  importId: string,
  nbEntriesImportedKo: number,
  nbEntriesImportedOk: number,
  nbEntriesToImport: number,
  startDate: number,
  status: string
}

export type Corpus = {
  id: string,
  name: string, // TODO normalize with filename ???
  srcLang: string,
  tgtLangs: string[],
  nbEntries: number,
  imports: [],
  accountId: string,
  comments: string,
  type: 'UD' | 'NORM',
  permission?: string,
  sharingStatus: Sharing
}

// Transform response from /corpusManager/list
export function transformApiResponse(row: any): Corpus {
  return {
    ...row,
    id: row.id || row.DT_RowId || row.name,
    tgtLangs: row?.tgtLangs.split(',') || []
  };
}
