import type { OpenedModal } from './useModals';
import { useMemo } from 'react';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import {TableFile} from './UploadedFilesTable';
import DownloadIcon from '@systran/react-components/lib/atoms/Icons/DownloadIcon';
import EditIcon from '@systran/react-components/lib/atoms/Icons/EditIcon';
import CancelIcon from '@systran/react-components/lib/atoms/Icons/CancelIcon';
import DeleteIcon from '@systran/react-components/lib/atoms/Icons/DeleteIcon';

export default function useActions(setOpenedModal: (openedModal: OpenedModal) => void) {

  return useMemo(() => [
    {
      label: 'Download',
      icon: <DownloadIcon />,
      onClick: (selectedRows) => setOpenedModal({selectedRows, modalType: 'download'}),
      disable: (selectedRows) => selectedRows.length === 0 || selectedRows.some(row => row.status !== 'translated')
    },
    {
      label: 'Edit',
      icon: <EditIcon />,
      disable: (selectedRows) => selectedRows.length !== 1 || selectedRows[0].status !== 'translated',
      href: (selectedRows) => `/translationTools/file/${selectedRows[0].id}`
    },
    {
      label: 'Cancel',
      icon: <CancelIcon />,
      onClick: (selectedRows) => setOpenedModal({selectedRows, modalType: 'cancel'}),
      disable: (selectedRows) => {
        return selectedRows.length === 0 || selectedRows.some(({status}) => {
          return status === 'translated' ||
            status === 'error' ||
            status === 'cancelled' ||
            status === 'cancelling' ||
            status === 'deleting';
        });
      }
    },
    {
      label: 'Delete',
      icon: <DeleteIcon />,
      onClick: (selectedRows) => setOpenedModal({selectedRows, modalType: 'delete'}),
      disable: (selectedRows) => {
        return selectedRows.length === 0 || selectedRows.some(({status}) => status === 'cancelling' || status === 'deleting');
      }
    }
  ] satisfies RowAction<TableFile>[], [setOpenedModal]);
}
