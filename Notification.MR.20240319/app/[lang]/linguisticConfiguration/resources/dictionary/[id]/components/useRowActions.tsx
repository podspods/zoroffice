import { OpenedModal } from './useModals';
import { useMemo } from 'react';
import { DeleteAction } from '@/components/RowActions';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import { DictEntry } from './EditorTable';
import DownloadIcon from '@systran/react-components/lib/atoms/Icons/DownloadIcon';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import { isEmpty } from 'lodash';

export default function useRowActions(setOpenedModal: (openedModal: OpenedModal) => void) {
  return useMemo(() => [
    {
      ...DeleteAction,
      onClick: (selectedRows) => setOpenedModal({selectedRows, modalType: 'delete'})
    },
    {
      label: 'Duplicate',
      icon: <PlusIcon />,
      disable: (selectedRows) => (selectedRows.length !== 1),
      onClick: (selectedRows) => setOpenedModal({selectedRow: selectedRows[0], modalType: 'create'})
    }
  ] satisfies RowAction<DictEntry>[], [setOpenedModal]);
}
