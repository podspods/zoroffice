const InternalRoutes = {
  translationResource: (id: string) =>
    '/administration/translationResources/' + id,
  serverManagementRoutes: (id: string) =>
    '/administration/serverManagement/routes/' + id,

  service: {
    translationResources: (id: string) =>
      '/advancedConfiguration/translationResources/' + id
  }
};
export default InternalRoutes;
