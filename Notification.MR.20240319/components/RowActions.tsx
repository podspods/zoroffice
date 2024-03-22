import DownloadIcon from '@systran/react-components/lib/atoms/Icons/DownloadIcon';
import EditIcon from '@systran/react-components/lib/atoms/Icons/EditIcon';
import DeleteIcon from '@systran/react-components/lib/atoms/Icons/DeleteIcon';
import InfoIcon from '@systran/react-components/lib/atoms/Icons/InfoIcon';
import CompressIcon from '@systran/react-components/lib/atoms/Icons/CompressIcon';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import isEmpty from 'lodash/isEmpty';
import UserIcon from '@systran/react-components/lib/atoms/Icons/UserIcon';

export const DownloadAction = {
  label: 'Download',
  icon: <DownloadIcon />,
  disable: (selectedRows) => (selectedRows.length !== 1)
} satisfies Partial<RowAction<unknown>>;

export const EditAction = {
  label: 'Edit',
  icon: <EditIcon />
} satisfies Partial<RowAction<unknown>>;

export const RenameAction = {
  label: 'Rename',
  icon: <EditIcon type={'square'} />,
  disable: (selectedRows) => (selectedRows.length !== 1)
} satisfies Partial<RowAction<unknown>>;

export const DeleteAction = {
  label: 'Delete',
  icon: <DeleteIcon />,
  disable: isEmpty
} satisfies Partial<RowAction<unknown>>;

export const DetailsAction = {
  label: 'Details',
  icon: <InfoIcon shape={'simple'} />,
  disable: (selectedRows) => (selectedRows.length !== 1)
} satisfies Partial<RowAction<unknown>>;

export const MergeAction = {
  label: 'Merge',
  icon: <CompressIcon />
} satisfies Partial<RowAction<unknown>>;

export const UserPermissions = {
  label: 'User Permissions',
  icon: <UserIcon type={'single'} />,
  disable: (selectedRows) => selectedRows.length !== 1
} satisfies Partial<RowAction<unknown>>;


export const GroupPermissions = {
  label: 'Group Permissions',
  icon: <UserIcon type={'group'} />,
  disable: (selectedRows) => selectedRows.length !== 1
} satisfies Partial<RowAction<unknown>>;
