import { useContext, useMemo } from 'react';
import Table, {GridFilterModel, GridRowIdGetter, GridRowModel, GridValidRowModel} from '@systran/react-components/lib/organisms/Table/Table';
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


export type DictEntry = {
  comments: string;
  src: string;
  tgt: string;
  pos: string;
  confidence: number;
  srcId: string;
  tgtId: string;
  priority: number;
  srcVid: number;
  tgtVid: number;
  type: 'dnt' | 'translation';
  tgtInflection: string;
  srcInflection: string;
}

export type FileInformations = {
  id: string;
  accountId: string;
  name: string;
  srcLang: string;
  tgtLangs: string;
  multiTgtLangs?: boolean;
  type: 'UD';
  comments: string;
  targets?: string[];
};

export type EditorTableProps = {
  refreshInterval: RefreshRate;
  setRefreshInterval: (refreshInterval: RefreshRate) => void;
  isLoading: boolean;
  isValidating: boolean;
  fileDictEntries: DictEntry[];
  mutate: KeyedMutator<DictEntry[]>;
  fileInformations: FileInformations;
  setTargetLanguage: (languages: string | null) => void;
  targetLanguage: string | null;
  onFilterModelChange: (filterModel: GridFilterModel) => void;
}

const updateDictEntry = async (entryUpdate: {dict: {}, entry: DictEntry}, mutate: KeyedMutator<DictEntry[]>, updateToastMessage: UpdateToastMessage) => {
  try {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        dict: entryUpdate.dict,
        entry: {
          ...entryUpdate.entry,
          DT_RowId: 'entrylist_entry' + entryUpdate.entry.srcId + '_' + entryUpdate.entry.tgtId
        }
      })
    };
    const response = await commonFetch(Apis.dictionary.entry.update, options);
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

export const changeTranslationType = async (row: DictEntry, fileInformations: FileInformations, targetLanguage: string | null) => {
  const updatedType = row.type === 'dnt' ? 'translation' : 'dnt';
  const entryUpdate = {
    dict: {
      dictId: fileInformations.id,
      multiTgtLangs: fileInformations.multiTgtLangs ?? false,
      srcLang: fileInformations.srcLang,
      tgtLang: targetLanguage ?? fileInformations.tgtLangs.split(',')[0]
    },
    entry: {...row, type: updatedType}
  } as {dict: {}, entry: DictEntry};

  try {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        dict: entryUpdate.dict,
        entry: {
          ...entryUpdate.entry,
          DT_RowId: 'entrylist_entry' + entryUpdate.entry.srcId + '_' + entryUpdate.entry.tgtId
        }
      })
    };
    await commonFetch(Apis.dictionary.entry.update, options);
  }
  catch (error) {
    // eslint-disable-next-line
    console.error(error);
  }
};


export default function EditorTable({refreshInterval, setRefreshInterval, isLoading, isValidating, mutate, fileInformations, targetLanguage, setTargetLanguage, fileDictEntries, ...props}: EditorTableProps) {
  const {t} = useTranslation();

  const [modal, setOpenedModal] = useModals({fileInformations, mutate, targetLanguage});
  const actions = useRowActions(setOpenedModal);
  const {updateToastMessage} = useContext(ToastMessageContext);
  const columns = useColumns(actions, fileInformations, targetLanguage, mutate);

  function getRowId(row: GridRowModel<DictEntry>) {
    return row.srcId + row.tgtId;
  }

  const modifyDictEntry = (newDictEntry: GridRowModel<DictEntry>) => {
    const entryUpdate = {
      dict: {
        dictId: fileInformations.id,
        multiTgtLangs: fileInformations.multiTgtLangs ?? false,
        srcLang: fileInformations.srcLang,
        tgtLang: targetLanguage
      },
      entry: newDictEntry
    };
    updateDictEntry(entryUpdate, mutate, updateToastMessage).catch(() => {
      updateToastMessage({
        label: t('Unable to update DictEntry correctly．'),
        status: 'error'
      });
    });
    return newDictEntry;
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
    targetLanguage,
    actions,
    mutate
  ]);

  return (
    <>
      {modal}
      <Table
        {...props}
        editMode={'row'}
        processRowUpdate={modifyDictEntry as unknown as ((newRow: GridValidRowModel) => GridValidRowModel)}
        maxHeight={'60vh'}
        loading={isLoading}
        rows={fileDictEntries}
        columns={columns as any}
        checkboxSelection
        pagination
        getRowHeight={() => 'auto'}
        pageSizeOptions={[10, 25, 50, 100]}
        slots={{
          toolbar: Toolbar,
          headerFilterMenu: null
        }}
        slotProps={slotProps}
        getRowId={getRowId as GridRowIdGetter<GridValidRowModel>}
      />
    </>
  );
}

