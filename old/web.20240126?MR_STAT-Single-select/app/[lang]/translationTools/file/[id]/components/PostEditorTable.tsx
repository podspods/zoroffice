import { useContext, useMemo } from 'react';
import Table, {GridRowModel} from '@systran/react-components/lib/organisms/Table/Table';
import Toolbar, { PostEditorToolBarProps as ToolbarProps } from './Toolbar';
import useColumns from './PostEditorColumns';
import {PostEditorTableProps, Sentence} from './types';
import useModals from './useModals';
import {ToastMessageContext} from '@/components/contexts/ToastMessageContext';
import {FilePostEditorMessages} from './Messages';
import useActions from './useActions';
import saveSentences from './SaveSentences';


const slots = {
  toolbar: Toolbar
};

export default function PostEditorTable({remoteHooksData, fileInformations}: PostEditorTableProps) {
  const {mutate, loading, isValidating, refreshRate, setRefreshRate, ...remainsRemoteHooksData} = remoteHooksData;
  const {updateToastMessage} = useContext(ToastMessageContext);

  const [modal, setOpenedModal] = useModals();
  const actions = useActions(mutate, setOpenedModal, fileInformations);
  const columns = useColumns(actions);

  const modifySentence = (newSentence: GridRowModel) => {
    const sentencesModifications = {
      fileId: newSentence.fileId,
      sentences: [newSentence]
    } as {fileId: string, sentences: Sentence[]};
    saveSentences(sentencesModifications, mutate, updateToastMessage).catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      updateToastMessage({
        label: FilePostEditorMessages.error.editing,
        status: 'error'
      });
    });
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
    <>
      {modal}
      <Table
        {...remainsRemoteHooksData}
        editMode={'row'}
        processRowUpdate={modifySentence}
        maxHeight={'60vh'}
        loading={loading}
        columns={columns as any}
        checkboxSelection
        pagination
        pageSizeOptions={[10, 25, 50, 100]}
        slots={slots}
        slotProps={slotProps}
      />
    </>
  );
}
