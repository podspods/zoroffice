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

export const Apis = {
  statistics: {
    listGroup: (groupId: string) =>
      `/node/activity/group/[${groupId}]/details?date=2023-12&skip=0&limit=10&sortName=request&sortOrder=desc`,
    listAdminGroups: (userId: string) =>
      '/node/admin/groups/light?limit=50&eleFilters[name]=&withRoles=true',
    listGlobal: '/node/activity?startDate=1704094671098&endDate=1704481071098&groupBy=profiles&skip=0&limit=10&sortName=date&sortOrder=desc',
    listActivity: (groupId: string) =>
      '/node/activity?startDate=1704194671098&endDate=1704281071098&groupBy=profiles&skip=0&limit=10&sortName=date&sortOrder=desc',
    listProfile: (groupId: string) =>
      '/node/activity/aggregatedStats/daily_chars?apikey=0d437c3b-f544-4ec1-9137-b9259921b8be',

    list: (userId: string) =>
      `/node/activity/user/${userId}/details?date=2024-1&skip=0&limit=10&sortName=request&sortOrder=desc`,
    listLight: '/node/admin/users/light?eleFilters[name]=&limit=50',
    listAdmin:
      '/node/activity/details?skip=0&limit=10&sortName=date&sortOrder=desc&startDate=1704301302511&endDate=1704474060000'
  }
};

/**
 *
 * par profile : déja aGG : https://spns10-alpha.systran.net/activity?startDate=1704212948930&endDate=1704299348930&groupBy=profiles&skip=0&limit=10&sortName=date&sortOrder=desc

new https://localhost:3450/activity/user/659570d315a664000bca909c/details?date=2024-1&skip=0&limit=10&sortName=request&sortOrder=desc
old https://localhost:3450/activity/user/654b98590e9e5000c7a3ec52/details?date=2024-1&skip=0&limit=10&sortName=request&sortOrder=desc
*
 */
