/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import dayjs, { Dayjs } from 'dayjs';
import { DateRange } from '@mui/x-date-pickers-pro';
import {
  RawUserViewStat,
  Statistic,
  StatisticProfile,
  UserViewStat
} from './statisticsType';

export function formatDate(dateValue: DateRange<Dayjs>): string {
  const dateTxt1 = dateValue[0] ? dateValue[0].format('DD/MM/YYYY') : '';
  const dateTxt2 = dateValue[1] ? dateValue[1].format('DD/MM/YYYY') : '';

  const result = `${dateTxt1} - ${dateTxt2}`;
  return result;
}

/**
 * end date should be current day
 * start date should be le first day of the current mounth
 * if end date is the first day of the mounth then start date should the first day of the previous month
 * @returns : startdate and end date as an array of Dayjs
 */

export function defaultPeriod(): DateRange<Dayjs> {
  const endDate: Dayjs = dayjs();
  const dayOfMonth = endDate.date();

  const startDate =
    dayOfMonth !== 1
      ? endDate.startOf('month')
      : endDate.subtract(1, 'month').startOf('month');

  return [startDate, endDate];
}

// function toStat(rawData: userDetailStat, idGroupName: number): Statistic {
//   const groupNameList = ['Admin', 'Users', 'Others'];
//   idGroupName = rawData.accountName === 'Administrator' ? 0 : idGroupName;

//   // Assure que idGroupName est dans la plage [0, groupNameList.length - 1]
//   idGroupName = Math.max(0, Math.min(idGroupName, groupNameList.length - 1));

//   const groupName = groupNameList[idGroupName];

//   return {
//     id: rawData.id,
//     userName: rawData.accountName,
//     groupName: groupName,
//     profileName: rawData.profileName,
//     languagePair: `${rawData.sourceLanguage} > ${rawData.targetLanguage}`,
//     userAgent: rawData.userAgent,
//     mimeType: rawData.mimetype,
//     numberChar: rawData.nbCharacters
//   };
// }

export function convertData(
  datajson: any
): { result: Statistic[]; totalChar: number } {
  let totalChar = 0;
  totalChar++;
  const result: Statistic[] = [];
  // console.log('totalChar 58 ==>', totalChar);

  // console.log('datajson 33 ==>', datajson);
  // const myData: userDetailStat[] = datajson.data;
  // console.log('myData 35==>', myData);

  // const oneRow = myData[0];
  // console.log('oneRow 38==>', oneRow);

  // const result: Statistic[] = myData.map((oneRow) => {
  //   const idGroupName: number = Math.floor(Math.random() * 3);
  //   console.log('nbCharacters 69 ==>', oneRow.nbCharacters);
  //   console.log(
  //     ' Math.min(0, oneRow.nbCharacters)  70 ==>',
  //     Math.min(0, oneRow.nbCharacters)
  //   );
  //   totalChar +=
  //     oneRow.nbCharacters !== undefined ? Math.max(0, oneRow.nbCharacters) : 0;
  //   console.log('nbCharacters 71 ==>', oneRow.nbCharacters, totalChar);
  //   return toStat(oneRow, idGroupName);
  // });

  // console.log('totalChar 75 ==>', totalChar);

  return { result: result, totalChar: totalChar };
}

/**
 *
 * @param rawData export type Statistic = {
  id: string;
  profileName: string;
  languagePair: string;
  nbUser: number;
  request: number;
  success: number;
  numberChar: number;
};

 * @returns
 */

export function toStatProfile(rawData: any): StatisticProfile[] {
  const myData = rawData;
  console.log('rawData 102==>', rawData);

  if (!myData) return [];
  const result: StatisticProfile[] = myData.map((oneRow: any) => {
    return {
      id: `${oneRow.profileId}_${oneRow.profileName}`,
      profileName: oneRow.profileName,
      languagePair: `${oneRow.sourceLanguage} > ${oneRow.targetLanguage}`,
      nbUser: oneRow.totalAccounts,
      request: oneRow.total,
      success: oneRow.totalSuccess,

      numberChar: oneRow.totalNbCharacters
    };
  });
  console.log('result 118 ==>', result);

  return result;
}

export function userViewStat(rawData: any): UserViewStat[] {
  // console.log('userViewStat 143==>', rawData);
  // return [];

  if (!rawData) return [];
  console.log('userViewStat 147==>', rawData);
  // const data: RawUserViewStat[] = rawData.data;
  const data: RawUserViewStat[] = rawData;
  if (!data || data.length <= 0) return [];
  console.log('userViewStat 150==>', rawData);

  const result: UserViewStat[] = data.map((value) => ({
    id: value.id,
    profileName: value.name,
    languagePair: `${value.source.toUpperCase()} > ${value.target.toUpperCase()}`,
    mimeType: value.total.mimeType.join(', '),
    userAgent: value.total.userAgent.join(', '),
    request: value.total.request,
    success: value.total.success,
    segment: value.total.nbSegments,
    segmentInCache: value.total.nbCacheHits,
    character: value.total.nbCharacters,
    characterInCache: value.total.nbCharactersCacheHits,
    elapsedTime: value.total.elapsedTime
  }));
  console.log('userViewStat 166==>', result);
  return result;
}
