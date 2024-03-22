import {RefreshRate} from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import {
  GridFeatureMode,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel
} from '@systran/react-components/lib/organisms/Table/Table';
import {ToastMessage} from '@/components/contexts/ToastMessageContext';
import {Dispatch, MutableRefObject, SetStateAction} from 'react';

type RemoteHooksData = {
  loading: boolean,
  isLoading?: boolean,
  isValidating: boolean,
  mutate: () => Promise<Sentence[] | undefined>;
  sortingMode: GridFeatureMode,
  filterMode: GridFeatureMode,
  paginationMode: GridFeatureMode,
  onPaginationModelChange: (model: GridPaginationModel) => void;
  onSortModelChange: (sortModel: GridSortModel) => void;
  onFilterModelChange: (filterModel: GridFilterModel) => void;
  rows: Sentence[],
  rowCount: number,
  paginationModel: GridPaginationModel,
  refreshRate: RefreshRate,
  setRefreshRate: (refreshInterval: RefreshRate) => void;
}

type SpeechSegmentMetadata = {
  start: number;
  end: number;
  lang: string;
  langConfidence: number;
  channel: string;
  speaker: {
    id: string;
    gender?: string;
  }
}

type SpeechWords = {
  start: number;
  duration: number;
  nextStart: number;
  text: string;
  lastText?: string;
}

export type TmSentenceObject = {
  penalty: number;
  score: number;
  source: string;
  target: string;
}

export type Sentence = {
  _id: string;
  mid: number;
  srcPath: string;
  sourceSentence: string;
  targetSentence: string;
  tgtPath: string;
  mtSentence: string;
  tuId: number;
  fileId: string;
  originalSourceSentence: string;
  originalTargetSentence: string;
  date: string;
  uploadDateRenamed: string;
  DT_RowId: string;
  id: string;
  status?: string;
  tmSentence?: TmSentenceObject[];
  segmentMetaData?: SpeechSegmentMetadata; // for speech
  words?: SpeechWords[]; // for speech
}

export type ExpandProps = {
  sentence: Sentence;
  mutate: () => Promise<Sentence[] | undefined>;
  updateToastMessage: (toastMessage: ToastMessage) => void;
}

type DetectedSelectors = {
  detectedDomain: string;
  detectedOwner: string;
  detectedProfileId: string;
  detectedSize: string;
}

type ModelOptions = {
  locale: string;
}

export type FileInformations = {
  source: string;
  target: string;
  groupId: any;
  selectors: object;
  xliffId: string;
  fileName: string;
  sysContentType: string;
  postEdited: boolean;
  resultId: string;
  status: string;
  detectedSelectors: DetectedSelectors;
  modelOptions?: ModelOptions;
  temporaryFiles?: {preProcessedFile: string}; // for speech
  isSpeech?: boolean; // for speech
  speechProvider?: string; // for speech
  transcriptionFormat?: string; // for speech
}


export type FileTranslation = {
  iTotalRecords: number;
  iTotalDisplayRecords: number;
  sentences: Sentence[]
};

export type OpenedModal = {
  modalType: 'createTM' | 'addToTM' | 'downloadTM' | 'downloadSpeechTrans'
  selectedSentences: Sentence[];
  fileInformations: FileInformations;
} |
  {
  modalType: 'downloadSpeechTrans';
  fileInformations: FileInformations;
}| undefined

export type PostEditorTableProps = {
  remoteHooksData: RemoteHooksData
  fileInformations: FileInformations
  setOpenedModal: Dispatch<SetStateAction<OpenedModal>>
  timeMedia: number;
  mediaPlayerRef: MutableRefObject<null | HTMLMediaElement>
}
