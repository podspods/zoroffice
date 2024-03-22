import RenameModal, { Props as RenameModalProps } from '@/components/Modals/RenameModal';

export type Props = Omit<RenameModalProps, 'title' | 'label'>;

export default function RenameTranslationMemoryModal(props: Props) {
  return (
    <RenameModal
      title={'Rename Translation Memory'}
      label={'Translation Memory Name'}
      {...props}
    />
  );
}
