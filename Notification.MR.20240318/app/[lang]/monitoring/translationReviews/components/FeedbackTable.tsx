import {useMemo, useState} from 'react';
import {RefreshRate} from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import Table, {GridFeatureMode, GridFilterModel, GridPaginationModel, GridRowParams, GridSortModel, GridValidRowModel} from '@systran/react-components/lib/organisms/Table/Table';
import { PostApi } from './PostApis';
import DeleteFeedbackForm from './Modals/DeleteFeedbackForm';
import AddToUdModal from './Modals/AddToUdModal';
import AddToTmModal from '@/components/Modals/AddToTmModal';
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
    catch (error) {
      console.error('handleAppendToUD', error); // eslint-disable-line no-console
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
    catch (error) {
      console.error('handleAppendToTM', error); // eslint-disable-line no-console
    }
    finally {
      await mutate();
    }
  };

  const deleteFeedbacks = async (selectedFeedbacks: Feedback[]) => {
    try {
      await PostApi.deleteFeedbacks(selectedFeedbacks);
    }
    catch (error) {
      console.error('deleteFeedbacks', error); // eslint-disable-line no-console
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
        <AddToTmModal
          open
          onConfirm={handleAppendToTM}
          onClose={() => setOpenedModal(undefined)}
          languagePair={{source: openedModal.selectedFeedbacks[0].sourceLanguage, target: openedModal.selectedFeedbacks[0].targetLanguage}}
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
  const {mutate, loading, isValidating, refreshRate, setRefreshRate, ...remainsRemoteHooksData} = remoteHooksData;
  const [modal, setOpenedModal] = useFeedbackModals({mutate});
  const actions = useActions(setOpenedModal);
  const columns = useColumns(actions, hasAdminUserPermission);

  const slotProps = useMemo(() => (
    {
      toolbar: {
        isLoading: loading,
        isValidating,
        refreshInterval: refreshRate,
        setRefreshInterval: setRefreshRate,
        actions,
        mutate
      }
    }),
  [loading, isValidating, refreshRate, setRefreshRate, actions, mutate]
  );

  const expandComponent = useMemo(() => ({ row }: GridRowParams<Feedback>) => {
    return <ViewFeedbackDetails feedback={row} mutate={mutate} hideTitle displayStatus />;
  }, [mutate]);

  return (
    <>
      {modal}
      <Table
        {...remainsRemoteHooksData}
        loading={loading}
        columns={columns as any}
        checkboxSelection
        pagination
        getRowId={getRowId}
        unstable_headerFilters
        columnHeaderHeight={60}
        getDetailPanelContent={expandComponent as any}
        getDetailPanelHeight={() => 'auto'}
        slots={slots}
        slotProps={slotProps}
      />
    </>
  );
}

function getRowId(row: GridValidRowModel) {
  return row._id;
}