import { DateTime } from 'luxon';
import { DetailStat, RawDetailStat } from '../details/components/statType';
import dayjs, { Dayjs } from 'dayjs';

export function defaultPeriod(): [DateTime, DateTime] {
  const endDate: DateTime = DateTime.now();
  const dayOfMonth = endDate.day;
  const startDate =
    dayOfMonth !== 1
      ? endDate.startOf('month')
      : endDate.minus({ months: 1 }).startOf('month');
  return [startDate, endDate];
}

export function defaultPeriod2(): [Dayjs, Dayjs] {
  const today = dayjs();
  const endDate: Dayjs = today;
  const startDate =
    endDate.date() !== 1
      ? endDate.startOf('month')
      : endDate.subtract(1, 'month').startOf('month');
  return [startDate, endDate];
}

export function toDetailStatList(
  rawDetailStatList: RawDetailStat[]
): { result: DetailStat[]; totalChar: number; totalUser: number } {
  let totalChar = 0;
  if (!rawDetailStatList) return { result: [], totalChar: 0, totalUser: 0 };
  if (rawDetailStatList.length <= 0)
    return { result: [], totalChar: 0, totalUser: 0 };
  const result: DetailStat[] = rawDetailStatList.map((oneRow) => {
    totalChar = oneRow.nbCharacters
      ? totalChar + oneRow.nbCharacters
      : totalChar;
    return convertToDetailStat(oneRow);
  });
  const totalUser = countDistinctUser(result);
  return { result: result, totalChar: totalChar, totalUser: totalUser };
}

function countDistinctUser(dataList: DetailStat[]) {
  const uniqueUsernames = dataList
    .map((detailStat) => detailStat.userName)
    .filter((value, index, self) => self.indexOf(value) === index);

  return uniqueUsernames.length;
}

function convertToDetailStat(oneRow: RawDetailStat): DetailStat {
  const result: DetailStat = {
    id: oneRow.id,
    date: DateTime.fromISO(oneRow.date, { zone: 'utc' }),
    userName: oneRow.accountName,
    groupName: 'no-group',
    sourceLanguage: oneRow.sourceLanguage,
    targetLanguage: oneRow.targetLanguage,
    languagePair: `${oneRow.sourceLanguage} > ${oneRow.targetLanguage}`,
    profileName: oneRow.profileName,
    userAgent: oneRow.userAgent,
    mimeType: oneRow.mimetype,
    numberChar: oneRow.nbCharacters
  };
  return result;
}
