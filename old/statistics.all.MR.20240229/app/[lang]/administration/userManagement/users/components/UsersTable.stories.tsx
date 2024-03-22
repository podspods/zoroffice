import UsersTable from './UsersTable';
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

const usersData = {
  total: 6,
  accounts: [
    {
      name: {
        givenName: 'My',
        familyName: 'User B'
      },
      provider: 'local',
      enable: true,
      localizationLanguage: 'auto',
      old_api_keys: [],
      email: 'userB@systran.fr',
      roles: [
        {
          id: '65bd33970631c0000bc4d9b5',
          name: 'Default User'
        }
      ],
      groups: [
        {
          name: 'Default',
          roles: [],
          rules: [],
          id: '65bd33970631c0000bc4d9c7'
        },
        {
          name: 'Administrator',
          roles: [],
          rules: [],
          id: '65bd33970631c0000bc4d9ce'
        }
      ],
      api_keys: [
        {
          rules: [],
          key: 'c1821cd5-0dc3-46ca-bd20-f11372a9cae6'
        }
      ],
      clientCredentials: [],
      rules: [],
      updatedAt: '2024-02-05T06:47:00.318Z',
      insertedAt: '2024-02-05T06:47:00.318Z',
      __v: 0,
      groupRules: [],
      apiKeyRules: [],
      allCredentialIds: [
        'c1821cd5-0dc3-46ca-bd20-f11372a9cae6'
      ],
      isAnonymousUser: false,
      displayName: 'My User B',
      groupIds: [
        '65bd33970631c0000bc4d9c7',
        '65bd33970631c0000bc4d9ce'
      ],
      groupNames: [
        'Default',
        'Administrator'
      ],
      groupRoles: [],
      groupRoleIds: [],
      roleIds: [
        '65bd33970631c0000bc4d9b5'
      ],
      roleNames: [
        'Default User'
      ],
      allRoles: [
        {
          id: '65bd33970631c0000bc4d9b5',
          name: 'Default User'
        }
      ],
      allRoleIds: [
        '65bd33970631c0000bc4d9b5'
      ],
      allRoleNames: [
        'Default User'
      ],
      id: '65c0846426a3383ead29d6fa',
      apiKeys: [
        {
          disable: false,
          _id: '65c0846426a338e80f29d6fb',
          key: 'c1821cd5-0dc3-46ca-bd20-f11372a9cae6',
          updatedAt: '2024-02-05T06:47:00.419Z',
          createdAt: '2024-02-05T06:47:00.419Z',
          __v: 0
        }
      ],
      current: false
    },
    {
      name: {
        givenName: 'User',
        familyName: 'A'
      },
      provider: 'local',
      enable: true,
      localizationLanguage: 'auto',
      old_api_keys: [],
      email: 'usera@systran.fr',
      roles: [
        {
          id: '65bd33970631c0000bc4d9b5',
          name: 'Default User'
        }
      ],
      groups: [
        {
          name: 'Default',
          roles: [],
          rules: [],
          id: '65bd33970631c0000bc4d9c7'
        },
        {
          name: 'Administrator',
          roles: [],
          rules: [],
          id: '65bd33970631c0000bc4d9ce'
        }
      ],
      api_keys: [
        {
          rules: [],
          key: '818c8d01-c365-4433-934c-f5e3259858c6'
        }
      ],
      clientCredentials: [],
      rules: [],
      updatedAt: '2024-02-05T06:44:53.549Z',
      insertedAt: '2024-02-05T06:44:53.549Z',
      __v: 0,
      groupRules: [],
      apiKeyRules: [],
      allCredentialIds: [
        '818c8d01-c365-4433-934c-f5e3259858c6'
      ],
      isAnonymousUser: false,
      displayName: 'User A',
      groupIds: [
        '65bd33970631c0000bc4d9c7',
        '65bd33970631c0000bc4d9ce'
      ],
      groupNames: [
        'Default',
        'Administrator'
      ],
      groupRoles: [],
      groupRoleIds: [],
      roleIds: [
        '65bd33970631c0000bc4d9b5'
      ],
      roleNames: [
        'Default User'
      ],
      allRoles: [
        {
          id: '65bd33970631c0000bc4d9b5',
          name: 'Default User'
        }
      ],
      allRoleIds: [
        '65bd33970631c0000bc4d9b5'
      ],
      allRoleNames: [
        'Default User'
      ],
      id: '65c083e526a3385be629d66c',
      apiKeys: [
        {
          disable: false,
          _id: '65c083e526a338567b29d66d',
          key: '818c8d01-c365-4433-934c-f5e3259858c6',
          updatedAt: '2024-02-05T06:44:53.641Z',
          createdAt: '2024-02-05T06:44:53.641Z',
          __v: 0
        }
      ],
      current: false
    },
    {
      name: {
        givenName: 'a',
        familyName: 'b'
      },
      provider: 'local',
      enable: false,
      localizationLanguage: 'auto',
      old_api_keys: [],
      email: 'admin66@systran.fr',
      roles: [
        {
          id: '65bd33970631c0000bc4d9b5',
          name: 'Default User'
        }
      ],
      groups: [
        {
          name: 'Default',
          roles: [],
          rules: [],
          id: '65bd33970631c0000bc4d9c7'
        },
        {
          name: 'Administrator',
          roles: [],
          rules: [],
          id: '65bd33970631c0000bc4d9ce'
        }
      ],
      api_keys: [
        {
          rules: [],
          key: '8f433d82-88ec-4848-a60d-341ad101ccd7'
        }
      ],
      clientCredentials: [],
      rules: [],
      updatedAt: '2024-02-04T22:44:25.183Z',
      insertedAt: '2024-02-04T22:43:58.019Z',
      __v: 0,
      groupRules: [],
      apiKeyRules: [],
      allCredentialIds: [
        '8f433d82-88ec-4848-a60d-341ad101ccd7'
      ],
      isAnonymousUser: false,
      displayName: 'a b',
      groupIds: [
        '65bd33970631c0000bc4d9c7',
        '65bd33970631c0000bc4d9ce'
      ],
      groupNames: [
        'Default',
        'Administrator'
      ],
      groupRoles: [],
      groupRoleIds: [],
      roleIds: [
        '65bd33970631c0000bc4d9b5'
      ],
      roleNames: [
        'Default User'
      ],
      allRoles: [
        {
          id: '65bd33970631c0000bc4d9b5',
          name: 'Default User'
        }
      ],
      allRoleIds: [
        '65bd33970631c0000bc4d9b5'
      ],
      allRoleNames: [
        'Default User'
      ],
      id: '65c0132e26a3380c8b299258',
      apiKeys: [
        {
          disable: false,
          _id: '65c0132e26a3383141299259',
          key: '8f433d82-88ec-4848-a60d-341ad101ccd7',
          updatedAt: '2024-02-04T22:43:58.111Z',
          createdAt: '2024-02-04T22:43:58.111Z',
          __v: 0
        }
      ],
      current: false
    },
    {
      name: {
        givenName: 'test',
        familyName: 'a'
      },
      provider: 'local',
      enable: false,
      localizationLanguage: 'auto',
      old_api_keys: [],
      email: 'admin12@systran.fr',
      roles: [
        {
          id: '65bd33970631c0000bc4d9b5',
          name: 'Default User'
        }
      ],
      groups: [
        {
          name: 'Administrator',
          roles: [],
          rules: [],
          id: '65bd33970631c0000bc4d9ce'
        }
      ],
      api_keys: [
        {
          rules: [],
          key: '3ec6ed7c-ca32-4ae3-98fb-6badb3c9a5ea'
        }
      ],
      clientCredentials: [],
      rules: [],
      updatedAt: '2024-02-04T22:40:31.188Z',
      insertedAt: '2024-02-04T22:40:02.183Z',
      __v: 0,
      groupRules: [],
      apiKeyRules: [],
      allCredentialIds: [
        '3ec6ed7c-ca32-4ae3-98fb-6badb3c9a5ea'
      ],
      isAnonymousUser: false,
      displayName: 'test a',
      groupIds: [
        '65bd33970631c0000bc4d9ce'
      ],
      groupNames: [
        'Administrator'
      ],
      groupRoles: [],
      groupRoleIds: [],
      roleIds: [
        '65bd33970631c0000bc4d9b5'
      ],
      roleNames: [
        'Default User'
      ],
      allRoles: [
        {
          id: '65bd33970631c0000bc4d9b5',
          name: 'Default User'
        }
      ],
      allRoleIds: [
        '65bd33970631c0000bc4d9b5'
      ],
      allRoleNames: [
        'Default User'
      ],
      id: '65c0124226a338c11e299183',
      apiKeys: [
        {
          disable: false,
          _id: '65c0124226a338079c299184',
          key: '3ec6ed7c-ca32-4ae3-98fb-6badb3c9a5ea',
          updatedAt: '2024-02-04T22:40:02.300Z',
          createdAt: '2024-02-04T22:40:02.300Z',
          __v: 0
        }
      ],
      current: false
    },
    {
      name: {
        familyName: 'Administrator'
      },
      provider: 'local',
      enable: true,
      localizationLanguage: 'auto',
      old_api_keys: [],
      email: 'admin@systran.fr',
      api_keys: [
        {
          key: '0d437c3b-f544-4ec1-9137-b9259921b8be',
          rules: []
        }
      ],
      roles: [
        {
          id: '65bd33970631c0000bc4d9b5',
          name: 'Default User'
        },
        {
          id: '65bd33970631c0000bc4d991',
          name: 'super'
        }
      ],
      groups: [],
      clientCredentials: [],
      rules: [],
      updatedAt: '2024-02-02T18:25:27.503Z',
      insertedAt: '2024-02-02T18:25:27.503Z',
      __v: 0,
      groupRules: [],
      apiKeyRules: [],
      allCredentialIds: [
        '0d437c3b-f544-4ec1-9137-b9259921b8be'
      ],
      isAnonymousUser: false,
      displayName: 'Administrator',
      groupIds: [],
      groupNames: [],
      groupRoles: [],
      groupRoleIds: [],
      roleIds: [
        '65bd33970631c0000bc4d9b5',
        '65bd33970631c0000bc4d991'
      ],
      roleNames: [
        'Default User',
        'super'
      ],
      allRoles: [
        {
          id: '65bd33970631c0000bc4d9b5',
          name: 'Default User'
        },
        {
          id: '65bd33970631c0000bc4d991',
          name: 'super'
        }
      ],
      allRoleIds: [
        '65bd33970631c0000bc4d9b5',
        '65bd33970631c0000bc4d991'
      ],
      allRoleNames: [
        'Default User',
        'super'
      ],
      id: '65bd33970631c0000bc4d9bd',
      apiKeys: [
        {
          disable: false,
          _id: '65bd33970631c0000bc4d9c4',
          key: '0d437c3b-f544-4ec1-9137-b9259921b8be',
          updatedAt: '2024-02-02T18:25:27.833Z',
          createdAt: '2024-02-02T18:25:27.833Z',
          __v: 0
        }
      ],
      current: true
    },
    {
      name: {
        givenName: 'anonymous'
      },
      provider: 'local',
      enable: true,
      localizationLanguage: 'auto',
      old_api_keys: [],
      email: 'anonymous@systran.fr',
      roles: [
        {
          id: '65bd33970631c0000bc4d999',
          name: 'Anonymous'
        }
      ],
      groups: [],
      api_keys: [
        {
          rules: [],
          key: 'cd51fa34-eab9-4b3f-8f0c-5ceea7cd8f64'
        }
      ],
      clientCredentials: [],
      rules: [],
      updatedAt: '2024-02-02T18:25:27.342Z',
      insertedAt: '2024-02-02T18:25:27.342Z',
      __v: 0,
      groupRules: [],
      apiKeyRules: [],
      allCredentialIds: [
        'cd51fa34-eab9-4b3f-8f0c-5ceea7cd8f64'
      ],
      isAnonymousUser: true,
      displayName: 'anonymous',
      groupIds: [],
      groupNames: [],
      groupRoles: [],
      groupRoleIds: [],
      roleIds: [
        '65bd33970631c0000bc4d999'
      ],
      roleNames: [
        'Anonymous'
      ],
      allRoles: [
        {
          id: '65bd33970631c0000bc4d999',
          name: 'Anonymous'
        }
      ],
      allRoleIds: [
        '65bd33970631c0000bc4d999'
      ],
      allRoleNames: [
        'Anonymous'
      ],
      id: '0',
      apiKeys: [
        {
          disable: false,
          _id: '65bd33970631c0000bc4d9a2',
          key: 'cd51fa34-eab9-4b3f-8f0c-5ceea7cd8f64',
          updatedAt: '2024-02-02T18:25:27.349Z',
          createdAt: '2024-02-02T18:25:27.349Z',
          __v: 0
        }
      ],
      current: false
    }
  ],
  offset: 0,
  limit: 6
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
  permissions: []
};

const passwordRules = [
  {
    name: 'lowercase',
    regex: '[a-z]',
    number: 1,
    error: 'Password must contain 1 lowercase character',
    severity: 'MEDIUM'
  },
  {
    name: 'uppercase',
    regex: '[A-Z]',
    number: 1,
    error: 'Password must contain 1 uppercase character',
    severity: 'MEDIUM'
  },
  {
    name: 'number',
    regex: '[0-9]',
    number: 1,
    error: 'Password must contain 1 number',
    severity: 'MEDIUM'
  },
  {
    name: 'length medium',
    regex: '.',
    number: 10,
    error: 'Password must be 10 characters long at least',
    severity: 'MEDIUM'
  }
]

const meta = {
  title: 'pages/UsersTable',
  args: {
    connectedUserId: userRoles.id,
    hasDeletePermission: true,
    hasDeactivatePermission: true,
    canAddUser: true
  },
  parameters: {
    msw: {
      handlers: [
        rest.get(Apis.user.list, async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(usersData));
        }),
        rest.get(Apis.userRoles, async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(userRoles));
        }),
        rest.get(Apis.password.rules, async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(passwordRules));
        })
      ]
    }
  },
  component: UsersTable
} satisfies Meta<typeof UsersTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
