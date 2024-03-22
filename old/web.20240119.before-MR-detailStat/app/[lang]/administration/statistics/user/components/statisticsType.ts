import dayjs from 'dayjs';

export const ALL = 'All';

export type Statistic = {
  id: string;
  userName: string;
  groupName: string;
  profileName: string;
  languagePair: string;
  userAgent: string;
  mimeType: string;
  numberChar: number;
};
export type StatisticProfile = {
  id: string;
  profileName: string;
  languagePair: string;
  nbUser: number;
  request: number;
  success: number;
  numberChar: number;
};

export const Apis = {
  statistics: {
    listUser: '/node/admin/users/light?eleFilters[name]=&limit=50',
    listGroup:
      '/node/admin/groups/light?limit=50&eleFilters[name]=&withRoles=true',
    userView: (userId: string) => `/node/activity/user/${userId}/details`,
    // spns10-alpha.systran.net/activity/user/0/details?date=2024-1&skip=0&limit=10&sortName=request&sortOrder=desc

    groupView: (groupId: string) => `/node/activity/group/${groupId}/details`,
    // https://spns-alpha-el8.systran.net/activity/group/659d832714bc9e000da9157f/details?date=2024-1&skip=0&limit=10&sortName=request&sortOrder=desc
    /** ---------------------ok above ------------------------------------ */

    listAdminGroups: (userId: string) =>
      '/node/admin/groups/light?limit=50&eleFilters[name]=&withRoles=true',
    listGlobal:
      '/node/activity?startDate=1704094671098&endDate=1704481071098&groupBy=profiles&skip=0&limit=10&sortName=date&sortOrder=desc',
    listActivity: (groupId: string) =>
      '/node/activity?startDate=1704194671098&endDate=1704281071098&groupBy=profiles&skip=0&limit=10&sortName=date&sortOrder=desc',
    listProfile: (groupId: string) =>
      '/node/activity/aggregatedStats/daily_chars?apikey=0d437c3b-f544-4ec1-9137-b9259921b8be',

    listLight: '/node/admin/users/light?eleFilters[name]=&limit=50',
    listAdmin:
      '/node/activity/details?skip=0&limit=10&sortName=date&sortOrder=desc&startDate=1704301302511&endDate=1704474060000',

    list: '/node/activity'
    // '/node/activity?startDate=1704063600000&endDate=1704754800000&groupBy=profiles'
    //  /activity?startDate=1704621927742&endDate=1704708327742&groupBy=profiles&skip=0&limit=10&sortName=date&sortOrder=desc
  }
};

export function statisticListRoute(userId: string): string {
  if (!userId) return '';
  // https://spns10-alpha.systran.net/activity/user/659d60d2cdbe30000bdc916e/details?date=2024-1&skip=0&limit=10&sortName=request&sortOrder=desc
  // spns10-alpha.systran.net/activity/user/0/details?date=2024-1&skip=0&limit=10&sortName=request&sortOrder=desc

  // console.log('statisticListRoute 77 userId==>', userId);
  // console.log(
  //   '`activity/user/${userId}/details` ==>',
  //   `activity/user/${userId}/details`
  // );

  return `activity/user/${userId}/details`;
}

export const statCategory: string[] = [
  'User',
  'Group',
  'Profile',
  'Session',
  'Global'
];
/**
 *
 * par profile : déja aGG : https://spns10-alpha.systran.net/activity?startDate=1704212948930&endDate=1704299348930&groupBy=profiles&skip=0&limit=10&sortName=date&sortOrder=desc


N :https://localhost:3450/node/activity?startDate=1704094671098&endDate=1704481071098&groupBy=profiles&skip=0&limit=10&sortName=date&sortOrder=desc
O: https://localhost:3450     /activity?startDate=1704621927742&endDate=1704708327742&groupBy=profiles&skip=0&limit=10&sortName=date&sortOrder=desc
*
 */

export type ProfileViewStat = {
  id: string;
  profileName: string;
  groupList: string;
  userList: string; // Userlist concat
  languagePair: string;
  sourceLang: string;
  targetLang: string;
  mimeType: string;
  userAgent: string;
  request: number;
  success: number;
  segment: number;
  segmentInCache: number;
  character: number;
  characterInCache: number;
  elapsedTime: number;
};

export type RawProfileViewStat = {
  total: number;
  totalSuccess: number;
  avgSuccess: number;
  totalError: number;
  avgError: number;
  nbSegments: number;
  nbCacheHits: number;
  totalNbCharacters: number;
  avgNbCharacters: number;
  totalNbTokens: number;
  avgNbTokens: number;
  totalNbTus: number;
  avgNbTus: number;
  totalNbTusFailed: number;
  avgNbTusFailed: number;
  totalElapsedTime: number;
  avgElapsedTime: number;
  sourceLanguage: string;
  targetLanguage: string;
  profileName: string;
  profileId: string;
  selectors: {
    domain: string;
    owner: string;
    size: string;
    tech: {
      name: string;
      type: string;
    };
  };
  totalAccounts: number;
};

export type UserViewStat = {
  id: string;
  profileName: string;
  languagePair: string;
  mimeType: string;
  userAgent: string;
  request: number;
  success: number;
  segment: number;
  segmentInCache: number;
  character: number;
  characterInCache: number;
  elapsedTime: number;
};

export type RawUserViewStat = {
  id: string;
  name: string;
  source: string;
  target: string;
  total: {
    mimeType: string[];
    userAgent: string[];
    request: number;
    success: number;
    nbSegments: number;
    nbCacheHits: number;
    nbCharacters: number;
    nbCharactersCacheHits: number;
    elapsedTime: number;
  };
};

export type RawGroupViewStat = {
  id: string;
  lastUsed: string;
  name: string;
  source: string;
  target: string;
  translationResourceId: string;
  total: {
    mimeType: string[];
    userAgent: string[];
    request: number;
    success: number;
    nbSegments: number;
    nbCacheHits: number;
    nbCharacters: number;
    nbCharactersCacheHits: number;
    elapsedTime: number;
    nbTokens: number;
    nbTus: number;
    nbTusFailed: number;
  };
};

export type GroupViewStat = {
  id: string;
  groupName: string;
  languagePair: string;
  mimeType: string;
  userAgent: string;
  request: number;
  success: number;
  segment: number;
  segmentInCache: number;
  character: number;
  characterInCache: number;
  elapsedTime: number;
};

export type userDetailStat = {
  id: string;
  accountName: string;
  date: string;
  elapsedTime: 122;
  mimetype: string;
  nbCacheHits: number;
  nbCharacters: number;
  nbSegments: number;
  nbTokens: number;
  nbTus: number;
  nbTusFailed: number;
  operation: string;
  profileId: string;
  profileName: string;
  sourceLanguage: string;
  success: boolean;
  targetLanguage: string;
  userAgent: string;
};

export type Group = {
  id: string;
  name: string;
  role: string[];
};

export type User = {
  id: string;
  displayName: string;
  groupIds?: string[];
  current?: boolean;
};

export function currentPeriod(): string {
  return dayjs().format('YYYY-MM');
}

export function getPeriodList(): string[] {
  const array12 = Array(12).fill(1);
  let currentDate = dayjs(); // date actuelle
  const last12month = array12.map(() => {
    const period = currentDate.format('YYYY-MM');
    currentDate = currentDate.subtract(1, 'month');
    return period;
  });
  return last12month;
}
