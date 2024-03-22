import {useMemo} from 'react';
import {OpenedModal} from './useModals';
import {RowAction} from '@systran/react-components/lib/organisms/RowAction/RowAction';

export type TInstance = {hostname: string; id: string; status: string};

const isInstalled = (entries: TInstance[]) => entries.length === 0 || entries.some((e) => !['installed', 'downloaded', 'installing dependencies', 'running'].includes(e.status));

export default function useActions(setOpenedModal: (openedModal: OpenedModal) => void) {
  return useMemo(
    () => [
      {
        label: 'Install',
        disable: (entries) => !entries.length || entries.some((e) => ['installed', 'installing dependencies', 'running'].includes(e.status)),
        onClick: (entries) => {
          setOpenedModal({selectedIntances: entries, modalType: 'INSTALL'});
        }
      },
      {
        label: 'Reinstall',
        disable: isInstalled,
        onClick: (entries) => {
          setOpenedModal({selectedIntances: entries, modalType: 'REINSTALL'});
        }
      },
      {
        label: 'Uninstall',
        disable: isInstalled,
        onClick: (entries) => {
          setOpenedModal({selectedIntances: entries, modalType: 'UNINSTALL'});
        }
      }
    ] satisfies RowAction<TInstance>[],
    [setOpenedModal]
  );
}
