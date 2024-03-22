import {useMemo, useState} from 'react';
import {Box} from '@mui/material';
import Table, {GridCell, GridCellProps} from '@systran/react-components/lib/organisms/Table/Table';
import {RefreshRate} from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import {GridFeatureMode, GridFilterModel, GridPaginationModel, GridRowParams, GridSortModel, GridValidRowModel} from '@mui/x-data-grid-pro';
import { PostApi } from './PostApis';
import DeleteFeedbackForm from './Modals/DeleteFeedbackForm';
import AddToUdModal from './Modals/AddToUdModal';
import TmList from './Modals/TmList';
import ViewFeedbackDetails from './ViewFeedbackDetails';
import useColumns from './useColumns';
import useActions from './useRowActions';
import {pickTargetLanguage} from '../../../linguisticConfiguration/resources/translationMemory/components/TranslationMemoryListTable/useRowActions';
import Toolbar from './Toolbar';
import {AddToUD, AppendTmPayloads, Data, Dict, Feedback, PayloadsEntry, Tm} from './FeedbackType';

export type RemoteHooksData = {
  loading: boolean,
  isLoading?: boolean,
  isValidating: boolean,
  mutate: () => Promise<unknown>;
  sortingMode: GridFeatureMode,
  filterMode: GridFeatureMode,
  paginationMode: GridFeatureMode,
  onPaginationModelChange: (model: GridPaginationModel) => void;
  onSortModelChange: (sortModel: GridSortModel) => void;
  onFilterModelChange: (filterModel: GridFilterModel) => void;
  rows: Feedback[],
  rowCount: number,
  paginationModel: GridPaginationModel,
  refreshRate: RefreshRate,
  setRefreshRate: (refreshInterval: RefreshRate) => void;
}

export type Props = {
  remoteHooksData: RemoteHooksData,
  hasAdminUserPermission: boolean,
}

export type OpenedModal = {
  modalType: 'AppendToUD' | 'AppendToTM' | 'delete'
  selectedFeedbacks: Feedback[],
} | undefined;

function useFeedbackModals({mutate}: {mutate: () => Promise<unknown>}) {
  const [openedModal, setOpenedModal] = useState<OpenedModal>();

  const handleAppendToUD = async (data: Data) => {
    const feedbacks = openedModal?.selectedFeedbacks ?? [];
    const {dictId, ownerId, srcLang, tgtLangs} = data.dict;
    try {
      const appendPayloads = feedbacks.map((feedback) => {
        const {targetLanguage, source, target, suggestedTranslation} = feedback;
        const p: {dict: Dict, entry: PayloadsEntry} = {
          dict: {
            dictId,
            srcLang,
            tgtLang: pickTargetLanguage(targetLanguage, tgtLangs)
          },
          entry: {
            src: source,
            srcPos: data.pos,
            tgtPos: data.pos,
            priority: data.priority,
            comments: data.comments
          }
        };
        if (data.dnt) {
          p.entry.type = 'dnt';
        }
        else {
          p.entry.tgt = suggestedTranslation || target;
        }
        return p;
      });
      const updatePayloads = feedbacks.map((feedback) => {
        const {_id, source, target, suggestedTranslation} = feedback;
        const p: { id: string; payload: { addToUD: AddToUD } } = {
          id: _id,
          payload: {
            addToUD: {
              ownerId,
              dictId,
              source
            }
          }
        };
        if (data.dnt) {
          p.payload.addToUD.type = 'dnt';
        }
        else {
          p.payload.addToUD.target = suggestedTranslation || target;
        }
        return p;
      });

      await PostApi.addAllToUD(appendPayloads);
      await PostApi.updateFeedbacks(updatePayloads);

    }
    finally {
      await mutate();
    }
  };

  const handleAppendToTM = async (tm: Tm) => {
    const { id, sourceLanguage, targetLanguages } = tm;
    const feedbacks = openedModal?.selectedFeedbacks ?? [];

    try {
      const appendTmPayloads: AppendTmPayloads[] = feedbacks.map((feedback) => {
        const {targetLanguage, source, target, suggestedTranslation} = feedback;
        return {
          corpusId: id,
          sourceLanguage,
          targetLanguage: pickTargetLanguage(targetLanguage, targetLanguages),
          sourceSentence: source,
          targetSentence: suggestedTranslation || target
        };
      });
      const updatePayloads = feedbacks.map((feedback) => {
        const {_id, source, target, suggestedTranslation} = feedback;
        return {
          id: _id,
          payload: {
            addToTM: {
              corpusId: id,
              sourceSentence: source,
              targetSentence: suggestedTranslation || target
            }
          }
        };
      });
      await PostApi.addAllToTM(appendTmPayloads);
      await PostApi.updateFeedbacks(updatePayloads);
    }
    finally {
      await mutate();
    }
  };

  const deleteFeedbacks = async (selectedFeedbacks: Feedback[]) => {
    try {
      await PostApi.deleteFeedbacks(selectedFeedbacks);
    }
    finally {
      await mutate();
    }
  };

  let modal: JSX.Element | null;

  switch (openedModal?.modalType) {
    case 'delete':
      modal = (
        <DeleteFeedbackForm
          open
          selectedFeedbacks={openedModal.selectedFeedbacks}
          onConfirm={deleteFeedbacks}
          onClose={() => setOpenedModal(undefined)}
        />
      );
      break;
    case 'AppendToUD':
      modal = (
        <AddToUdModal
          open
          onConfirm={handleAppendToUD}
          onClose={() => setOpenedModal(undefined)}
        />
      );
      break;
    case 'AppendToTM':
      modal = (
        <TmList
          open
          onConfirm={handleAppendToTM}
          onClose={() => setOpenedModal(undefined)}
        />
      );
      break;
    default:
      modal = null;
  }

  return [modal, setOpenedModal] as const;
}

const slots = {
  headerFilterMenu: null,
  toolbar: Toolbar
};

export default function MonitoringTranslationReviews({remoteHooksData, hasAdminUserPermission}: Props) {
  const {mutate, isLoading, isValidating, refreshRate, setRefreshRate, ...remainsRemoteHooksData} = remoteHooksData;
  const [modal, setOpenedModal] = useFeedbackModals({mutate});
  const actions = useActions(setOpenedModal);
  const columns = useColumns(actions, hasAdminUserPermission);

  const slotProps = useMemo(() => (
    {
      toolbar: {
        isLoading,
        isValidating,
        refreshInterval: refreshRate,
        setRefreshInterval: setRefreshRate,
        actions,
        mutate
      }
    }),
  [isLoading, isValidating, refreshRate, setRefreshRate, actions, mutate]
  );

  const expandComponent = useMemo(() => ({ row }: GridRowParams<Feedback>) => {
    return <ViewFeedbackDetails feedback={row} mutate={mutate} hideTitle displayStatus />;
  }, [mutate]);

  return (
    <Box sx={{width: '100%', padding: '2rem'}}>
      {modal}
      <Table
        {...remainsRemoteHooksData}
        columns={columns as any}
        checkboxSelection
        pagination
        getRowId={getRowId}
        unstable_headerFilters
        columnHeaderHeight={60}
        getDetailPanelContent={expandComponent as any}
        slots={slots}
        slotProps={slotProps}
      />
    </Box>
  );
}

function getRowId(row: GridValidRowModel) {
  return row._id;
}
