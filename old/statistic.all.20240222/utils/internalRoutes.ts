const InternalRoutes = {
  translationResource: (id: string) => '/administration/translationResources/' + id,
  serverManagementRoutes: (id: string) => '/administration/serverManagement/routes/' + id,
  users: '/administration/userManagement/users/',
  groups: '/administration/userManagement/groups',
  informationView: '/information/view'
};
export default InternalRoutes;
