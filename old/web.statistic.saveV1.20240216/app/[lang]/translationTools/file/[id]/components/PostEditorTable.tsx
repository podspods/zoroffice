import {ReactNode, useContext, useMemo} from 'react';
import Table, {
  GridRowModel
} from '@systran/react-components/lib/organisms/Table/Table';
import Toolbar, { PostEditorToolBarProps as ToolbarProps } from './Toolbar';
import useColumns from './PostEditorColumns';
import {PostEditorTableProps, Sentence} from './types';
import {ToastMessageContext} from '@/components/contexts/ToastMessageContext';
import {FilePostEditorMessages} from './Messages';
import useActions from './useActions';
import saveSentences from './SaveSentences';
import TMMatchExpand from './TMMatchExpand';


const slots = {
  toolbar: Toolbar
};

export default function PostEditorTable({remoteHooksData, fileInformations, setOpenedModal}: PostEditorTableProps) {
  const {mutate, loading, isValidating, refreshRate, setRefreshRate, ...remainsRemoteHooksData} = remoteHooksData;
  const {updateToastMessage} = useContext(ToastMessageContext);

  const actions = useActions(mutate, setOpenedModal, fileInformations);
  const columns = useColumns(actions);

  const modifySentence = (newSentence: GridRowModel, oldSentence: GridRowModel) => {
    if (newSentence.targetSentence !== oldSentence.targetSentence) {
      const sentencesModifications = {
        fileId: newSentence.fileId,
        sentences: [newSentence]
      } as { fileId: string, sentences: Sentence[] };
      saveSentences(sentencesModifications, mutate, updateToastMessage).catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
        updateToastMessage({
          label: FilePostEditorMessages.error.editing,
          status: 'error'
        });
      });
    }
    return newSentence;
  };

  const slotProps = useMemo(() => (
    {
      toolbar: {
        fileInformations,
        loading,
        isValidating,
        refreshRate,
        setRefreshRate,
        actions,
        mutate
      } satisfies ToolbarProps
    }
  ), [
    loading,
    isValidating,
    refreshRate,
    setRefreshRate,
    actions,
    mutate
  ]);

  return (
    <Table
      {...remainsRemoteHooksData}
      editMode={'row'}
      getDetailPanelContent={(params) => TMMatchExpand({sentence: params.row as Sentence, mutate, updateToastMessage}) as ReactNode}
      getDetailPanelHeight={() => 'auto'}
      processRowUpdate={modifySentence}
      maxHeight={'60vh'}
      loading={loading}
      getRowHeight={() => 'auto'}
      columns={columns as any}
      checkboxSelection
      pagination
      pageSizeOptions={[10, 25, 50, 100]}
      slots={slots}
      slotProps={slotProps}
    />
  );
}
