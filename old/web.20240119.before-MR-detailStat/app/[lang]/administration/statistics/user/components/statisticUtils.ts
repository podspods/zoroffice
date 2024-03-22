/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import dayjs, { Dayjs } from 'dayjs';
import { DateRange } from '@mui/x-date-pickers-pro';
import {
  ALL,
  GroupViewStat,
  ProfileViewStat,
  RawGroupViewStat,
  RawProfileViewStat,
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

export type userViewStatReturn = {
  rowList: UserViewStat[];
  totalChar: number;
};

export function userViewStat(rawData: any): userViewStatReturn {
  // console.log('userViewStat 143==>', rawData);
  // return [];

  if (!rawData || rawData.length <= 0) return { rowList: [], totalChar: 0 };
  const data: RawUserViewStat[] = rawData;

  let totalChar = 0;
  const result: UserViewStat[] = data.map((value) => {
    totalChar += value.total.nbCharacters;
    return {
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
    };
  });

  return {
    rowList: result,
    totalChar: totalChar
  };
}

export type getUserListReturn = {
  userList: string[];
  userCount: number;
};

export function getUserList(rawData: any): getUserListReturn {
  if (!rawData || !rawData.accounts || rawData.accounts.length <= 0)
    return { userList: [], userCount: 0 };

  const accountList: Account[] = rawData.accounts;

  const result: string[] = accountList.map((value) => value.displayName);

  return {
    userList: result,
    userCount: rawData.total ? rawData.total : result.length
  };
}

export type Account = {
  id: string;
  displayName: string;
  groupIds: string[];
  current: boolean;
};

export type Groups = {
  id: string;
  name: string;
  roles: string[];
  accounts: string[];
};

export type getGroupListReturn = {
  groupList: string[];
  groupCount: number;
};

export function getGroupList(rawData: any): getGroupListReturn {
  if (!rawData || !rawData.groups || rawData.groups.length <= 0)
    return { groupList: [], groupCount: 0 };

  const groupList: Groups[] = rawData.groups;

  const result: string[] = groupList.map((value) => value.name);

  return {
    groupList: result,
    groupCount: rawData.total ? rawData.total : result.length
  };
}
/** +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-++-+-+--+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+- */

export type groupViewStatReturn = {
  rowList: GroupViewStat[];
  totalChar: number;
};

export function groupViewStat(
  rawData: any,
  groupId: string
): groupViewStatReturn {
  console.log(' rawData==>228', rawData);

  if (!rawData || rawData.length <= 0) return { rowList: [], totalChar: 0 };

  const groupName = groupId ? groupId : 'no-name';
  const data: RawGroupViewStat[] = rawData;
  console.log(' RawGroupViewStat==>234', data);

  let totalChar = 0;
  const result: GroupViewStat[] = data.map((value) => {
    totalChar += value.total.nbCharacters;
    return {
      id: value.id,
      groupName: groupName,
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
    };
  });

  return {
    rowList: result,
    totalChar: totalChar
  };
}
/** +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-++-+-+--+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+- */

export type profileViewStatReturn = {
  rowList: ProfileViewStat[];
  totalChar: number;
};

export function profileViewStat(rawData: any): profileViewStatReturn {
  if (!rawData || rawData.length <= 0) return { rowList: [], totalChar: 0 };
  let totalChar = 0;
  const data: RawProfileViewStat[] = rawData;

  const result: ProfileViewStat[] = data.map((value) => {
    totalChar += value.totalNbCharacters;
    return {
      id: value.profileId,
      profileName: value.profileName,
      userList: 'data-missing',
      groupList: 'data-missing',
      languagePair: `${value.sourceLanguage.toUpperCase()} > ${value.targetLanguage.toUpperCase()}`,
      sourceLang: value.sourceLanguage,
      targetLang: value.targetLanguage,
      mimeType: 'data-missing',
      userAgent: 'data-missing',
      request: -1,
      success: -1,
      segment: -1,
      segmentInCache: -1,
      character: value.totalNbCharacters,
      characterInCache: -1,
      elapsedTime: value.totalElapsedTime
    };
  });

  return {
    rowList: result,
    totalChar: totalChar
  };
}
