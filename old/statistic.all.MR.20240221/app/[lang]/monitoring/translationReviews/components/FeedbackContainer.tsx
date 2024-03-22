'use client';

import { useState } from 'react';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import { useRemoteHooks } from '@systran/react-components/lib/organisms/Table/hooks/useRemoteHooks';
import { AdditionalParams } from '@systran/react-components/lib/organisms/Table/hooks/adaptParams';
import { useTranslation } from 'react-i18next';
import PageTitle from '@/components/PageTitle';
import useSWR from 'swr';
import Apis from '@/utils/apis';
import SearchFilters from './SearchFilters';
import FeedbackTable from './FeedbackTable';
import { Feedback } from './FeedbackType';

export type Props = {
  hasAdminUserPermission: boolean,
}
export default function FeedbackContainer({hasAdminUserPermission}: Props) {

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [addToUD, setAddToUD] = useState<boolean>(false);
  const [addToTM, setAddToTM] = useState<boolean>(false);
  const {t} = useTranslation();

  const additionalParams: AdditionalParams = {addToUD: addToUD, addToTM: addToTM};
  if (startDate) {
    additionalParams.startDate = (startDate as any)?.$d?.valueOf();
  }
  if (endDate) {
    additionalParams.endDate = (endDate as any)?.$d.valueOf();
  }

  const useRefresh = useRefreshBuilder<Feedback>({
    route: Apis.feedback.list,
    useSWR,
    adaptParamsOpts: {
      paginationParamsFields: {
        limit: 'iDisplayLength',
        skip: 'iDisplayStart'
      },
      sortParamsField: {
        sortName: 'insertedAt',
        sortOrder: 'desc'
      },
      additionalParams: additionalParams
    },
    adaptResponseOpts: {
      validateRowFct: () => true,
      rowsField: 'feedbacks',
      totalRowCountField: 'iTotalDisplayRecords'
    }
  });
  const remoteHooksData = useRemoteHooks({useRefresh, refreshRate: 10});

  return (
    <>
      <PageTitle>{t('Translation Reviews')}</PageTitle>
      <SearchFilters
        startDate={startDate}
        endDate={endDate}
        addToUD={addToUD}
        addToTM={addToTM}
        handleStartDateChange={setStartDate}
        handleEndDateChange={setEndDate}
        handleAddToUDChange={setAddToUD}
        handleAddToTMChange={setAddToTM}
      />
      <FeedbackTable
        remoteHooksData={remoteHooksData}
        hasAdminUserPermission={hasAdminUserPermission}
      />
    </>
  );
}
