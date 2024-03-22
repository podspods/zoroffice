import { Corpus } from './Corpus';
import { OpenedModal } from './useModals';
import { useMemo } from 'react';
import {
  DeleteAction, DetailsAction, DownloadAction, EditAction, GroupPermissions, UserPermissions
} from '@/components/RowActions';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import Link from 'next/link';
import Apis from '@/utils/apis';
import DownloadIcon from '@systran/react-components/lib/atoms/Icons/DownloadIcon';

export default function useRowActions(setOpenedModal: (openedModal: OpenedModal) => void) {
  return useMemo(() => [
    {
      ...DownloadAction,
      disable: (selectedRows) => (selectedRows.length !== 1),
      component: 'a',
      href: (selectedRows) => Apis.dictionary.download(selectedRows[0])
    },
    {
      label: 'Append',
      icon: <DownloadIcon type={'upload'} />,
      disable: (selectedRows) => (selectedRows.length !== 1),
      onClick: ([selectedRow]) => setOpenedModal({modalType: 'append', selectedRow})
    },
    {
      ...DeleteAction,
      disable: (selectedRows) => !selectedRows.length,
      onClick: (selectedRows) => setOpenedModal({selectedRows, modalType: 'delete'})
    },
    {
      ...EditAction,
      disable: (selectedRows) => (selectedRows.length !== 1),
      component: Link as any,
      href: ([selectedRow]) => `dictionary/${selectedRow.id}`
    },
    {
      ...DetailsAction,
      disable: (selectedRows) => (selectedRows.length !== 1),
      onClick: ([selectedRow]) => setOpenedModal({selectedRow, modalType: 'details'})
    },
    {
      ...UserPermissions,
      onClick: ([selectedRow]) => setOpenedModal({modalType: 'usersPermissions', selectedRow})
    },
    {
      ...GroupPermissions,
      onClick: ([selectedRow]) => setOpenedModal({modalType: 'groupsPermissions', selectedRow})
    }
  ] satisfies RowAction<Corpus>[], [setOpenedModal]);
}
