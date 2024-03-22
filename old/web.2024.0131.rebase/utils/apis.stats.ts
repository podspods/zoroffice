
const Apis = {
  statistics: {
    fullView: '/node/activity/details',
    byUser: (userId: string) => `/node/activity/user/${userId}/details`,
    byGroup: (groupId: string) => `/node/activity/group/${groupId}/details`,
    byProfile: '/node/activity/',
    userList: '/node/admin/users/light',
    groupList: '/node/admin/groups/light',
    profileList: '/node/admin/profile/light'
  }
};

export default Apis;
