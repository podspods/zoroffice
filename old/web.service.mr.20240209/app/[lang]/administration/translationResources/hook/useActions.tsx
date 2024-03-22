import {Dispatch, SetStateAction, useMemo} from 'react';
import {OpenedModal} from './useModals';
import startsWith from 'lodash/startsWith';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import PlayIcon from '@systran/react-components/lib/atoms/Icons/PlayIcon';
import PauseIcon from '@systran/react-components/lib/atoms/Icons/PauseIcon';
import DeleteIcon from '@systran/react-components/lib/atoms/Icons/DeleteIcon';
import ChevronIcon from '@systran/react-components/lib/atoms/Icons/ChevronIcon';
import {RowAction} from '@systran/react-components/lib/organisms/RowAction/RowAction';
import {TTranslationResource} from '../components/types';

export default function useGetTableToolbar(setOpenedModal: Dispatch<SetStateAction<OpenedModal>>) {
  return useMemo(
    () => [
      {
        label: 'Create profile',
        icon: <PlusIcon />,
        disable: function(entries) {
          return Boolean(entries.length !== 1 || !startsWith(entries[0].service, 'Translate') || entries[0].profileId);
        },
        onClick: (entries) => setOpenedModal({modalType: 'CREATE_PROFILE', selectedResources: entries})
      },
      {
        label: 'Add route',
        icon: <PlusIcon />,
        disable: function(entries) {
          return Boolean(entries.length !== 1 || !entries[0].runnable || entries[0].noSelectors || startsWith(entries[0].service, 'Translate') || entries[0].internal);
        },
        onClick: (entries) => setOpenedModal({modalType: 'ADD_ROUTE', selectedResources: entries})
      },
      {
        label: 'Activate all',
        icon: <PlayIcon />,
        disable: function(entries) {
          return entries.length === 0 || entries.every((e) => !e.routes || !e.routes.length);
        },
        onClick: (entries) => setOpenedModal({modalType: 'ACTIVE_ALL', selectedResources: entries})
      },
      {
        label: 'Deactivate all',
        icon: <PauseIcon />,
        disable: function(entries) {
          return entries.length === 0 || entries.every((e) => !e.routes || !e.routes.length);
        },
        onClick: (entries) => setOpenedModal({modalType: 'DEACTIVE_ALL', selectedResources: entries})
      },
      {
        label: 'Upgrade',
        icon: <ChevronIcon direction='up' />,
        disable: function(entries) {
          return isDisableToUpgrade(entries);
        },
        onClick: (entries) => setOpenedModal({modalType: 'UPGRADE', selectedResources: entries})
      },
      {
        label: 'Downgrade',
        icon: <ChevronIcon direction='down' />,
        disable: function(entries) {
          return isDisableToDowngrade(entries);
        },
        onClick: (entries) => setOpenedModal({modalType: 'DOWNGRADE', selectedResources: entries})
      },
      {
        label: 'Uninstall',
        icon: <DeleteIcon />,
        disable: function(entries) {
          return entries.length === 0 || (!entries[0].profiles && isNotInstalled(entries));
        },
        onClick: (entries) => setOpenedModal({modalType: 'UNINSTALL', selectedResources: entries})
      }
    ] satisfies RowAction<TTranslationResource>[],
    [setOpenedModal]
  );
}

function isDisableToUpgrade(entries: TTranslationResource[]): boolean {
  const hasInvalidStatus = entries.some((e) => e.status !== 'running' && e.status !== 'installed' && e.status !== 'not installed');
  const hasNonUpgradeable = entries.some((e) => !e.upgradeable);
  const hasInvalidDefaultUpgradeTr = entries.some((e) => !e.defaultUpgradeTr || !e.defaultUpgradeTr.id);

  return entries.length === 0 || hasInvalidStatus || hasNonUpgradeable || hasInvalidDefaultUpgradeTr;
}
function isDisableToDowngrade(entries: TTranslationResource[]): boolean {
  const hasInvalidStatus = entries.some((e) => e.status !== 'running' && e.status !== 'installed');
  return entries.length !== 1 || !entries[0].downgradeable || !entries[0].master || hasInvalidStatus;
}
function isNotInstalled(entries: TTranslationResource[]) {
  return !Array.isArray(entries[0].computingNodes) || entries[0].computingNodes.length === 0;
}
