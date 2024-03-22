import RenameModal, { Props as RenameModalProps } from '@/components/Modals/RenameModal';
import { useTranslation } from 'react-i18next';

export type Props = Omit<RenameModalProps, 'title' | 'label'>;

export default function RenameTranslationMemoryModal(props: Props) {
  const { t } = useTranslation();

  return (
    <RenameModal
      title={'Rename Translation Memory'}
      label={t('Translation Memory Name')}
      {...props}
    />
  );
}
