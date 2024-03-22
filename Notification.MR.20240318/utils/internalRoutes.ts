const InternalRoutes = {
  translationResource: (id: string) =>
    '/administration/translationResources/' + id,
  serverManagementRoutes: (id: string) =>
    '/administration/serverManagement/routes/' + id,
  users: '/administration/userManagement/users/',
  groups: '/administration/userManagement/groups',
  informationView: '/information/view',
  profiler: 'linguisticConfiguration/translationProfiles/',
  tm: 'linguisticConfiguration/resources/translationMemory/',
  tr: 'administration/translationResources/',
  fileTranslation: 'translationTools/file/',
  node: '/advancedConfiguration/computingNode/',
  nodeView: '/advancedConfiguration/computingNode/view/'
};
export default InternalRoutes;
