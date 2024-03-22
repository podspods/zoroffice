import { TranslationMemory } from '../../lib/TranslationMemory';
import { cloneDeep } from 'lodash';
import { OpenedModal } from './useModals';
import { useMemo } from 'react';
import {
  DeleteAction,
  DetailsAction,
  DownloadAction,
  EditAction, MergeAction,
  RenameAction,
  UserPermissions,
  GroupPermissions
} from '@/components/RowActions';
import Link from 'next/link';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';

export function pickTargetLanguage(source: string | undefined, sourceLanguage?: string) {
  if (typeof source !== 'string') {
    throw new Error('No matching target language');
  }
  const targets = Array.isArray(sourceLanguage) ? cloneDeep(sourceLanguage) : [cloneDeep(sourceLanguage)];
  const pickedTarget = targets.find((tmTarget) => {
    return typeof tmTarget === 'string' && tmTarget.length >= source.length && tmTarget.slice(0, source.length).toLowerCase() === source.toLowerCase();
  });
  if (!pickedTarget) {
    throw new Error('No matching target language');
  }
  return pickedTarget;
}

export default function useRowActions(setOpenedModal: (openedModal: OpenedModal) => void) {
  return useMemo(() => [
    {
      ...DownloadAction,
      onClick: (selectedRows) => setOpenedModal({selectedRows, modalType: 'download'})
    },
    {
      ...EditAction,
      disable: (selectedRows) => (selectedRows.length !== 1 || selectedRows[0].status !== 'ok'),
      component: Link as any,
      href: (selectedRows) => `translationMemory/${selectedRows[0].id}`
    },
    {
      ...RenameAction,
      onClick: (selectedRows) => setOpenedModal({selectedRows, modalType: 'rename'})
    },
    {
      ...DeleteAction,
      onClick: (selectedRows) => setOpenedModal({selectedRows, modalType: 'delete'})
    },
    {
      ...DetailsAction,
      onClick: ([selectedRow]) => setOpenedModal({selectedRow, modalType: 'details'})
    },
    {
      ...MergeAction,
      disable(selectedRows) {
        if (selectedRows.length < 2) {
          return true;
        }
        const source = selectedRows[0].sourceLanguage && selectedRows[0].sourceLanguage.slice(0, 2);
        return selectedRows.some((row) => {
          try {
            pickTargetLanguage(source, row.sourceLanguage);
          }
          catch (exp) {
            return true;
          }
          return false;
        });
      },
      onClick: (selectedRows) => setOpenedModal({selectedRows, modalType: 'merge'})
    },
    {
      ...UserPermissions,
      onClick: (selectedRows) => setOpenedModal({modalType: 'usersPermissions', selectedRow: selectedRows[0]})
    },
    {
      ...GroupPermissions,
      onClick: (selectedRows) => setOpenedModal({modalType: 'groupsPermissions', selectedRow: selectedRows[0]})
    }
  ] satisfies RowAction<TranslationMemory>[], [setOpenedModal]);
}
