import InformativeModal from '@systran/react-components/lib/molecules/InformativeModal';
import PermissionsResourcesTable from './PermissionsResourcesTable';
import { useTranslation } from 'react-i18next';

export type Props = {
  open?: boolean
  resourceType: 'TM' | 'UD' | 'NORM'
  entityType: 'users' | 'groups'
  resourceId: string
  onClose: () => void
}

export default function PermissionsResourcesModal({open = true, resourceType, entityType, resourceId, onClose}: Props) {
  const { t } = useTranslation();

  return (
    <InformativeModal
      open={open}
      title={entityType === 'users' ? t('User Permission Settings') : t('Group Permission Settings')}
      onClose={onClose}
      width={'large'}
    >
      <PermissionsResourcesTable
        resourceType={resourceType}
        entityType={entityType}
        resourceId={resourceId}
      />
    </InformativeModal>
  );
}
