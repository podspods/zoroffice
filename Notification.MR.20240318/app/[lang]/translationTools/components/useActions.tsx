import {FileInformations, OpenedModal, Sentence} from './types';
import {useContext, useMemo} from 'react';
import {ToastMessageContext} from '@/components/contexts/ToastMessageContext';
import {FilePostEditorMessages} from './Messages';
import CheckIcon from '@systran/react-components/lib/atoms/Icons/CheckIcon';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import DownloadIcon from '@systran/react-components/lib/atoms/Icons/DownloadIcon';
import {RowAction} from '@systran/react-components/lib/organisms/RowAction/RowAction';
import {validateSentences} from './SaveSentences';
import {ModePostEditorType, PostEditorContext} from './context/PostEditorContext';

export default function useActions(mutate: () => Promise<Sentence[] | undefined>, setOpenedModal: (openedModal: OpenedModal) => void, fileInformations: FileInformations) {

  const {updateToastMessage} = useContext(ToastMessageContext);
  const {mode} = useContext(PostEditorContext);

  const validateSentencesId = (selectedSentences: Sentence[]) => {
    const segmentsId = {
      segIds: selectedSentences.map((sentence) => {
        return sentence._id;
      })
    };
    validateSentences(segmentsId, mutate, updateToastMessage).catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      updateToastMessage({
        label: FilePostEditorMessages.error.validating,
        status: 'error'
      });
    });
  };

  const postEditorActions = [
    {
      label: 'Validate',
      icon: <CheckIcon />,
      disable: (selectedSentences) => {
        return selectedSentences.length === 0 || (selectedSentences.length === 1 && selectedSentences[0].status === 'Validated');
      },
      onClick: (selectedSentences) => {
        validateSentencesId(selectedSentences);
      }
    }
  ] satisfies RowAction<Sentence>[];

  const filePostEditorActions = (mode: ModePostEditorType) => {
    if (mode === 'file')
      return ([
        {
          label: 'Create a TM',
          icon: <PlusIcon />,
          disable: (selectedSentences) => {
            return selectedSentences.length === 0;
          },
          onClick: (selectedSentences) => {
            setOpenedModal({modalType: 'createTM', selectedSentences, fileInformations});
          }
        },
        {
          label: 'Add to TM',
          icon: <DownloadIcon type={'upload'} />,
          disable: (selectedSentences) => {
            return selectedSentences.length === 0;
          },
          onClick: (selectedSentences) => {
            setOpenedModal({modalType: 'addToTM', selectedSentences, fileInformations});
          }
        },
        {
          label: 'Download TM',
          icon: <DownloadIcon />,
          disable: (selectedSentences) => selectedSentences.length === 0,
          onClick: (selectedSentences) => {
            setOpenedModal({modalType: 'downloadTM', selectedSentences, fileInformations});
          }
        }
      ] satisfies RowAction<Sentence>[]);
    return [];
  };


  return useMemo(() => [...postEditorActions, ...filePostEditorActions(mode)], []);
}
