import React from 'react';
import NavBarIcons from '@systran/react-components/lib/atoms/Icons/NavBarIcons';
import {actions} from '../../../../lib/permissionsList';
import {check} from '../../UserAuthorizations';

export const itemsValidation = [
  {
    categoryTitle: 'TRANSLATION TOOLS',
    navItems: [
      { icon: <NavBarIcons shape='language' />, title: 'Text Translation', link: '/translationTools/text', validateFct: () => check((actions as any).TRSL_BOX) },
      { icon: <NavBarIcons shape='files' />, title: 'File Translation', link: '/translationTools/file', validateFct: () => check((actions as any).TRSL_FILE) },
      { icon: <NavBarIcons shape='soundWave' />, title: 'Speech Translation', link: '/translationTools/speech', validateFct: () => check((actions as any).TRSL_SPEECH) }
    ]
  },
  {
    categoryTitle: 'LINGUISTIC CONFIGURATION',
    navItems: [
      { icon: <NavBarIcons shape='layers' />, title: 'Translation Profiles', link: '/linguisticConfiguration/translationProfiles', validateFct: () => check((actions as any).PROFILES_LIST) },
      {
        icon: <NavBarIcons shape='cubes' />,
        title: 'Resources',
        nestedItems: [
          { title: 'Dictionaries', link: '/linguisticConfiguration/resources/dictionary', validateFct: () => check((actions as any).RSC_DICT_ALL) },
          { title: 'Normalizations', link: '/linguisticConfiguration/resources/normalization', validateFct: () => check((actions as any).RSC_NORM_ALL) },
          { title: 'Translation Memories', link: '/linguisticConfiguration/resources/translationMemory', validateFct: () => check((actions as any).RSC_TM_ALL) }
        ]
      }
    ]
  },
  {
    categoryTitle: 'MONITORING',
    navItems: [
      { icon: <NavBarIcons shape='flag' />, title: 'Translation Reviews', link: '/monitoring/translationReviews', validateFct: () => check((actions as any).FEEDBACK_MGR) },
      { icon: <NavBarIcons shape='userStat' />, title: 'My Statistics', link: '/monitoring/myStatistics', validateFct: () => check((actions as any).USER_PERSONAL_STATS) }
    ]
  }
];

export const adminItemsValidation = {
  categoryTitle: 'ADMIN PANEL',
  navItems: [
    {
      icon: <NavBarIcons shape='usersGear' />, title: 'User Management', nestedItems: [
        { title: 'Users', link: '/administration/userManagement/users', validateFct: () => check((actions as any).ANY_ADMIN_USERS) },
        { title: 'Groups', link: '/administration/userManagement/groups', validateFct: () => check((actions as any).ANY_ADMIN_GROUPS) },
        { title: 'Roles', link: '/administration/userManagement/roles', validateFct: () => check((actions as any).ANY_ADMIN_ROLES) }
      ]
    },
    { icon: <NavBarIcons shape='rectangleHistory' />, title: 'Translation Resources', link: '/administration/translationResources', validateFct: () => check([(actions as any).ADMIN_BASE]) },
    {
      icon: <NavBarIcons shape='chart' />, title: 'Advanced Statistics', nestedItems: [
        { title: 'Aggregated View', link: '/administration/statistics/aggregated', validateFct: () => check((actions as any).ADMIN_STATS) },
        { title: 'Full View', link: '/administration/statistics/fullView', validateFct: () => check((actions as any).ADMIN_STATS) }
      ]
    },
    {
      icon: <NavBarIcons shape='gear' />, title: 'Server Management', nestedItems: [
        { title: 'Server Settings', link: '/administration/serverManagement/settings', validateFct: () => check((actions as any).ADMIN_SETTINGS) },
        { title: 'Info Page Edition', link: '/information/edit', validateFct: () => check((actions as any).ADMIN_INFO) },
        { title: 'Licenses', link: '/administration/serverManagement/licenses', validateFct: () => check((actions as any).ADMIN_LICENSES) },
        { title: 'Service Status', link: '/administration/serverManagement/services', validateFct: () => check([(actions as any).ADMIN_MONITORING]) },
        { title: 'Routes', link: '/administration/serverManagement/routes', validateFct: () => check([(actions as any).ADMIN_BASE]) },
        { title: 'Queues', link: '/administration/serverManagement/queues', validateFct: () => check([(actions as any).ADMIN_BASE]) }
      ]
    }
  ]
};
