import DeleteModal, { Props as DeleteModalProps } from '@/components/Modals/DeleteModal';

export type Props = Omit<DeleteModalProps, 'title' | 'description' | 'filenames'> & {
  selectedRows: {name: string}[]
};

export default function DeleteTranslationMemoryModal(props: Props) {
  const {selectedRows, ...otherProps} = props;

  return (
    <DeleteModal
      title={'Delete Corpus'}
      description={'Are you sure you want to delete the following resources?'}
      filenames={selectedRows.map(({name}) => name)}
      {...otherProps}
    />
  );
}
