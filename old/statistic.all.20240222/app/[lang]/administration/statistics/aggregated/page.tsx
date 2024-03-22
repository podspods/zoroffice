'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import { DateRange } from '@mui/x-date-pickers-pro';
import PageTitle from '@/components/PageTitle';
import { defaultPeriod, getCurrentPeriod } from '../components/statisticsUtils';
import {
  NO_CHECK,
  STAT_BY_GROUP,
  STAT_BY_PROFILE,
  statCategoryAggregated
} from '../components/statisticsConstant';
import { Period, TypeStat } from '../components/statisticsType';
import userAuthorizations from '../../../../../../lib/userAuthorizations';
import { actions } from '../../../../../../lib/permissionsList';
import { TemporaryPageBox } from '@/components/TemporaryPageBox';
import UserViewPage from './UserViewPage';
import ProfileViewPage from './ProfileViewPage';
import GroupViewPage from './GroupViewPage';
export default function AdministrationStatisticsAggregated() {
  if (!(
    NO_CHECK ||
    userAuthorizations.check((actions as any).USERS_STATS) ||
    userAuthorizations.check((actions as any).GROUPS_STATS) ||
    userAuthorizations.check((actions as any).ADMIN_STATS)
  ))
    return <>no rights</>;
  const [typeStat, setTypeStat] = useState<TypeStat>(statCategoryAggregated[0]);
  const [period, setPeriod] = useState<Period>(getCurrentPeriod());
  const onChangePeriode = (period: Period) => {
    setPeriod(period);
  };
  const [dateValue, setDateValue] = useState<DateRange<DateTime>>(
    defaultPeriod()
  );
  const onChangeTypeStat = (typeStat: TypeStat) => {
    setTypeStat(typeStat);
  };
  const { t } = useTranslation();
  return (
    <TemporaryPageBox>
      <PageTitle>{t(typeStat.name)}</PageTitle>
      {displayTable({
        typeStat,
        onChangeTypeStat,
        onChangePeriode,
        period,
        setDateValue,
        dateValue
      })}
    </TemporaryPageBox>
  );
}

type displayTableProps = {
  typeStat: TypeStat;
  onChangeTypeStat: (typeStat: TypeStat) => void;
  onChangePeriode: (period: Period) => void;
  period: Period;
  setDateValue: (value: DateRange<DateTime>) => void;
  dateValue: DateRange<DateTime>;
};
function displayTable({ ...props }: displayTableProps) {
  switch (props.typeStat.id) {
    case STAT_BY_GROUP:
      return (
        <GroupViewPage
          onChangeTypeStat={props.onChangeTypeStat}
          onChangePeriode={props.onChangePeriode}
          period={props.period}
          typeStat={props.typeStat}
        />
      );
    case STAT_BY_PROFILE:
      return (
        <ProfileViewPage
          onChangeTypeStat={props.onChangeTypeStat}
          typeStat={props.typeStat}
          dateValue={props.dateValue}
          setDateValue={props.setDateValue}
        />
      );
    default:
      return (
        <UserViewPage
          onChangeTypeStat={props.onChangeTypeStat}
          onChangePeriode={props.onChangePeriode}
          period={props.period}
          typeStat={props.typeStat}
        />
      );
  }
}