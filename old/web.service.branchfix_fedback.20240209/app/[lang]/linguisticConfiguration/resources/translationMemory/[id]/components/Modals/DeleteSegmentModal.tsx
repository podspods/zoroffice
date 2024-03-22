import ConfirmModal, { ConfirmModalProps } from '@systran/react-components/lib/molecules/ConfirmModal';
import { styled } from '@systran/react-components/lib/Theme';
import { useTranslation } from 'react-i18next';

export default function DeleteSegmentsModal(props: Omit<ConfirmModalProps, 'title'>) {
  const {t} = useTranslation();
  const {...otherProps} = props;

  return (
    <ConfirmModal
      {...otherProps}
      primaryActionText={t('Delete')}
      title='Delete Segment'
    >
      <Description>{t('Are you sure you want to delete the selected segments ?')}</Description>
    </ConfirmModal>
  );
}

const Description = styled('div')`
  margin-bottom: 10px;
  flex-shrink: 0;
`;