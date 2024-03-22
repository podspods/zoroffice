import {useState} from 'react';
import {KeyedMutator} from 'swr';
import ModalListBody from '@systran/react-components/lib/atoms/ModalListBody';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import Typography from '@mui/material/Typography';
import {useTranslation} from 'react-i18next';
import {PostApi} from '../../components/PostApi';
import InstallBodyOptionsModal from '../components/InstallBodyOptionsModal';
import {TInstance} from './useActions';

export type OpenedModal = {
  modalType: 'INSTALL' | 'REINSTALL' | 'UNINSTALL' | undefined;
  selectedIntances: Array<TInstance>;
};

export default function useModals({mutate, id}: {id: string; mutate: KeyedMutator<TInstance[]>}) {
  const {t} = useTranslation();
  const [openedModal, setOpenedModal] = useState<OpenedModal>({modalType: undefined, selectedIntances: []});

  const onClose = () => setOpenedModal({modalType: undefined, selectedIntances: []});

  const onInstallFollowingNodes = async (options: string) => {
    const steps = openedModal.selectedIntances.map((node) => {
      const requestBody = {
        mode: 'ses',
        hostname: node.hostname,
        options: JSON.parse(options)
      };
      return PostApi.installFollowingNode(id, requestBody);
    });
    await Promise.all(steps);
    mutate();
  };
  const onUninstall = async () => {
    const steps = openedModal.selectedIntances.map(() => {
      return PostApi.uninstallFollowingNode(id);
    });
    await Promise.all(steps);
    mutate();
  };

  let modal: JSX.Element | null;
  switch (openedModal?.modalType) {
    case 'INSTALL':
      modal = <InstallBodyOptionsModal selectedIntances={openedModal.selectedIntances} onClose={onClose} onConfirm={onInstallFollowingNodes} />;
      break;
    case 'REINSTALL':
      modal = <InstallBodyOptionsModal selectedIntances={openedModal.selectedIntances} onClose={onClose} onConfirm={onInstallFollowingNodes} />;
      break;
    case 'UNINSTALL':
      modal = (
        <ConfirmModal width='large' title={t('Uninstall')} open onConfirm={onUninstall} onClose={onClose}>
          <Typography variant='h6' style={{marginBottom: '15px'}}>
            {t('Are you sure you want to uninstall from the following nodes?')}
          </Typography>
          <ModalListBody list={openedModal.selectedIntances.map((instance) => instance.hostname)} />
        </ConfirmModal>
      );
      break;
    default:
      modal = null;
  }

  return [modal, setOpenedModal] as const;
}
