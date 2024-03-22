import InformativeModal from '@systran/react-components/lib/molecules/InformativeModal';
import PermissionsResources from './PermissionsResources';
import { useTranslation } from 'react-i18next';

export type Props = {
  open: boolean
  type: 'users' | 'groups'
  resourceId: string
  onClose: () => void
}

export default function PermissionsResourcesModal({open, type, resourceId, onClose}: Props) {
  const { t } = useTranslation();

  return (
    <InformativeModal
      open={open}
      title={type === 'users' ? t('User Permission Settings') : t('Group Permission Settings')}
      onClose={onClose}
      width={'large'}
    >
      <PermissionsResources type={type} resourceId={resourceId} />
    </InformativeModal>
  );
}
