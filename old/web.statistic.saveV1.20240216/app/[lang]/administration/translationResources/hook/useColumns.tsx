import {useTranslation} from 'react-i18next';
import {GridColDef} from '@mui/x-data-grid-pro';
import {TTranslationResource} from '../components/types';
import useGetOptionsForFiltering from './useGetOptionsForFiltering';
import StatusBadge from '@systran/react-components/lib/atoms/StatusBadge';
import DangerIcon from '@systran/react-components/lib/atoms/Icons/DangerIcon';
import {TFunction} from 'i18next';
import {useContext, useMemo} from 'react';
import {TranslationResourcesContext} from '../context/TranslationResourcesContext';
import {LinkInternal} from '@systran/react-components/lib/atoms/Link';
import ChevronIcon from '@systran/react-components/lib/atoms/Icons/ChevronIcon';
import Tooltip from '@systran/react-components/lib/atoms/Tooltip';
import InternalRoutes from '@/utils/internalRoutes';
import EditIcon from '@systran/react-components/lib/atoms/Icons/EditIcon';
import {actionColumn} from '@/components/Columns';
import {RowAction} from '@systran/react-components/lib/organisms/RowAction/RowAction';

// Copy from react/advancedConfiguration/utils.js
export function getTypeOfBadgeFromStatus(status = '', expectedStatus: string) {
  if (status.includes('running')) {
    return 'success';
  }
  if (status === 'not installed') {
    return 'default';
  }
  if (status === expectedStatus) {
    return 'info';
  }
  if (status.includes('ing')) {
    return 'warning';
  }
  return 'error';
}

export function getStatusBadge(status: string, row: TTranslationResource, t: TFunction<'translation', undefined>, hostname?: {label: string; value: string}) {
  let {expectedStatus, warning} = row;
  const computingNode = row.computingNodes?.find?.((e) => e.hostname === hostname?.label);
  if (computingNode) {
    expectedStatus = computingNode.expectedStatus;
    status = computingNode.status;
    warning = computingNode.warning;
  }
  const text = (
    <span>
      {warning && status === 'running' && (
        <span title={t('Could not retrieve the latest status')} style={{paddingRight: '3px'}}>
          <DangerIcon />
        </span>
      )}
      {t(status)}
    </span>
  );

  return (
    <Tooltip placement='top' title={text}>
      <div>
        <StatusBadge status={getTypeOfBadgeFromStatus(status, expectedStatus)}>{text}</StatusBadge>
      </div>
    </Tooltip>
  );
}

function formatFilter(data: Array<string> = [], formatter?: (arg: string) => {value: string; label: string | boolean}) {
  return data.map((item) => {
    if (typeof formatter === 'function') {
      return formatter(item);
    }
    return {value: item, label: item};
  });
}

export default function useColumns(actions: RowAction<TTranslationResource>[]) {
  const {t} = useTranslation();
  const {data} = useGetOptionsForFiltering();
  const {
    data: {
      filteringData: {
        autocomplete: {computingNode}
      }
    }
  } = useContext(TranslationResourcesContext);

  return useMemo(
    () => [
      {
        field: 'status',
        renderCell: ({value, row}) => getStatusBadge(value, row, t, computingNode),
        editable: false,
        sortable: false,
        type: 'singleSelect',
        valueOptions: formatFilter(data.dataStatus),
        headerName: t('Status'),
        flex: 1
      },
      {
        field: 'id',
        renderCell: ({value}) => <LinkInternal href={InternalRoutes.translationResource(value)}>{value}</LinkInternal>,
        editable: false,
        sortable: false,
        headerName: t('Key'),
        flex: 3
      },
      {
        field: 'name',
        editable: false,
        sortable: false,
        headerName: t('Name'),
        flex: 3
      },
      {
        field: 'version',
        renderCell: ({value, row}) => {
          const versionContent = (
            <div>
              <span>{value} </span>
              {row.upgradeable && <ChevronIcon direction='up' />}
            </div>
          );
          if (row.upgradeable) {
            return (
              <Tooltip placement='top' title={t('New version available')}>
                {versionContent}
              </Tooltip>
            );
          }
          return versionContent;
        },
        editable: false,
        sortable: false,
        headerName: t('Version'),
        flex: 1
      },
      {
        field: 'techno',
        renderCell: ({row}) => row.selectors?.tech?.type,
        editable: false,
        sortable: false,
        type: 'singleSelect',
        valueOptions: formatFilter(data.dataTechnos),
        headerName: t('Techno'),
        flex: 1
      },
      {
        field: 'owner',
        renderCell: ({row}) => row.selectors?.owner,
        editable: false,
        sortable: false,
        type: 'singleSelect',
        valueOptions: formatFilter(data.dataOwners),
        headerName: t('Owner'),
        flex: 1
      },
      {
        field: 'domain',
        renderCell: ({row}) => row.selectors?.domain,
        editable: false,
        sortable: false,
        type: 'singleSelect',
        valueOptions: formatFilter(data.dataDomain),
        headerName: t('Domain'),
        flex: 1
      },
      {
        field: 'activatedProfiles',
        renderCell: ({value}) => value || 0,
        editable: false,
        sortable: false,
        headerName: t('Activated Profiles'),
        flex: 1
      },
      {
        field: 'profiles',
        renderCell: ({value}) => value || 0,
        editable: false,
        sortable: false,
        headerName: t('Total Profiles'),
        flex: 1
      },
      {
        field: 'nbInstances',
        editable: false,
        sortable: false,
        headerName: t('Instances'),
        flex: 1
      },
      {
        field: 'nbInstancesRequested',
        renderCell: ({value}) => {
          return (
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span>{value}</span>
              <EditIcon />
            </div>
          );
        },
        editable: true,
        type: 'number',
        sortable: false,
        headerName: t('Instances Requested'),
        flex: 1
      },
      actionColumn({t, actions})
    ] satisfies GridColDef<TTranslationResource>[],
    [data, actions, computingNode]
  );
}
