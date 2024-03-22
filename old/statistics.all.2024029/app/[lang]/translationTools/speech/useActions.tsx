import type { OpenedModal } from '../file/useModals';
import { useMemo } from 'react';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import {TableFile} from '../UploadedFilesTable/UploadedFilesTable';
import DownloadIcon from '@systran/react-components/lib/atoms/Icons/DownloadIcon';
import EditIcon from '@systran/react-components/lib/atoms/Icons/EditIcon';
import CancelIcon from '@systran/react-components/lib/atoms/Icons/CancelIcon';
import DeleteIcon from '@systran/react-components/lib/atoms/Icons/DeleteIcon';
import {triggerDownload} from '@/utils/dowload';
import Apis from '@/utils/apis';
import {useTranslation} from 'react-i18next';

export default function useActions(setOpenedModal: (openedModal: OpenedModal) => void) {
  const {t} = useTranslation();
  return useMemo(() => [
    {
      label: 'Download Translation',
      icon: <DownloadIcon />,
      onClick: (selectedRows) => onDownload({mode: 'translation', files: selectedRows, errorMessage: t('Error downloading translations')}),
      disable: (selectedRows) => selectedRows.length === 0 || selectedRows.some(row => row.status !== 'translated')
    },
    {
      label: 'Download Transcript',
      icon: <DownloadIcon />,
      onClick: (selectedRows) => onDownload({mode: 'transcript', files: selectedRows, errorMessage: t('Error downloading transcripts')}),
      disable: (selectedRows) => selectedRows.length === 0 || selectedRows.some(row => row.status !== 'translated')
    },
    {
      label: 'Edit',
      icon: <EditIcon />,
      disable: (selectedRows) => selectedRows.length !== 1 || selectedRows[0].status !== 'translated',
      href: ([selectedRow]) => `speech/${selectedRow.id}`
    },
    {
      label: 'Cancel',
      icon: <CancelIcon />,
      onClick: (selectedRows) => setOpenedModal({selectedRows, modalType: 'cancel'}),
      disable: (selectedRows) => {
        return selectedRows.length === 0 || selectedRows.some(({status}) => {
          return status === undefined || ['translated', 'error', 'cancelled', 'cancelling', 'deleting'].includes(status)
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

const onDownload = async ({mode, files, errorMessage}: {
  mode: 'translation' | 'transcript',
  files: TableFile[],
  errorMessage: string
}) => {
  try {
    const response = await fetch(Apis.speechTranslation.download({mode, ids: files.map(file => file.id)}));
    await triggerDownload({response, filename: getFilename(response.headers)});
  }
  catch (error) {
    throw new Error(errorMessage);
  }
};

const getFilename = (headers: Headers) => {
  const iterator = headers.entries()
  let header = iterator.next()
  while (!header.done) {
    if (header.value[0] === 'content-disposition') {
      break;
    }
    header = iterator.next()
  }
  return header.value[1].match(/UTF-8''(.*)$/)[1]
}
