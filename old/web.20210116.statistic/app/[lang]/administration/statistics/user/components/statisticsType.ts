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
    listGroup: (groupId: string) =>
      `/node/activity/group/[${groupId}]/details?date=2023-12&skip=0&limit=10&sortName=request&sortOrder=desc`,
    listAdminGroups: (userId: string) =>
      '/node/admin/groups/light?limit=50&eleFilters[name]=&withRoles=true',
    listGlobal:
      '/node/activity?startDate=1704094671098&endDate=1704481071098&groupBy=profiles&skip=0&limit=10&sortName=date&sortOrder=desc',
    listActivity: (groupId: string) =>
      '/node/activity?startDate=1704194671098&endDate=1704281071098&groupBy=profiles&skip=0&limit=10&sortName=date&sortOrder=desc',
    listProfile: (groupId: string) =>
      '/node/activity/aggregatedStats/daily_chars?apikey=0d437c3b-f544-4ec1-9137-b9259921b8be',

    listUser: (userId: string) =>
      `/node/activity/user/${userId}/details?date=2024-1&skip=0&limit=10&sortName=request&sortOrder=desc`,
    listLight: '/node/admin/users/light?eleFilters[name]=&limit=50',
    listAdmin:
      '/node/activity/details?skip=0&limit=10&sortName=date&sortOrder=desc&startDate=1704301302511&endDate=1704474060000',

    list:
    '/node/activity'
    // '/node/activity?startDate=1704063600000&endDate=1704754800000&groupBy=profiles'
    //  /activity?startDate=1704621927742&endDate=1704708327742&groupBy=profiles&skip=0&limit=10&sortName=date&sortOrder=desc
  }
};

/**
 *
 * par profile : déja aGG : https://spns10-alpha.systran.net/activity?startDate=1704212948930&endDate=1704299348930&groupBy=profiles&skip=0&limit=10&sortName=date&sortOrder=desc


N :https://localhost:3450/node/activity?startDate=1704094671098&endDate=1704481071098&groupBy=profiles&skip=0&limit=10&sortName=date&sortOrder=desc
O: https://localhost:3450     /activity?startDate=1704621927742&endDate=1704708327742&groupBy=profiles&skip=0&limit=10&sortName=date&sortOrder=desc
*
 */
