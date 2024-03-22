import ModalListBody from '@systran/react-components/lib/atoms/ModalListBody';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import Typography from '@mui/material/Typography';
import {TTranslationResource} from './types';

type Props = {
  title: string;
  subTitle: string;
  onConfirm: () => void;
  selectedResources: TTranslationResource[];
  onClose: () => void;
};

function format(resource: TTranslationResource) {
  return `${resource.name} (${resource.id || resource.service})`;
}

export default function TranslationResourcesListBodyModal({onConfirm, title, subTitle, selectedResources, onClose}: Props) {
  return (
    <ConfirmModal width='large' title={title} open onConfirm={onConfirm} onClose={onClose}>
      {subTitle && (
        <Typography variant='h6' style={{marginBottom: '15px'}}>
          {subTitle}
        </Typography>
      )}
      <ModalListBody list={selectedResources.map((resource) => format(resource))} />
    </ConfirmModal>
  );
}
