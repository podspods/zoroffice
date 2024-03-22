import ConfirmModal, { ConfirmModalProps, ConfirmModalRef } from '@systran/react-components/lib/molecules/ConfirmModal';
import { styled } from '@systran/react-components/lib/Theme';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';

type DeleteEntryModalProps = Omit<ConfirmModalProps, 'title' | 'primaryActionText'>;

export default function DeleteEntryModal(props: DeleteEntryModalProps) {
  const {t} = useTranslation();
  const confirmModalRef = useRef<ConfirmModalRef>(null);

  return (
    <ConfirmModal
      {...props}
      primaryActionText={t('Delete')}
      title='Delete Entries'
      ref={confirmModalRef}
    >
      <Description>{t('Are you sure you want to delete the selected entries ?')}</Description>
    </ConfirmModal>
  );
}

const Description = styled('div')`
  margin-bottom: 10px;
  flex-shrink: 0;
`;
