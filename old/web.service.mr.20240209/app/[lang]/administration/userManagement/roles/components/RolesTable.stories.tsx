import RolesTable from './RolesTable';
import {Meta, StoryObj} from '@storybook/react';
import Apis from '@/utils/apis';
import { rest } from 'msw';

const fakei18n = {
  t: function(text: string) {
    return text || '';
  },
  language: ''
};
(global as any).i18n = fakei18n;

const rolesData = {
  offset: 0,
  total: 9,
  roles: [
    {
      permissions: [
        'translation box',
        'translation file PDF',
        'translation file postedit',
        'translation file'
      ],
      name: 'SYSTRAN Translate Enterprise - 3',
      createdBy: {
        id: '65a02b4cd1f619000bf628de',
        name: 'Administrator'
      },
      users: [
        {
          id: '65a11731cb31ff689b703d73',
          name: 'User No4'
        }
      ],
      groups: [
        {
          name: 'Group8',
          id: '65a118fdcb31ff93ae704084'
        },
        {
          name: 'Group7',
          id: '65a118f7cb31ff79f0704077'
        },
        {
          name: 'Group6',
          id: '65a118f3cb31ff833270406a'
        },
        {
          name: 'Group5',
          id: '65a118eecb31ff32d970405d'
        },
        {
          name: 'Group2',
          id: '65a118dbcb31ff917b704036'
        }
      ],
      updatedAt: '2024-01-12T10:41:41.192Z',
      insertedAt: '2024-01-12T10:41:41.192Z',
      id: '65a11765cb31ff943a703e23'
    },
    {
      permissions: [
        'translation box settings',
        'translation file',
        'translation file postedit',
        'translation file PDF'
      ],
      name: 'testRole2',
      createdBy: {
        id: '65a02b4cd1f619000bf628de',
        name: 'Administrator'
      },
      users: [
        {
          id: '65a11684cb31ffc9d1703b9d',
          name: 'MyUser No2'
        },
        {
          id: '65a116eccb31ff7dd8703cae',
          name: 'Auser No3'
        },
        {
          id: '65a11884cb31ff2cf2703f88',
          name: 'Cuser No5'
        }
      ],
      groups: [
        {
          name: 'Group8',
          id: '65a118fdcb31ff93ae704084'
        },
        {
          name: 'Group7',
          id: '65a118f7cb31ff79f0704077'
        },
        {
          name: 'Group6',
          id: '65a118f3cb31ff833270406a'
        }
      ],
      updatedAt: '2024-01-12T10:36:31.554Z',
      insertedAt: '2024-01-12T10:36:31.554Z',
      id: '65a1162fcb31ff685b703b2b'
    },
    {
      permissions: [
        'translation box',
        'translation box settings',
        'translation file',
        'translation file postedit',
        'translation speech',
        'translation file PDF'
      ],
      name: 'SYSTRAN Translate Enterprise - 1',
      createdBy: {
        id: '65a02b4cd1f619000bf628de',
        name: 'Administrator'
      },
      users: [
        {
          id: '65a115e3cb31ff1fc6703a94',
          name: 'User no1'
        },
        {
          id: '65a11684cb31ffc9d1703b9d',
          name: 'MyUser no2'
        },
        {
          id: '65a116eccb31ff7dd8703cae',
          name: 'Auser no3'
        },
        {
          id: '65a11884cb31ff2cf2703f88',
          name: 'Cuser No5'
        },
        {
          id: '65a11731cb31ff689b703d73',
          name: 'Buser no4'
        },
        {
          id: '65a11731cb31ff689b703d00',
          name: 'TestUser no4'
        },
        {
          id: '65a11731cb31ff689b703d00',
          name: 'Toto N'
        }
      ],
      groups: [
        {
          name: 'Group8',
          id: '65a118fdcb31ff93ae704084'
        },
        {
          name: 'Group7',
          id: '65a118f7cb31ff79f0704077'
        },
        {
          name: 'Group6',
          id: '65a118f3cb31ff833270406a'
        }
      ],
      updatedAt: '2024-01-12T10:32:35.180Z',
      insertedAt: '2024-01-12T10:32:35.180Z',
      id: '65a11543cb31ff79db703a03'
    },
    {
      permissions: [
        'user',
        'user self update',
        'user personal statistics',
        'notifications',
        'help',
        'feedback submit',
        'translation box',
        'translation box settings',
        'translation concordance',
        'translation file',
        'translation file postedit',
        'translation file PDF',
        'labs',
        'user api keys',
        'user api credentials',
        'user active applications'
      ],
      users: [
        {
          id: '65a02b4cd1f619000bf628de',
          name: 'Administrator'
        },
        {
          id: '65a11684cb31ffc9d1703b9d',
          name: 'MyUser no2'
        },
        {
          id: '65a116eccb31ff7dd8703cae',
          name: 'Auser no3'
        },
        {
          id: '65a11884cb31ff2cf2703f88',
          name: 'Cuser No5'
        }
      ],
      groups: [
        {
          name: 'Group8',
          id: '65a118fdcb31ff93ae704084'
        },
        {
          name: 'Group7',
          id: '65a118f7cb31ff79f0704077'
        },
        {
          name: 'Group6',
          id: '65a118f3cb31ff833270406a'
        }
      ],
      name: 'Default User',
      updatedAt: '2024-01-11T17:54:20.471Z',
      insertedAt: '2024-01-11T17:54:20.471Z',
      id: '65a02b4cd1f619000bf628d6'
    },
    {
      permissions: [
        'user',
        'user self update',
        'user personal statistics',
        'notifications',
        'help',
        'feedback submit',
        'translation box',
        'translation box settings',
        'translation concordance',
        'translation file',
        'translation file postedit',
        'translation file PDF',
        'labs',
        'user api keys',
        'user api credentials',
        'user active applications',
        'groups statistics',
        'users statistics',
        'aggregated statistics',
        'admin information',
        'list users',
        'list groups',
        'list roles',
        'ses profile manager',
        'configure active profile',
        'configure public active profile',
        'ses resources concordance',
        'ses resources concordance list',
        'ses resources dictionaries',
        'ses resources dictionaries list',
        'ses resources dictionaries all',
        'ses resources normalizations',
        'ses resources normalizations list',
        'ses resources normalizations all',
        'ses resources translation memories',
        'ses resources translation memories list',
        'ses resources translation memories all',
        'feedback manager',
        'view all private tr'
      ],
      users: [
        {
          id: '65a11684cb31ffc9d1703b9d',
          name: 'MyUser no2'
        }
      ],
      groups: [
        {
          name: 'Group8',
          id: '65a118fdcb31ff93ae704084'
        },
        {
          name: 'Group7',
          id: '65a118f7cb31ff79f0704077'
        }
      ],
      name: 'Resource Manager',
      updatedAt: '2024-01-11T17:54:20.437Z',
      insertedAt: '2024-01-11T17:54:20.437Z',
      id: '65a02b4cd1f619000bf628d2'
    },
    {
      permissions: [
        'list self users',
        'list self groups',
        'list self roles',
        'list users',
        'list groups',
        'list roles',
        'admin self users',
        'admin self groups',
        'admin self roles',
        'admin users',
        'admin groups',
        'admin roles',
        'delete users',
        'delete external group',
        'admin api keys',
        'admin api credentials',
        'admin active applications'
      ],
      users: [
        {
          id: '65a116eccb31ff7dd8703cae',
          name: 'Auser no3'
        },
        {
          id: '65a11684cb31ffc9d1703b9d',
          name: 'MyUser no2'
        }
      ],
      groups: [
        {
          name: 'Group8',
          id: '65a118fdcb31ff93ae704084'
        },
        {
          name: 'Group7',
          id: '65a118f7cb31ff79f0704077'
        }
      ],
      name: 'IAM Manager',
      updatedAt: '2024-01-11T17:54:20.425Z',
      insertedAt: '2024-01-11T17:54:20.425Z',
      id: '65a02b4cd1f619000bf628ce'
    },
    {
      permissions: [
        'user',
        'user self update',
        'user personal statistics',
        'notifications',
        'help',
        'feedback submit',
        'translation box',
        'translation box settings',
        'translation concordance',
        'translation file',
        'translation file postedit',
        'translation file PDF',
        'labs',
        'user api keys',
        'user api credentials',
        'user active applications',
        'groups statistics',
        'users statistics',
        'aggregated statistics',
        'admin information',
        'list users',
        'list groups',
        'list roles',
        'ses profile manager',
        'configure active profile',
        'configure public active profile',
        'ses resources concordance',
        'ses resources concordance list',
        'ses resources dictionaries',
        'ses resources dictionaries list',
        'ses resources dictionaries all',
        'ses resources normalizations',
        'ses resources normalizations list',
        'ses resources normalizations all',
        'ses resources translation memories',
        'ses resources translation memories list',
        'ses resources translation memories all',
        'feedback manager',
        'view all private tr',
        'admin',
        'admin profiles',
        'admin statistics',
        'admin monitoring',
        'admin settings',
        'admin license'
      ],
      users: [
        {
          id: '65a115e3cb31ff1fc6703a94',
          name: 'User no1'
        },
        {
          id: '65a11684cb31ffc9d1703b9d',
          name: 'MyUser no2'
        },
        {
          id: '65a116eccb31ff7dd8703cae',
          name: 'Auser no3'
        }
      ],
      groups: [
        {
          name: 'Group8',
          id: '65a118fdcb31ff93ae704084'
        },
        {
          name: 'Group7',
          id: '65a118f7cb31ff79f0704077'
        }
      ],
      name: 'Administrator',
      updatedAt: '2024-01-11T17:54:20.393Z',
      insertedAt: '2024-01-11T17:54:20.393Z',
      id: '65a02b4cd1f619000bf628cb'
    },
    {
      permissions: [],
      users: [
        {
          id: '0',
          name: 'anonymous'
        }
      ],
      groups: [],
      name: 'Anonymous',
      updatedAt: '2024-01-11T17:54:20.191Z',
      insertedAt: '2024-01-11T17:54:20.191Z',
      id: '65a02b4cd1f619000bf628ba'
    },
    {
      permissions: [],
      users: [
        {
          id: '65a02b4cd1f619000bf628de',
          name: 'Administrator'
        }
      ],
      groups: [],
      name: 'super',
      updatedAt: '2024-01-11T17:54:20.045Z',
      insertedAt: '2024-01-11T17:54:20.045Z',
      id: '65a02b4cd1f619000bf628b4'
    }
  ],
  limit: 9
};

const userRoles = {
  name: {
    familyName: 'Administrator'
  },
  provider: 'local',
  enable: true,
  email: 'admin@systran.fr',
  groups: [],
  roles: [
    {
      id: '64dc0476b5df1b167659e69b',
      name: 'Default User'
    },
    {
      id: '64dc0474b5df1b167659e67b',
      name: 'super'
    }
  ],
  displayName: 'Administrator',
  groupRoles: [],
  id: '64dc0476b5df1b167659e6a1',
  permissions: [
    {
      name: 'translation box',
      description: 'TT010-Traduction de texte'
    },
    {
      name: 'translation box settings',
      description: 'TT011-Modifier les options de traduction de texte'
    },
    {
      name: 'translation file',
      description: 'TT020-Traduction de fichiers'
    },
    {
      name: 'translation file postedit',
      description: 'TT021-Outils de post-édition'
    },
    {
      name: 'translation file PDF',
      description: 'TT022-Traduction de fichiers PDF'
    },
    {
      name: 'translation speech',
      description: 'TT040-Traduction de la parole'
    },
    {
      name: 'translation speech postedit',
      description: 'TT041-Outils de post-édition des fichiers audio'
    },
    {
      name: 'user',
      description: 'IN001-Accèder à mes informations personnelles'
    },
    {
      name: 'user self update',
      description: 'IN002-Modifier les informations personnelles'
    },
    {
      name: 'notifications',
      description: 'IN010-Afficher les notifications système'
    },
    {
      name: 'information',
      description: 'IN020-Afficher la page'
    },
    {
      name: 'help',
      description: 'IN030-Afficher la page'
    },
    {
      name: 'admin information',
      description: 'IN991-Gérer la page du serveur'
    },
    {
      name: 'user api keys',
      description: 'IN041-Gérer mes clés API'
    },
    {
      name: 'user api credentials',
      description: 'IN042-Gérer mes informations API'
    },
    {
      name: 'user active applications',
      description: 'IN043-Gérer les applications actives personnelles'
    },
    {
      name: 'ses profile manager',
      description: 'PM001-Accèder à la liste des profils'
    },
    {
      name: 'configure active profile',
      description: 'PM002-Créer des profils'
    },
    {
      name: 'configure shared active profile',
      description: 'PM003-Créer et partager des profils'
    },
    {
      name: 'profiles update tr',
      description: 'PM004-Mettre à jour les TR des profils'
    },
    {
      name: 'configure public active profile',
      description: 'PM991-Créer et partager des profils publics'
    },
    {
      name: 'admin profiles',
      description: 'PM992-Lister tous les profils du serveur'
    },
    {
      name: 'ses resources dictionaries list',
      description: 'RM010-Lister et gérer des dictionnaires'
    },
    {
      name: 'ses resources dictionaries',
      description: 'RM011-Créer des dictionnaires'
    },
    {
      name: 'ses resources dictionaries all',
      description: 'RM910-Lister tous les dictionnaires du serveur'
    },
    {
      name: 'ses resources normalizations list',
      description: 'RM020-Lister et gérer les dictionnaires de normalisations'
    },
    {
      name: 'ses resources normalizations',
      description: 'RM021-créer des dictionnaires de normalisations'
    },
    {
      name: 'ses resources normalizations all',
      description: 'RM920-Lister tous les dictionaires de normalisation du serveur'
    },
    {
      name: 'ses resources translation memories list',
      description: 'RM030-Lister et gérer les mémoires de traduction'
    },
    {
      name: 'ses resources translation memories',
      description: 'RM031-Créer des mémoires de traduction'
    },
    {
      name: 'ses resources translation memories all',
      description: 'RM930-Lister toutes les mémoires de traduction du serveur'
    },
    {
      name: 'feedback submit',
      description: 'FB001-Envoyer les commentaires de traduction'
    },
    {
      name: 'feedback manager',
      description: 'FB990-Gérer les commentaires de traduction'
    },
    {
      name: 'user create',
      description: 'IAM001-Activer'
    },
    {
      name: 'list self users',
      description: 'IAM010-Lister les utilisateurs de mes groupes'
    },
    {
      name: 'list self groups',
      description: 'IAM011-Lister mes groupes'
    },
    {
      name: 'list self roles',
      description: 'IAM012-Lister mes rôles'
    },
    {
      name: 'admin self users',
      description: 'IAM101-Gérer les utilisateurs de mes groupes'
    },
    {
      name: 'admin self groups',
      description: 'IAM102-Gérer mes groupes'
    },
    {
      name: 'admin self roles',
      description: 'IAM103-Gérer mes rôles'
    },
    {
      name: 'list users',
      description: 'IAM201-Lister tous les utilisateurs'
    },
    {
      name: 'list groups',
      description: 'IAM202-Lister tous les groupes'
    },
    {
      name: 'list roles',
      description: 'IAM203-Lister tous les rôles'
    },
    {
      name: 'delete users',
      description: 'IAM300-Supprimer les utilisateurs'
    },
    {
      name: 'admin api keys',
      description: 'IAM301-Gérer toutes les clés API'
    },
    {
      name: 'admin api credentials',
      description: 'IAM302-Gérer les informations API'
    },
    {
      name: 'admin active applications',
      description: 'IAM303-Gérer les applications actives'
    },
    {
      name: 'admin users',
      description: 'IAM991-Gérer tous les utilisateurs'
    },
    {
      name: 'admin groups',
      description: 'IAM992-Gérer tous les groupes'
    },
    {
      name: 'admin roles',
      description: 'IAM993-Gérer tous les rôles'
    },
    {
      name: 'admin rules',
      description: 'IAM994-Gérer toutes les règles'
    },
    {
      name: 'disable global rules',
      description: 'IAM995-Désactiver les règles globales'
    },
    {
      name: 'delete external group',
      description: 'IAM996-Supprimer un groupe externe'
    },
    {
      name: 'user personal statistics',
      description: 'TA001-Afficher les statistiques personnelles'
    },
    {
      name: 'users statistics',
      description: 'TA002-Afficher les statistiques par utilisateur'
    },
    {
      name: 'groups statistics',
      description: 'TA003-Afficher les statistiques des groupes'
    },
    {
      name: 'aggregated statistics',
      description: 'TA004-Afficher les statistiques agrégées'
    },
    {
      name: 'admin statistics',
      description: 'TA900-Afficher toutes les statistiques du serveur'
    },
    {
      name: 'admin license',
      description: 'SC901-Gérer les licences de serveur'
    },
    {
      name: 'admin settings',
      description: 'SC902-Gérer les paramètres du serveur'
    },
    {
      name: 'admin monitoring',
      description: 'SC903-Gérer la surveillance des serveurs'
    },
    {
      name: 'admin',
      description: 'SC911-Gérer les ressources de traduction du serveur'
    },
    {
      name: 'push trsLocal',
      description: 'SC912-Publier des ressources de traduction vers le TRS Local'
    },
    {
      name: 'view all private tr',
      description: 'SC913-Afficher toutes les TRs privées'
    },
    {
      name: 'create limit aggregated stats',
      description: 'LI001-Créer des limites basées sur les statistiques agrégées'
    },
    {
      name: 'list limit aggregated stats',
      description: 'LI002-Lister les limites basées sur les statistiques agrégées'
    },
    {
      name: 'delete limit aggregated stats',
      description: 'LI003-Supprimer des limites basées sur les statistiques agrégées'
    },
    {
      name: 'delete all limits aggregated stats',
      description: 'LI004-Supprimer toutes les limites basées sur les statistiques agrégées'
    },
    {
      name: 'list domains',
      description: 'FT001-Lister les domaines disponibles'
    },
    {
      name: 'labs',
      description: '-Labs'
    }
  ]
};


const meta = {
  title: 'pages/RolesTable',
  args: {
    hasFullEditPermission: true
  },
  parameters: {
    msw: {
      handlers: [
        rest.get(Apis.role.list, async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(rolesData));
        }),
        rest.get(Apis.userRoles, async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(userRoles));
        })
      ]
    }
  },
  component: RolesTable
} satisfies Meta<typeof RolesTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
