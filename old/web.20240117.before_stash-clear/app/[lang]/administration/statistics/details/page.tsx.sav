/* eslint-disable no-console */

'use client';

import PageTitle from '@/components/PageTitle';
import { useState } from 'react';
import useSWR from 'swr';
import { Box } from '@mui/material';
import Table, {
  useRemoteHooks
} from '@systran/react-components/lib/organisms/Table/Table';
import useColumns from './components/column';
import ForDebug from './components/ForDebug';
import { useTranslation } from 'react-i18next';
import DetailToolbar from './components/DetailToolbar';
import { DateRange } from '@mui/x-date-pickers-pro';
import { defaultPeriod, toDetailStatList } from './components/statUtils';
import { DateTime } from 'luxon';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import Apis from '@/utils/apis';
import { RawDetailStat } from './components/statType';
import ModalStatSetting from './components/ModalStatSetting';
const showDebug = true;
// const showDebug = false ;

/**
 * get : https://spns-alpha-el8.systran.net/activity/details?skip=0&limit=10&sortName=date&sortOrder=desc&startDate=1704876417404&endDate=1704962817404
 * @returns
 * data form spns 8l : /administration/statistics/data/detailView.json
 *
 */

export default function StatisticDetail() {
  // const rowList: any = [];
  const { t } = useTranslation();
  const columns = useColumns();

  const [dateValue, setDateValue] = useState<DateRange<DateTime>>(
    defaultPeriod()
  );
  const [modalSettingVisible, setModalSettingVisible] = useState<boolean>(
    false
  );
  // console.log(' dateValue  35==>', dateValue);
  /** _____________________hook __________________________ */
  //  /activity/details?skip=0&limit=10&sortName=date&sortOrder=desc&startDate=1704876417404&endDate=1704962817404
  //  /activity/details?skip=0&limit=25&sortName=date&sortOrder=desc&startDate=1701679260000&endDate=1705394509295
  const useRefresh = useRefreshBuilder<RawDetailStat>({
    route: Apis.statistics.fullView,
    useSWR,
    adaptParamsOpts: {
      paginationParamsFields: {
        limit: 'limit',
        skip: 'skip'
      },
      additionalParams: {
        sortName: 'date',
        sortOrder: 'desc',
        startDate: dateValue[0]
          ? dateValue[0].valueOf()
          : DateTime.now().valueOf(),
        endDate: dateValue[1]
          ? dateValue[1].valueOf()
          : DateTime.now().valueOf()
      }
    },
    adaptResponseOpts: {
      validateRowFct: () => true,
      rowsField: 'data',
      totalRowCountField: 'total'
    }
  });

  const {
    mutate,
    loading,
    rows: rawDetailStatList,
    // rowCount,
    ...remainningRemoteHookData
  } = useRemoteHooks<RawDetailStat>({
    useRefresh: useRefresh,
    refreshRate: 'Never'
  });

  console.log('remainningRemoteHookData ==>', remainningRemoteHookData);

  const { result: rowList } = toDetailStatList(rawDetailStatList);
  const onMutate = () => void mutate();
  const editConfig = () => {
    console.log(' editConfig 89==>', 89);
    setModalSettingVisible(true);
  };

  /** _____________________hook __________________________ */

  return (
    <Box sx={{ width: '100%', margin: '2rem' }}>
      <PageTitle>{t('Statistics')}</PageTitle>
      <Table
        sx={{ overflowY: 'scroll', maxHeight: '70vh' }}
        {...remainningRemoteHookData}
        rows={rowList}
        maxHeight={'auto'} // allow to have vertical scroll on overflow
        columns={columns}
        pagination
        slots={{ toolbar: DetailToolbar }}
        slotProps={{
          toolbar: {
            setDateValue: setDateValue,
            mutate: onMutate,
            editConfig: editConfig
          }
        }}
        localeText={{
          toolbarExportCSV: t('Export data to csv')
        }}
      />
      <ModalStatSetting
        open={modalSettingVisible}
        onConfirm={() => null}
        onClose={() => setModalSettingVisible(false)}
      />
      {showDebug && (
        <ForDebug
          name={'for debug on '}
          dateRange={{
            startDate: dateValue[0] ? dateValue[0] : DateTime.now(),
            endDate: dateValue[1] ? dateValue[1] : DateTime.now()
          }}
        />
      )}
    </Box>
  );
}

/**
 *
 *
 */
