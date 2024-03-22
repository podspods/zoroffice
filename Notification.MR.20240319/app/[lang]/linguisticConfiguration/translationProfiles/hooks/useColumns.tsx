import {LinkInternal} from '@systran/react-components/lib/atoms/Link';
import {useTranslation} from 'react-i18next';
import {getProfilesPermission} from '../components/TranslationProfilesContainer';
import UserIcon from '@systran/react-components/lib/atoms/Icons/UserIcon';
import EarthIcon from '@systran/react-components/lib/atoms/Icons/EarthIcon';
import {getCreatorLink, languageRender} from '@/components/utils';
import {getSourceLang, getTargetLang} from '../../../../../../lib/trHelper';
import {getRunningBadge, getActiveBadge} from '@/components/TableHelper';
import {Profile, TranslationProfilesTableDataProps} from '../components/TranslationProfilesTable';
import {GridColDef} from '@systran/react-components/lib/organisms/Table/Table';
import {actionColumn} from '@/components/Columns';
import {useMemo} from 'react';
import {useSingleSelectOperators} from '@systran/react-components/lib/organisms/Table/filterOperators/SingleSelectOperators';
import Box from '@mui/material/Box';
import LanguagePairsRender from '@systran/react-components/lib/molecules/LanguagePairsRender';
import {renderDateFrom} from '@systran/react-components/lib/userManagement/utils';

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

const formatLanguageOptions = (services: string[]) => {
  return services.map(service => {
    const source = getSourceLang({service});
    const target = getTargetLang({service});
    return `${source}${target}`;
  });
}

const separateLanguageValue = (languageValue: string) => {
  return {
    source: languageValue.substring(0, 2),
    target: languageValue.substring(2, 4)
  }
}

const renderLpsOption = (props: React.HTMLAttributes<HTMLLIElement>, option: string) => {
  const {source, target} = separateLanguageValue(option);
  return (
    <Box component='li' {...props}>
      <LanguagePairsRender source={source} target={target} />
    </Box>
  );
};

const filterOperators = (dataLps: string[] = []) => {
  return useSingleSelectOperators({options: formatLanguageOptions(dataLps), renderOption: renderLpsOption})
}

export default function useColumns(data: TranslationProfilesTableDataProps, actions: any) {
  const {t, i18n: {language}} = useTranslation();
  const {hasAdminProfilesPermission} = getProfilesPermission();

  return useMemo(() => {
    const tableColumns: GridColDef<Profile>[] = [
      {
        field: 'sharingStatus',
        renderCell: ({value}) => renderSharingStatus(value),
        renderHeader: () => <UserIcon type='group' />,
        editable: false,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        type: 'singleSelect',
        filterOperators: useSingleSelectOperators({
          options: [
            {label: t('Private'), value: 'private'},
            {label: t('Shared with users'), value: 'users'},
            {label: t('Shared with groups'), value: 'groups'},
            {label: t('Public'), value: 'public'}
          ],
          fieldFilter: 'value'
        }),
        flex: 0.5,
        headerName: t('Sharing Status')
      },
      {
        field: 'deactivated',
        renderCell: ({value}) => getActiveBadge(value),
        editable: false,
        sortable: false,
        type: 'singleSelect',
        filterOperators: useSingleSelectOperators({options: [{label: 'Activated', value: false}, {label: 'Deactivated', value: true}], fieldFilter: 'value'}),
        flex: 1,
        headerName: t('Status')
      },
      {
        field: 'service',
        renderCell: ({row}) => row.serviceName,
        editable: false,
        sortable: false,
        flex: 2,
        headerName: t('Profile Name / Id')
      },
      {
        field: 'translationResource',
        renderCell: trLinkRender,
        editable: false,
        sortable: false,
        flex: 2,
        headerName: t('Translation Resource')
      },
      {
        field: 'running',
        renderCell: ({value}) => getRunningBadge(value),
        editable: false,
        sortable: false,
        type: 'singleSelect',
        filterOperators: useSingleSelectOperators({options: [{label: 'running', value: true}, {label: 'not running', value: false}], fieldFilter: 'value'}),
        flex: 1,
        headerName: t('Running')
      },
      {
        field: 'lps',
        renderCell: ({row}) => formatServiceToLanguage(row.service).label,
        editable: false,
        sortable: false,
        type: 'singleSelect',
        valueOptions: formatFilter(data.dataLps, formatServiceToLanguage as any),
        filterOperators: filterOperators(data.dataLps),
        flex: 1,
        headerName: t('Languages')
      },
      {
        field: 'owner',
        renderCell: ({row}) => row.selectors.owner,
        editable: false,
        sortable: false,
        type: 'singleSelect',
        filterOperators: useSingleSelectOperators({options: data.dataOwner as string[]}),
        flex: 1,
        headerName: t('Owner')
      },
      {
        field: 'domain',
        renderCell: ({row}) => row.selectors.domain,
        editable: false,
        sortable: false,
        type: 'singleSelect',
        filterOperators: useSingleSelectOperators({options: data.dataDomain as string[]}),
        flex: 1,
        headerName: t('Domain')
      },
      {
        field: 'size',
        renderCell: ({row}) => row.selectors.size,
        editable: false,
        sortable: false,
        type: 'singleSelect',
        filterOperators: useSingleSelectOperators({options: data.dataSize as string[]}),
        flex: 1,
        headerName: t('Size')
      },
      {
        field: 'techno',
        renderCell: ({row}) => row.selectors.tech?.type,
        editable: false,
        sortable: false,
        type: 'singleSelect',
        filterOperators: useSingleSelectOperators({options: data.dataTechno as string[]}),
        flex: 1,
        headerName: t('Techno')
      },
      ...(hasAdminProfilesPermission
        ? [
            {
              field: 'profileOptions',
              renderCell: ({value: options}) => {
                const {accountId, creatorName} = options || {};
                return getCreatorLink({accountId, creatorName, isAdmin: getProfilesPermission().hasAdminUserPermission});
              },
              disableColumnMenu: true,
              renderHeaderFilter: () => null,
              editable: false,
              sortable: false,
              flex: 1,
              headerName: t('Creator')
            } as GridColDef<Profile>
        ]
        : []),
      {
        field: 'insertionTime',
        renderCell: ({value}) => renderDateFrom(new Date(Number(value)).toISOString(), language || 'en'),
        disableColumnMenu: true,
        renderHeaderFilter: () => null,
        sortable: true,
        editable: false,
        flex: 1,
        headerName: t('Date')
      },
      actionColumn({t, actions})
    ];

    return tableColumns;
  }, [data, actions]) satisfies GridColDef<Profile>[];
}
