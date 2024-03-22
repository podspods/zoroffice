'use client';

import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import Table, {
  GridSortModel,
  useRemoteHooks
} from '@systran/react-components/lib/organisms/Table/Table';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import Apis from '@/utils/apis';
import PageTitle from '@/components/PageTitle';
import { Notification } from './NotificationsType';
import NotificationToolbar from './NotificationToolbar';
import useColumns from './useColumn';
import { actionList } from './NotificationUtils';
import { useMemo, useState } from 'react';


export default function NotificationMainPage() {
  const { t } = useTranslation();

  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'insertedAt',
      sort: 'desc'
    }
  ]);

  const useRefresh = useRefreshBuilder<Notification>({
    route: Apis.notification.list,
    useSWR,
    adaptParamsOpts: {
      additionalParams: {
        sortName: sortModel[0]?.field,
        sortOrder: sortModel[0]?.sort as string
      },
      filterParamsFieldFct: (field: string) => `eleFilters[${field}]`
    },
    adaptResponseOpts: {
      validateRowFct: () => true,
      rowsField: 'notifications',
      totalRowCountField: 'total'
    }
  });

  const {
    mutate,
    loading,
    refreshRate,
    setRefreshRate: setRefreshInterval,
    ...remainningRemoteHookData
  } = useRemoteHooks<Notification>({
    useRefresh: useRefresh,
    refreshRate: 'Never'
  });
  const colums = useColumns(actionList(mutate));
  const slots = { toolbar: NotificationToolbar, headerFilterMenu: null };
  const slotProps = useMemo(
    () => ({
      toolbar: {
        loading,
        refreshRate,
        setRefreshInterval,
        actions: actionList(mutate),
        mutate
      }
    }),
    [loading, refreshRate, setRefreshInterval, mutate]
  );

  const handeChange = (sortModel: any) => {
    setSortModel(sortModel);
  };

  return (
    <>
      <PageTitle>{t('Notifications')}</PageTitle>
      <Table
        maxHeight={'70vh'}
        {...remainningRemoteHookData}
        columns={colums as any}
        checkboxSelection
        slots={slots}
        slotProps={slotProps}
        unstable_headerFilters
        disableColumnFilter
        onSortModelChange={handeChange}
      />
    </>
  );
}
