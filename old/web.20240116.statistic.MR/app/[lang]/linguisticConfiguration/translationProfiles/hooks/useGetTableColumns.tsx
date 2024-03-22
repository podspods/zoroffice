import {LinkInternal} from '@systran/react-components/lib/atoms/Link';
import {useTranslation} from 'react-i18next';
import {getProfilesPermission} from '../components/TranslationProfilesContainer';
import UserIcon from '@systran/react-components/lib/atoms/Icons/UserIcon';
import EarthIcon from '@systran/react-components/lib/atoms/Icons/EarthIcon';
import {getDate} from '@systran/react-components/lib/atoms/TableHelper';
import {getCreatorLink, languageRender} from '@/components/utils';
import {getSourceLang, getTargetLang} from '../../../../../../lib/trHelper';
import {getRunningBadge, getActiveBadge} from '@/components/TableHelper';
import {Profile, TranslationProfilesTableDataProps} from '../components/TranslationProfilesTable';
import {GridColDef} from '@systran/react-components/lib/organisms/Table/Table';
import { actionColumn } from '@/components/Columns';

function optionsSharingStatus() {
  return [
    {label: <UserIcon type='single' />, value: 'private'},
    {label: <UserIcon type='group' />, value: 'users'},
    {label: <UserIcon type='group' />, value: 'groups'},
    {label: <EarthIcon />, value: 'public'}
  ];
}

function renderSharingStatus(sharingStatus: string) {
  const elem = optionsSharingStatus().find(({value}: {value: string}) => value === sharingStatus);
  return elem?.label;
}

function formatServiceToLanguage(service: string) {
  const source: string | null = getSourceLang({service});
  const target: string | null = getTargetLang({service});
  return languageRender(source || '', target || '');
}

function formatFilter(data: Array<string> = [], formatter?: (arg: string) => {value: string; label: string | boolean}) {
  return data.map((item) => {
    if (typeof formatter === 'function') {
      return formatter(item);
    }
    return {value: item, label: item};
  });
}

function trLinkRender({row: full}: {row: {translationResource: {name: string; id: string}}}) {
  const tr = full.translationResource;
  if (!tr) {
    return '';
  }
  if (getProfilesPermission().hasAdvancedPermission && tr.id) {
    return <LinkInternal href={'/administration/translationResources/' + tr.id}> {tr.name} </LinkInternal>;
  }
  return tr.name;
}

export default function useGetTableColumns(data: TranslationProfilesTableDataProps, actions: any) {
  const {t} = useTranslation();
  const {hasAdminProfilesPermission} = getProfilesPermission();

  const tableColumns: Array<GridColDef> = [
    {
      field: 'sharingStatus',
      renderCell: ({value}) => renderSharingStatus(value),
      renderHeader: () => <UserIcon type='group' />,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      type: 'singleSelect',
      valueOptions: [
        {label: t('Private'), value: 'private'},
        {label: t('Shared with users'), value: 'users'},
        {label: t('Shared with groups'), value: 'groups'},
        {label: t('Public'), value: 'public'}
      ],
      headerName: t('Sharing Status')
    },
    {
      field: 'deactivated',
      renderCell: ({value}) => getActiveBadge(value),
      editable: false,
      sortable: false,
      type: 'singleSelect',
      valueOptions: [
        {label: 'Activated', value: false},
        {label: 'Deactivated', value: true}
      ],
      headerName: t('Status')
    },
    {
      field: 'service',
      renderCell: ({row}: {row: Profile}) => row.serviceName,
      editable: false,
      minWidth: 250,
      sortable: false,
      headerName: t('Profile Name / Id')
    },
    {
      field: 'translationResource',
      renderCell: trLinkRender,
      editable: false,
      width: 250,
      sortable: false,
      headerName: t('Translation Resource')
    },
    {
      field: 'running',
      renderCell: ({value}) => getRunningBadge(value),
      editable: false,
      sortable: false,
      type: 'singleSelect',
      valueOptions: [
        {label: 'running', value: true},
        {label: 'not running', value: false}
      ],
      headerName: t('Running')
    },
    {
      field: 'lps',
      renderCell: ({row}: {row: Profile}) => formatServiceToLanguage(row.service).label,
      editable: false,
      sortable: false,
      type: 'singleSelect',
      valueOptions: formatFilter(data.dataLps, formatServiceToLanguage as any),
      headerName: t('Languages')
    },
    {
      field: 'owner',
      renderCell: ({row}: {row: Profile}) => row.selectors.owner,
      editable: false,
      sortable: false,
      type: 'singleSelect',
      valueOptions: formatFilter(data.dataOwner, undefined),
      headerName: t('Owner')
    },
    {
      field: 'domain',
      renderCell: ({row}: {row: Profile}) => row.selectors.domain,
      editable: false,
      sortable: false,
      type: 'singleSelect',
      valueOptions: formatFilter(data.dataDomain, undefined),
      headerName: t('Domain')
    },
    {
      field: 'size',
      renderCell: ({row}: {row: Profile}) => row.selectors.size,
      editable: false,
      sortable: false,
      type: 'singleSelect',
      valueOptions: formatFilter(data.dataSize, undefined),
      headerName: t('Size')
    },
    {
      field: 'techno',
      renderCell: ({row}: {row: Profile}) => row.selectors.tech?.type,
      editable: false,
      sortable: false,
      type: 'singleSelect',
      valueOptions: formatFilter(data.dataTechno, undefined),
      headerName: t('Techno')
    }
  ];

  if (hasAdminProfilesPermission) {
    tableColumns.push({
      field: 'profileOptions',
      renderCell: ({value: options}) => {
        const {accountId, creatorName} = options || {};
        return getCreatorLink({accountId, creatorName, isAdmin: getProfilesPermission().hasAdminUserPermission});
      },
      editable: false,
      sortable: false,
      width: 110,
      headerName: t('Creator')
    });
  }

  tableColumns.push(
    {
      field: 'insertionTime',
      renderCell: ({value}) => getDate(parseInt(value, 10)),
      width: 120,
      sortable: true,
      editable: false,
      headerName: t('Date')
    },
    actionColumn({t, actions})
  );

  return {tableColumns};
}
