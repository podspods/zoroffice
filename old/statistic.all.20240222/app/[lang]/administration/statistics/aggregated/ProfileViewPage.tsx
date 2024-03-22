'use client';

import userAuthorizations from '../../../../../../lib/userAuthorizations';
import { actions } from '../../../../../../lib/permissionsList';
import ProfileViewTable from './components/ProfileViewTable';
import { DateTime } from 'luxon';
import { DateRange } from '@mui/x-date-pickers-pro';
import { TypeStat } from '../components/statisticsType';
import { NO_CHECK } from '../components/statisticsConstant';

export type ProfileViewPageProps = {
  onChangeTypeStat: (typeStat: TypeStat) => void;
  typeStat: TypeStat;
  setDateValue: (value: DateRange<DateTime>) => void;
  dateValue: DateRange<DateTime>;
};

export default function ProfileViewPage({ ...props }: ProfileViewPageProps) {
  // if (!userAuthorizations.check((actions as any).ADMIN_STATS)) return <></>;

  if (!NO_CHECK && !userAuthorizations.check((actions as any).ADMIN_STATS))
    return <></>;
  return (
    <ProfileViewTable
      onChangeTypeStat={props.onChangeTypeStat}
      typeStat={props.typeStat}
      dateValue={props.dateValue}
      setDateValue={props.setDateValue}
    />
  );
}
