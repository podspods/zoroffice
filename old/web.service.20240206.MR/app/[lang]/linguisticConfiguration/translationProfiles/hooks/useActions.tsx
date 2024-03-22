import {Dispatch, SetStateAction, useMemo} from 'react';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import UserIcon from '@systran/react-components/lib/atoms/Icons/UserIcon';
import PlayIcon from '@systran/react-components/lib/atoms/Icons/PlayIcon';
import DeleteIcon from '@systran/react-components/lib/atoms/Icons/DeleteIcon';

import {Profile, TranslationProfilesTableDataProps, hasNoAccess, hasNoProfile} from '../components/TranslationProfilesTable';
import {getProfilesPermission} from '../components/TranslationProfilesContainer';
import {OpenedModal} from './useProfileModal';
import {RowAction} from '@systran/react-components/lib/organisms/RowAction/RowAction';

type TProps = {setOpenedModal: Dispatch<SetStateAction<OpenedModal>>; data: TranslationProfilesTableDataProps};

function hasDependentProfiles(row: Profile) {
  return Array.isArray(row?.profileOptions?.dependentProfiles) && row.profileOptions.dependentProfiles.length > 0;
}

export default function useActions({setOpenedModal, data}: TProps) {
  const {hasProfileSelfPermission, hasProfileSharedPermission, hasProfilePublicPermission} = getProfilesPermission();

  return useMemo(() => {
    const tableToolbar = [];
    if (data.coversPivot) {
      tableToolbar.push({
        label: 'Create Pivot',
        icon: <PlusIcon />,
        disable: function(entries: Array<Profile> = []) {
          return entries.length <= 1 || entries.some(hasNoProfile);
        },
        onClick: (entries: Profile[]) => setOpenedModal({modalType: 'ADD', selectedProfiles: entries})
      });
    }
    if (hasProfileSharedPermission || hasProfilePublicPermission) {
      tableToolbar.push({
        label: 'Manage Permissions',
        icon: <UserIcon type='group' />,
        disable: function(entries: Array<Profile> = []) {
          return entries.length !== 1 || hasNoAccess(entries[0], 'update');
        },
        onClick: (entries: Profile[]) => setOpenedModal({modalType: 'PERMISSIONS', selectedProfiles: entries})
      });
    }
    if (hasProfileSelfPermission || hasProfileSharedPermission || hasProfilePublicPermission) {
      tableToolbar.push(
        {
          label: 'Activate',
          icon: <PlayIcon />,
          disable: function(entries: Array<Profile> = []) {
            return (
              entries.length < 1 ||
              entries.every((row: Profile) => {
                return !row.deactivated || hasNoAccess(row, 'update');
              })
            );
          },
          onClick: (entries: Profile[]) => setOpenedModal({modalType: 'ACTIVATE', selectedProfiles: entries})
        },
        {
          label: 'Deactivate',
          icon: <PlayIcon paused />,
          disable: function(entries: Array<Profile> = []) {
            return (
              entries.length < 1 ||
              entries.every((row: Profile) => {
                return row.deactivated || hasNoAccess(row, 'update');
              })
            );
          },
          onClick: (entries: Profile[]) => setOpenedModal({modalType: 'DEACTIVATE', selectedProfiles: entries})
        },
        {
          label: 'Delete',
          icon: <DeleteIcon />,
          disable: function(entries: Array<Profile> = []) {
            return (
              entries.length < 1 ||
              entries.some((row: Profile) => {
                return hasNoAccess(row, 'delete');
              }) ||
              entries.some(hasDependentProfiles)
            );
          },
          onClick: (entries: Profile[]) => setOpenedModal({modalType: 'DELETE', selectedProfiles: entries})
        }
      );
    }
    return tableToolbar;
  }, [setOpenedModal, data]) satisfies RowAction<Profile>[];
}
