import {Meta, StoryObj} from '@storybook/react';
import GroupContainer from './GroupContainer';
import { rest } from 'msw';
import Apis from '@/utils/apis';

const fakei18n = {
  t: function(text: string) {
    return text || '';
  },
  language: ''
};
(global as any).i18n = fakei18n;

const groupData = {
  id: '65cb57b6424bc771edaa355d',
  name: 'myGroup',
  roles: [
    {
      id: '65c9ee9cd011a6000b40dc9d',
      name: 'Administrator',
      removable: true
    },
    {
      id: '65c9ee9cd011a6000b40dca1',
      name: 'IAM Manager',
      removable: true
    }
  ],
  accounts: [
    {
      id: '65c9ee9dd011a6000b40dcb1',
      name: 'Administrator',
      removable: true
    }
  ],
  provider: 'local',
  maxCharactersConsumption: {
    value: 1000,
    ruleId: '65cc872d424bc746abaa3983'
  },
  rules: [
    {
      options: {},
      id: '65cc872d424bc746abaa3983',
      name: 'MAX_CHARACTERS_LIMIT',
      uri: '^((/translation/.+)|(/translate/?$))',
      action: 'DENY',
      conditions: [
        {
          comparator: 'GTE',
          field: 'metadata.stats.groups.65cb57b6424bc771edaa355d.global.nbCharacters',
          threshold: 1000
        }
      ]
    }
  ],
  insertedAt: '2024-02-13T11:51:18.012Z',
  updateAt: '2024-02-14T09:26:05.791Z',
  createdBy: {
    id: '65c9ee9dd011a6000b40dcb1',
    name: 'Administrator'
  },
  __v: 6
};

const userListLight = {
  total: 2,
  accounts: [
    {
      id: '0',
      displayName: 'anonymous',
      groupIds: [],
      current: false
    },
    {
      id: '65c9ee9dd011a6000b40dcb1',
      displayName: 'Administrator',
      groupIds: [
        '65cb57b6424bc771edaa355d'
      ],
      current: true
    }
  ],
  offset: 0,
  limit: 2
};

const roleListLight = [
  {
    id: '65c9ee9cd011a6000b40dc85',
    name: 'super',
    permissions: []
  },
  {
    id: '65c9ee9cd011a6000b40dc8d',
    name: 'Anonymous',
    permissions: []
  },
  {
    id: '65c9ee9cd011a6000b40dc9d',
    name: 'Administrator',
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
    ]
  },
  {
    id: '65c9ee9cd011a6000b40dca1',
    name: 'IAM Manager',
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
    ]
  },
  {
    id: '65c9ee9cd011a6000b40dca4',
    name: 'Resource Manager',
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
    ]
  },
  {
    id: '65c9ee9cd011a6000b40dca7',
    name: 'Default User',
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
    ]
  }
];

const meta = {
  title: 'pages/GroupEditor',
  args: {
    params: {id: '65cb57b6424bc771edaa355d', lang: 'en'},
    disableUsers: false,
    disableRoles: false
  },
  parameters: {
    msw: {
      handlers: [
        rest.get(Apis.group.getGroup('65cb57b6424bc771edaa355d'), async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(groupData));
        }),
        rest.get(Apis.group.getRoleListLight({limit: 50}), async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(roleListLight));
        }),
        rest.get(Apis.group.getUserListLight({limit: 50}), async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(userListLight));
        })
      ]
    }
  },
  component: GroupContainer
} satisfies Meta<typeof GroupContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
