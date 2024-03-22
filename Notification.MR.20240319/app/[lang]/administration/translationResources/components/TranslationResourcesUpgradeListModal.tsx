import {useTranslation} from 'react-i18next';
import Table, {GridColDef, GridRowId} from '@systran/react-components/lib/organisms/Table/Table';
import useGetUpgradeList from '../hook/useGetUpgradeList';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import {getDate, sortVersion} from '@systran/react-components/lib/atoms/TableHelper';
import {useState} from 'react';

type TProps = {api: string; title: string; onConfirm: any; onClose: any};

export default function TranslationResourcesUpgradeListModal({api, title, onConfirm, onClose}: TProps) {
  const {t} = useTranslation();
  const {data = []} = useGetUpgradeList({api});
  const [resourceSelected, setResourceSelected] = useState<GridRowId>();

  const columns: Array<GridColDef> = [
    {
      field: 'id',
      sortable: true,
      editable: false,
      headerName: t('ID'),
      minWidth: 280,
      renderCell: ({row}) => row.description.id || row.id
    },
    {
      field: 'name',
      sortable: true,
      editable: false,
      align: 'center',
      headerAlign: 'center',
      headerName: t('Name'),
      minWidth: 250,
      renderCell: ({row}) => row.description.name
    },
    {
      field: 'insertedAt',
      align: 'center',
      headerAlign: 'center',
      sortable: true,
      editable: false,
      headerName: t('Date'),
      renderCell: ({value}) => getDate(value)
    },
    {
      field: 'version',
      align: 'center',
      headerAlign: 'center',
      sortable: true,
      editable: false,
      headerName: t('Version'),
      renderCell: ({row}) => row.description.version,
      valueGetter: ({row}) => row.description.version,
      sortComparator: sortVersion
    }
  ];

  const onUpgradeResource = async () => {
    return onConfirm(resourceSelected);
  };

  return (
    <ConfirmModal width='extraLarge' title={title} open onConfirm={onUpgradeResource} onClose={onClose}>
      <Table
        initialState={{pagination: {paginationModel: {pageSize: 10, page: 0}}}}
        pageSizeOptions={[10, 25, 50, 100]}
        columns={columns}
        rows={data}
        onRowSelectionModelChange={(resources) => setResourceSelected(resources[0])}
      />
    </ConfirmModal>
  );
}
