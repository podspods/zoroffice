import { cloneDeep } from 'lodash';
import { OpenedModal } from './useModals';
import { useMemo } from 'react';
import { DeleteAction } from '@/components/RowActions';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import { Segment } from './EditorTable';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import isEmpty from 'lodash/isEmpty';


export default function useRowActions(setOpenedModal: (openedModal: OpenedModal) => void) {
  return useMemo(() => [
    {
      ...DeleteAction,
      onClick: (selectedRows) => setOpenedModal({selectedRows, modalType: 'delete'})
    },
    {
      label: 'Duplicate',
      icon: <PlusIcon />,
      disable: isEmpty,
      onClick: (selectedRows) => setOpenedModal({selectedRows, modalType: 'create'})
    }
  ] satisfies RowAction<Segment>[], [setOpenedModal]);
}
