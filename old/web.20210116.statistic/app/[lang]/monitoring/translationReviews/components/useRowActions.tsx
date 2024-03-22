import {useMemo} from 'react';
import {Feedback} from './FeedbackType';
import {OpenedModal} from './FeedbackTable';
import DownloadIcon from '@systran/react-components/lib/atoms/Icons/DownloadIcon';
import DeleteIcon from '@systran/react-components/lib/atoms/Icons/DeleteIcon';
import EditIcon from '@systran/react-components/lib/atoms/Icons/EditIcon';
import {RowAction} from '@systran/react-components/lib/organisms/RowAction/RowAction';

const checkIsDisableButton = (selectedFeedbacks: Feedback[]) => {
  return selectedFeedbacks.length === 0 || selectedFeedbacks.some((feedback) => feedback.sourceLanguage !== selectedFeedbacks[0].sourceLanguage) || selectedFeedbacks.some((feedback) => feedback.targetLanguage !== selectedFeedbacks[0].targetLanguage);
};

export default function useActions(setOpenedModal: (openedModal: OpenedModal) => void) {
  return useMemo(() => [
    {
      label: 'Edit',
      icon: <EditIcon />,
      disable: selectedFeedbacks => selectedFeedbacks.length !== 1,
      onClick: selectedFeedbacks => {
        if (selectedFeedbacks[0]?._id) {
          const redirectUrl = window.location.origin + '/monitoring/translationReviews/' + selectedFeedbacks[0]?._id;
          window.open(redirectUrl, '_blank', 'noreferrer');
        }
      }
    },
    {
      label: 'Append to TM',
      icon: <DownloadIcon type='upload' />,
      disable: selectedFeedbacks => checkIsDisableButton(selectedFeedbacks),
      onClick: selectedFeedbacks => setOpenedModal({modalType: 'AppendToTM', selectedFeedbacks})
    },
    {
      label: 'Append to UD',
      icon: <DownloadIcon type='upload' />,
      disable: selectedFeedbacks => checkIsDisableButton(selectedFeedbacks),
      onClick: selectedFeedbacks => setOpenedModal({modalType: 'AppendToUD', selectedFeedbacks})
    },
    {
      label: 'Delete',
      icon: <DeleteIcon />,
      disable: selectedFeedbacks => selectedFeedbacks?.length === 0,
      onClick: selectedFeedbacks => setOpenedModal({modalType: 'delete', selectedFeedbacks})
    }
  ] satisfies RowAction<Feedback>[], [setOpenedModal]);
}
