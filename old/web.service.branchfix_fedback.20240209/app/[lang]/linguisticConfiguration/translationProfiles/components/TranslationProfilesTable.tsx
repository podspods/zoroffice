import {Box, Typography} from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import useSWR from 'swr';
import useColumns from '../hooks/useColumns';
import {FilterOptions, LinguisticOptions, Resources, Selectors} from '../context/TranslationProfilesAddContext';
import useProfileModal from '../hooks/useProfileModal';
import TranslationProfilesTableToolbar, {ToolbarProps} from './TranslationProfilesTableToolbar';
import Table, {useRemoteHooks, GridRowParams} from '@systran/react-components/lib/organisms/Table/Table';
import TranslationProfileExpandComponent from './TranslationProfileExpandComponent';
import {useTranslation} from 'react-i18next';
import {ReactNode, useMemo} from 'react';
import useActions from '../hooks/useActions';

export type TranslationProfilesTableDataProps = {
  dataLps?: Array<string>;
  dataOwner?: Array<string>;
  dataDomain?: Array<string>;
  dataSize?: Array<string>;
  dataTechno?: Array<string>;
  coversPivot?: number;
  enabledProfilesNFA?: boolean;
};
export type Profile = {
  access: {list: boolean; delete: boolean; erase: boolean; update: boolean};
  deactivated: boolean;
  errors: unknown;
  insertionTime: string;
  options: {name: string; value: {ND: boolean; UD: boolean; TM: boolean; NFA: boolean}}[];
  profileId: string;
  profileOptions: {
    _id: string;
    accountId: string | null;
    creatorName: string | null;
    dependentProfiles: unknown;
    enabledNFA: boolean;
    filterOptions: FilterOptions;
    linguisticOptions: LinguisticOptions;
    noCache: boolean;
    profileId: string;
    profileName: string;
    resources: Resources;
    selectors: Selectors;
    source: string;
    target: string;
    submittedAt: string;
  };
  public: boolean;
  running: boolean;
  selectors: Selectors;
  service: string;
  serviceName: string;
  sesProfileId: string;
  sharingStatus: string;
  source: string;
  target: string;
  translationResource: {name: string; id: string};
  version: string;
  accountId: string;
  users: string[];
  groups: string[];
};

export function hasNoAccess(row: Profile, type: 'update' | 'delete') {
  return !row?.access?.[type];
}
export function hasNoProfile(row: Profile) {
  return !row.sesProfileId || isEmpty(row.profileOptions);
}

const slots = {
  toolbar: TranslationProfilesTableToolbar
};

export default function TranslationProfilesTable({data}: {data: TranslationProfilesTableDataProps}) {
  const {t} = useTranslation();

  const useRefresh = useRefreshBuilder({
    route: '/node/profiles',
    useSWR,
    adaptResponseOpts: {
      validateRowFct: () => true,
      rowsField: 'services',
      totalRowCountField: 'total'
    },
    adaptParamsOpts: {
      paginationParamsFields: {
        limit: 'limit',
        skip: 'skip'
      },
      additionalParams: {
        sortName: 'insertionTime',
        sortOrder: 'desc'
      },
      filterParamsFieldFct: (field: string) => {
        if (field === 'sharingStatus') {
          return `eleFilters[${field}][]`;
        }
        return `eleFilters[${field}]`;
      }
    }
  });
  const {loading, refreshRate, setRefreshRate, mutate, ...remoteHooksData} = useRemoteHooks({useRefresh, refreshRate: 5});
  const [modal, setOpenedModal] = useProfileModal({mutate});
  const actions = useActions({setOpenedModal, data});
  const columns = useColumns(data, actions);

  const renderExpandComponent: (e: GridRowParams<Profile>) => ReactNode = ({row}) => {
    if (hasNoProfile(row)) {
      return <Typography>{t('This profile is not editable.')}</Typography>;
    }
    return <TranslationProfileExpandComponent profileData={row} mutate={mutate} disabled={hasNoAccess(row, 'update')} />;
  };

  const slotProps = useMemo(
    () => ({
      toolbar: {
        actions,
        isLoading: loading,
        refreshRate,
        setRefreshRate,
        mutate,
        setOpenedModal
      } satisfies ToolbarProps
    }),
    [actions, loading, refreshRate, setRefreshRate, mutate, setOpenedModal]
  );

  return (
    <Box style={{width: '100%'}}>
      <Table
        {...remoteHooksData}
        loading={loading}
        maxHeight='60vh'
        columns={columns as any}
        checkboxSelection
        pageSizeOptions={[5, 10, 20, 30]}
        pagination
        getRowId={(row) => {
          return row.profileId;
        }}
        getDetailPanelContent={renderExpandComponent as any}
        slots={slots}
        slotProps={slotProps}
      />
      {modal}
    </Box>
  );
}
