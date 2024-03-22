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
import {PostEditorContext} from './context/PostEditorContext';
import {Theme, styled } from '@systran/react-components/lib/Theme';


const slots = {
  toolbar: Toolbar
};

export default function PostEditorTable({remoteHooksData, fileInformations, setOpenedModal, timeMedia, mediaPlayerRef}: PostEditorTableProps) {
  const {mutate, ...remainsRemoteHooksData} = remoteHooksData;
  const {updateToastMessage} = useContext(ToastMessageContext);
  const {mode} = useContext(PostEditorContext);

  const actions = useActions(mutate, setOpenedModal, fileInformations);
  const columns = useColumns(actions, mutate, updateToastMessage);

  const hideableFields = ['date', 'match'];
  if (mode === 'speech')
    hideableFields.push('time');
  const getTogglableColumns = () => {
    return hideableFields;
  };

  const modifySentence = (newSentence: GridRowModel, oldSentence: GridRowModel) => {
    if (newSentence.targetSentence !== oldSentence.targetSentence || newSentence.sourceSentence !== oldSentence.sourceSentence) {
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
      columnsPanel: {getTogglableColumns},
      toolbar: {
        fileInformations,
        setOpenedModal,
        actions
      } satisfies ToolbarProps
    }
  ), [
    setOpenedModal,
    actions
  ]);

  return (
    <CustomTable
      {...remainsRemoteHooksData}
      editMode={'row'}
      getDetailPanelContent={(params) => TMMatchExpand({sentence: params.row as Sentence, mutate, updateToastMessage}) as ReactNode}
      getDetailPanelHeight={() => 'auto'}
      processRowUpdate={modifySentence}
      maxHeight={'60vh'}
      getRowHeight={() => 'auto'}
      columns={columns as any}
      initialState={{
        columns: {
          columnVisibilityModel: {
            date: !(mode === 'speech'),
            time: (mode === 'speech')
          }
        }
      }}
      checkboxSelection
      pagination
      pageSizeOptions={[10, 25, 50, 100]}
      slots={slots}
      slotProps={slotProps}
      onRowClick={(params) => {
        if (mode === 'speech' && mediaPlayerRef.current) {
          mediaPlayerRef.current.currentTime = params.row.segmentMetaData.start;
        }
      }}
      getRowClassName={(params) => {
        if (mode === 'speech') {
          const isInTimeFrame = timeMedia >= params.row.segmentMetaData.start && timeMedia <= params.row.segmentMetaData.end;
          return isInTimeFrame ? 'SpeakingRow' : '';
        }
        return '';
      }}
    />
  );
}


const CustomTable = styled(Table)<{theme?: Theme}>`
  .SpeakingRow {
      background-color: ${({theme}) => theme.palette.primary.extraLight};
  }
`;
