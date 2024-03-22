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
  let tooltipTitle;
  let iconType: 'group' | 'single' | undefined;

  if (status && 'sharing' in status) {
    type = status.type;
    status = status.sharing;
  }

  if (status) {
    if (status.some(hasGroupPermission)) {
      iconType = 'group';
      tooltipTitle = t('shared with group(s)');
    }
    else if (status.some(hasUserPermission)) {
      iconType = 'group';
      tooltipTitle = t('shared with user(s)');
    }
    else if (type !== 'directory') {
      iconType = 'single';
      tooltipTitle = t('private');
    }

    return (
      <Tooltip title={tooltipTitle} placement={'bottom'} show>
        <div>
          <UserIcon type={iconType} />
        </div>
      </Tooltip>
    );
  }
  return '';
}
