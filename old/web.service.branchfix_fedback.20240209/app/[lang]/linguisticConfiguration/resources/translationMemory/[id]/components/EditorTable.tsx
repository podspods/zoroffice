import { useContext, useMemo } from 'react';
import Table, {GridRowModel} from '@systran/react-components/lib/organisms/Table/Table';
import { useTranslation } from 'react-i18next';
import Toolbar, { Props as ToolbarProps } from './Toolbar';
import useColumns from './EditorColumns';
import {commonFetch} from '@/utils/fetcher';
import Apis from '@/utils/apis';
import { KeyedMutator } from 'swr';
import useModals from './useModals';
import {RefreshRate} from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import useRowActions from './useRowActions';
import { ToastMessageContext, UpdateToastMessage } from '@/components/contexts/ToastMessageContext';


export type Segment = {
  DT_RowId: string;
  id: string;
  source: string;
  target: {
    id: string;
    language: string;
    seg: string;
  };
};

export type FileInformations = {
  id: string;
  filename: string;
  sourceLanguage: string;
  sourceLanguageCode: string;
  targetLanguageCodes: string[];
  targetLanguages: string[];
};

export type EditorTableProps = {
  refreshInterval: RefreshRate;
  setRefreshInterval: (refreshInterval: RefreshRate) => void;
  isLoading: boolean;
  isValidating: boolean;
  fileSegmented: Segment[];
  mutate: KeyedMutator<Segment[]>;
  fileInformations: FileInformations;
  setTargetLanguage: (languages: string | null) => void;
  targetLanguage: string | null;
}

const updateSegment = async (newSegment: {corpusId: string, segment: Segment[]}, mutate: KeyedMutator<Segment[]>, updateToastMessage: UpdateToastMessage) => {
  try {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        segId: newSegment.segment[0].id,
        srcSegment: newSegment.segment[0].source,
        tgtSegment: newSegment.segment[0].target.seg,
        targetId: newSegment.segment[0].target.id
      })
    };
    const response = await commonFetch(Apis.corpus.segment.update({id: newSegment.corpusId}), options);
    if (response?.error) {
      throw new Error(response?.error);
    }
    else {
      updateToastMessage({
        label: 'Successful Edit',
        status: 'success'
      });
    }
  }
  finally {
    await mutate();
  }
};


export default function EditorTable({refreshInterval, setRefreshInterval, isLoading, isValidating, mutate, fileInformations, targetLanguage, setTargetLanguage, fileSegmented, ...props}: EditorTableProps) {
  const {t} = useTranslation();

  const {updateToastMessage} = useContext(ToastMessageContext);
  const [modal, setOpenedModal] = useModals({fileInformations, mutate, targetLanguage});
  const actions = useRowActions(setOpenedModal);
  const columns = useColumns(actions);

  const modifySegment = (newSegment: GridRowModel) => {
    const segmentUpdate = {
      corpusId: fileInformations.id,
      segment: [newSegment]
    } as {corpusId: string, segment: Segment[]};
    updateSegment(segmentUpdate, mutate, updateToastMessage).catch(() => {
      updateToastMessage({
        label: t('Unable to update segment correctly．'),
        status: 'error'
      });
    });
    return newSegment;
  };

  const slotProps = useMemo(() => (
    {
      toolbar: {
        fileInformations,
        isLoading,
        isValidating,
        refreshInterval,
        setRefreshInterval,
        actions,
        mutate,
        setOpenedModal,
        setTargetLanguage,
        targetLanguage
      } satisfies ToolbarProps
    }
  ), [
    isLoading,
    isValidating,
    refreshInterval,
    setRefreshInterval,
    actions,
    mutate
  ]);

  return (
    <>
      {modal}
      <Table
        {...props}
        editMode={'cell'}
        processRowUpdate={modifySegment}
        maxHeight={'60vh'}
        loading={isLoading}
        rows={fileSegmented}
        columns={columns as any}
        checkboxSelection
        pagination
        getRowHeight={() => 'auto'}
        pageSizeOptions={[10, 25, 50, 100]}
        slots={{toolbar: Toolbar}}
        slotProps={slotProps}
      />
    </>
  );
}

