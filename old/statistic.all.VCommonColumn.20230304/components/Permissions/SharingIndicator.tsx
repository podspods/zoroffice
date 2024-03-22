import { useTranslation } from 'react-i18next';
import UserIcon from '@systran/react-components/lib/atoms/Icons/UserIcon';
import Tooltip from '@systran/react-components/lib/atoms/Tooltip';

export type GroupSharingStatus = {
  groupId?: string,
  accountId?: string,
  permission?: 'read' | 'write' | 'disable'
}

function hasGroupPermission({permission, groupId}: GroupSharingStatus) {
  return (permission !== 'disable') && groupId;
}

function hasUserPermission({permission, accountId}: GroupSharingStatus) {
  return (permission !== 'disable') && accountId;
}

export type Sharing = GroupSharingStatus[] | {sharing: GroupSharingStatus[], type: string}

export type Props = {
  status: Sharing
}

export default function SharingIndicator({status}: Props) {
  const { t } = useTranslation();

  let type;
  if (status && 'sharing' in status) {
    type = status.type;
    status = status.sharing;
  }

  if (status) {
    if (status.some(hasGroupPermission) || status.some(hasUserPermission)) {
      return (
        <Tooltip title={t('shared with user(s)')} placement={'bottom'} show>
          <div>
            <UserIcon type={'group'} />
          </div>
        </Tooltip>
      );
    }
    if (type !== 'directory') {
      return (
        <Tooltip title={t('private')} placement={'bottom'} show>
          <div>
            <UserIcon type={'single'} />
          </div>
        </Tooltip>
      );
    }
  }
  return '';
}
