import {useMemo} from 'react';
import {GridColDef} from '@systran/react-components/lib/organisms/Table/Table';
import {useTranslation} from 'react-i18next';
import {getStatusBadge} from '../../hook/useColumns';
import {TInstance} from './useActions';
import {RowAction} from '@systran/react-components/lib/organisms/RowAction/RowAction';
import {actionColumn} from '@/components/Columns';

export default function useColumns(runnable: boolean, actions: RowAction<TInstance>[]) {
  const {t} = useTranslation();

  return useMemo(() => {
    const columns: Array<GridColDef> = [
      {
        field: 'status',
        sortable: true,
        editable: false,
        headerName: t('Status'),
        align: 'center',
        minWidth: 100,
        renderCell: ({value, row}) => getStatusBadge(value, row, t, row.hostname),
        flex: 1
      },
      {
        field: 'hostname',
        sortable: true,
        editable: false,
        minWidth: 200,
        headerName: t('Hostname'),
        flex: 1
      }
    ];

    if (runnable) {
      columns.push(
        {
          field: 'nbInstances',
          sortable: true,
          editable: false,
          headerName: t('Number of instances'),
          flex: 1
        },
        {
          field: 'nbInstancesRequested',
          sortable: true,
          editable: false,
          headerName: t('Instances Requested'),
          flex: 1
        }
      );
    }
    columns.push(actionColumn({t, actions}));
    return columns;
  }, [runnable, actions]);
}
