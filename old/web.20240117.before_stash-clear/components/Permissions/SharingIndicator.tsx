import { useTranslation } from 'react-i18next';
import UserIcon from '@systran/react-components/lib/atoms/Icons/UserIcon';
import TooltipCustom from '@systran/react-components/lib/atoms/TooltipCustom';

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
        <TooltipCustom title={t('shared with user(s)')} placement={'bottom'} show>
          <div>
            <UserIcon type={'group'} />
          </div>
        </TooltipCustom>
      );
    }
    if (type !== 'directory') {
      return (
        <TooltipCustom title={t('private')} placement={'bottom'} show>
          <div>
            <UserIcon type={'single'} />
          </div>
        </TooltipCustom>
      );
    }
  }
  return '';
}
