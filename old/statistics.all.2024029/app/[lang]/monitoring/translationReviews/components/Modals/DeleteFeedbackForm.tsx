import ModalListBody from '@systran/react-components/lib/atoms/ModalListBody';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import { useTranslation } from 'react-i18next';
import { Feedback } from '../FeedbackType';

type Props = {
  open: boolean;
  onConfirm: (selectedFeedbacks: Feedback[]) => Promise<void>;
  onClose: () => void;
  selectedFeedbacks: Feedback[];
}

export default function DeleteFeedbackForm({open, onClose, onConfirm, selectedFeedbacks}: Props) {
  const {t} = useTranslation();

  const formatLicenseList = selectedFeedbacks?.map(
    (feedback) => (feedback._id)
  );

  return (
    <ConfirmModal
      open={open}
      title={t('Delete feedbacks')}
      width='large'
      onConfirm={() => onConfirm(selectedFeedbacks)}
      onClose={onClose}
    >
      <ModalListBody
        list={formatLicenseList}
        description={t('Are you sure you want to delete the following feedbacks ?')}
      />
    </ConfirmModal>
  );
}
