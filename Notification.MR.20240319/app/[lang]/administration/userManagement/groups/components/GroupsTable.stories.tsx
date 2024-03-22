import GroupsTable from './GroupsTable';
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

const groupsData = {
  groups: [
    {
      id: '65a745e5665400f14ce9481d',
      name: 'INDIVIDUAL_TEST_ABC',
      accounts: [
        {
          id: '65a745e46654007011e9480d',
          name: 'Test ABC'
        }
      ],
      roles: [
        {
          id: '5e456741f2cb967528a16911',
          name: 'SYSTRAN Translate Pro - 2'
        }
      ],
      createdBy: {
        id: '626abf2010155737da321749',
        name: 'J JAH'
      },
      insertedAt: '2024-01-17T03:13:41.076Z',
      updateAt: '2024-01-17T03:19:32.707Z'
    },
    {
      id: '65a743966654006800e947c7',
      name: 'Southeast',
      accounts: [
        {
          id: '65a743966654004183e947bb',
          name: 'Ava Ng'
        },
        {
          id: '65a743966654004183e947bb',
          name: 'Bva Ng'
        },
        {
          id: '65a743966654004183e947bb',
          name: 'Cva Ng'
        },
        {
          id: '65a743966654004183e947bb',
          name: 'Dva Ng'
        },
        {
          id: '65a743966654004183e947bb',
          name: 'Kva Ng'
        },
        {
          id: '65a743966654004183e947bb',
          name: 'Tva Ng'
        },
        {
          id: '65a743966654004183e947bb',
          name: 'Mva Ng'
        }
      ],
      roles: [
        {
          id: '5e456741f2cb967528a16911',
          name: 'SYSTRAN Translate Pro - 2'
        }
      ],
      createdBy: {
        id: '626abf2010155737da321749',
        name: 'Administrator'
      },
      insertedAt: '2024-01-17T03:03:51.000Z',
      updateAt: '2024-01-17T03:03:51.242Z'
    },
    {
      id: '65a743966654001dace94791',
      name: 'auxiliary',
      accounts: [
        {
          id: '65a74396665400580ae94785',
          name: 'Davi Ph'
        },
        {
          id: '65a74396665400580ae94785',
          name: 'Bar Ph'
        }
      ],
      roles: [
        {
          id: '5e456741f2cb967528a16911',
          name: 'SYSTRAN Translate Pro - 2'
        }
      ],
      createdBy: {
        id: '626abf2010155737da321749',
        name: 'Administrator'
      },
      insertedAt: '2024-01-17T03:03:50.208Z',
      updateAt: '2024-01-17T03:03:50.451Z'
    },
    {
      id: '65a74395665400b7f5e9475b',
      name: 'Zieme',
      accounts: [
        {
          id: '65a743956654009123e9474f',
          name: 'Bob En'
        }
      ],
      roles: [
        {
          id: '5e456741f2cb967528a16911',
          name: 'SYSTRAN Translate Pro - 2'
        }
      ],
      createdBy: {
        id: '626abf2010155737da321749',
        name: 'Administrator'
      },
      insertedAt: '2024-01-17T03:03:49.474Z',
      updateAt: '2024-01-17T03:03:49.707Z'
    },
    {
      id: '65a74394665400bb8ae94725',
      name: 'British Indian Ocean Territory (Chagos Archipelago)SkilesBritish Indian Ocean Territory (Chagos Archipelago)',
      accounts: [
        {
          id: '65a74394665400b5ffe94719',
          name: 'Je Boca'
        }
      ],
      roles: [
        {
          id: '5e456741f2cb967528a16911',
          name: 'SYSTRAN Translate Pro - 2'
        }
      ],
      createdBy: {
        id: '626abf2010155737da321749',
        name: 'Administrator'
      },
      insertedAt: '2024-01-17T03:03:48.645Z',
      updateAt: '2024-01-17T03:03:48.919Z'
    },
    {
      id: '65a7437c665400ce62e9468a',
      name: 'Allen',
      accounts: [
        {
          id: '65a7437c6654004b03e9467e',
          name: 'Mic Ma'
        }
      ],
      roles: [
        {
          id: '5e456741f2cb967528a16911',
          name: 'SYSTRAN Translate Pro - 2'
        }
      ],
      createdBy: {
        id: '626abf2010155737da321749',
        name: 'Administrator'
      },
      insertedAt: '2024-01-17T03:03:24.894Z',
      updateAt: '2024-01-17T03:03:26.479Z'
    }
  ],
  total: 125,
  offset: 0,
  limit: 10
}

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
  title: 'pages/GroupsTable',
  args: {
    hasFullEditPermission: true,
    hasDeleteExternalGroupPermission: true
  },
  parameters: {
    msw: {
      handlers: [
        rest.get(Apis.group.list, async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(groupsData));
        }),
        rest.get(Apis.userRoles, async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(userRoles));
        })
      ]
    }
  },
  component: GroupsTable
} satisfies Meta<typeof GroupsTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
