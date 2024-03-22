'use client';

import { useTranslation } from 'react-i18next';
import { DateRange } from '@mui/x-date-pickers-pro';
import PageTitle from '@/components/PageTitle';
import { TemporaryPageBox } from '@/components/TemporaryPageBox';
import DetailStatisticTable from './components/DetailStatisticTable';
import userAuthorizations from '../../../../../../lib/userAuthorizations';
import { actions } from '../../../../../../lib/permissionsList';
import { DateTime } from 'luxon';
import { NO_CHECK, statCategoryFull } from '../components/statisticsConstant';
import { useState } from 'react';
import { TypeStat } from '../components/statisticsType';
import { defaultPeriod } from '../components/statisticsUtils';

export default function StatisticDetail() {
  const { t} = useTranslation();
  // if (!userAuthorizations.check((actions as any).ADMIN_STATS)) return <></>;
  if (!NO_CHECK && !userAuthorizations.check((actions as any).ADMIN_STATS))
    return <></>;

  const [typeStat, setTypeStat] = useState<TypeStat>(statCategoryFull[0]);
  const [dateValue, setDateValue] = useState<DateRange<DateTime>>(
    defaultPeriod()
  );
  const onChangeTypeStat = (typeStat: TypeStat) => {
    setTypeStat(typeStat);
  };


  return (
    <TemporaryPageBox>
      <PageTitle>{t('Full View Statistics')}</PageTitle>
      <DetailStatisticTable
        onChangeTypeStat={onChangeTypeStat}
        typeStat={typeStat}
        dateValue={dateValue}
        setDateValue={setDateValue}
      />
    </TemporaryPageBox>
  );
}
