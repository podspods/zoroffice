
export type Feedback = {
  id: string,
  _id: string,
  sourceLanguage: string,
  targetLanguage: string,
  source: string,
  target: string,
  translationRating: string,
  description?: string,
  suggestedTranslation: string,
  problemSeverity: string,
  insertedAt: Date,
  updatedAt: Date,
  createdBy: string,
  status: string,
  severityPriority: number,
  updates: {createdBy: string, updatedAt: string}[],
  accountName: string,
  displayName: string,
  reviewer: string,
  accountId: string,
  creatorName: string,
  profileName: string,
}

export type AddToUD = {
  ownerId: string | undefined,
  dictId?: string,
  source: string,
  type?: string,
  target?: string,
}

export type AddToTM = {
  corpusId: string,
  sourceSentence: string,
  targetSentence: string,
}

export type PayloadsEntry = {
  src: string,
  srcPos: string,
  tgtPos: string,
  priority: string | number,
  comments: string,
  type?: string,
  tgt?: string
}

export type Dict = {
  dictId: string | undefined;
  srcLang: string;
  tgtLang?: string;
  ownerId?: string;
  tgtLangs?: string;
  id?: string;
  accountId?: string;
}


export type Tm = {
  id: string,
  sourceLanguage: string,
  targetLanguages: string,
  filename: string,
  type: 'directory' | 'file'
}

export type Data = {
  dict: Dict,
  pos: string,
  dnt: boolean,
  priority: string | number,
  comments: string
}

export type AppendPayloads = {
  dict: Dict,
  entry: PayloadsEntry
}

export type UpdatePayloads = {
  id: string,
  payload: { addToUD?: AddToUD, addToTM?: AddToTM, expandPayload?: ExpandPayload}
}

export type ExpandPayload = {
  suggestedTranslation: string,
  problemSeverity: string,
  description: string | undefined,
  translationRating: string,
  status: string
}

export type AppendTmPayloads = {
  corpusId: string,
  sourceLanguage: string,
  targetLanguage: string,
  sourceSentence: string,
  targetSentence: string
}
