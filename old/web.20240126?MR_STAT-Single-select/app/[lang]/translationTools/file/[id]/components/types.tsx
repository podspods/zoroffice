import {RefreshRate} from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import {
  GridFeatureMode,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel
} from '@systran/react-components/lib/organisms/Table/Table';

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

type TmSentenceObject = {
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
}


export type FileTranslation = {
  iTotalRecords: number;
  iTotalDisplayRecords: number;
  sentences: Sentence[]
};

export type OpenedModal = {
  modalType: 'createTM' | 'addToTM' | 'downloadTM'
  selectedSentences: Sentence[];
  fileInformations: FileInformations;
} | undefined

export type PostEditorTableProps = {
  remoteHooksData: RemoteHooksData
  fileInformations: FileInformations
}
