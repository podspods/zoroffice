import { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import Apis from '@/utils/apis';
import AdministrationStatisticsAggregated from './page';

const meta: Meta<typeof AdministrationStatisticsAggregated> = {
  title: 'pages/AdministrationStatisticsAggregated',
  component: AdministrationStatisticsAggregated,
  parameters: {
    msw: {
      handlers: [
        rest.get(Apis.statistics.userList, async (req, res, ctx) => {
          return res(ctx.delay(10), ctx.json(fakeDataAccountList));
        }),
        rest.get(Apis.statistics.byUser('0'), async (req, res, ctx) => {
          return res(ctx.delay(10), ctx.json(fakeDataUserView.anonymous));
        }),
        rest.get(Apis.statistics.byUser('1'), async (req, res, ctx) => {
          return res(ctx.delay(10), ctx.json(fakeDataUserView.Scim_1));
        }),
        rest.get(
          Apis.statistics.byUser('659d832714bc9e000da91571'),
          async (req, res, ctx) => {
            return res(ctx.delay(10), ctx.json(fakeDataUserView.Administrator));
          }
        ),
        rest.get(Apis.statistics.groupList, async (req, res, ctx) => {
          return res(ctx.delay(10), ctx.json(fakeDatagroupList));
        }),
        rest.get(Apis.statistics.byGroup('1'), async (req, res, ctx) => {
          return res(ctx.delay(10), ctx.json(fakeDataGroupView.Systran));
        }),
        rest.get(
          Apis.statistics.byGroup('659d832714bc9e000da9157f'),
          async (req, res, ctx) => {
            return res(
              ctx.delay(10),
              ctx.json(fakeDataGroupView.Administrator)
            );
          }
        ),
        rest.get(Apis.statistics.byGroup('659d832714bc9e000da91579'), async (req, res, ctx) => {
          return res(ctx.delay(10), ctx.json(fakeDataGroupView.others));
        }),
        rest.get(Apis.statistics.byProfile, async (req, res, ctx) => {
          return res(ctx.delay(10), ctx.json(fakeDataProfileView));
        })
      ]
    }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};


/**  ____________________ fake data ___________________________________ */
const fakeDataAccountList = {
  total: 6,
  accounts: [
    {
      id: '0',
      displayName: 'anonymous',
      groupIds: [],
      current: false
    },
    {
      id: '659d832714bc9e000da91571',
      displayName: 'Administrator',
      groupIds: [],
      current: true
    },
    {
      id: '1',
      displayName: 'Scim_1',
      groupIds: [],
      current: false
    },
    {
      id: '2',
      displayName: 'Scim_2',
      groupIds: [],
      current: false
    },
    {
      id: '3',
      displayName: 'Scim_3',
      groupIds: [],
      current: false
    },
    {
      id: '4',
      displayName: 'Scim_4',
      groupIds: [],
      current: false
    }
  ],
  offset: 0,
  limit: 50
};

const fakeDataUserView = {
  anonymous: {
    global: {
      elapsedTime: 1600,
      lastUsed: '2024-01-04T17:06:48.045Z',
      mimeType: ['text/plain'],
      nbCacheHits: 1,
      nbCharacters: 50,
      nbCharactersCacheHits: 3,
      nbSegments: 9,
      nbTus: 11,
      nbTusFailed: 100000,
      request: 9,
      success: 9,
      userAgent: ['Translation Box']
    },
    id: '0',
    name: 'anonymous',
    date: '2024-1',
    data: [
      {
        id: '3e1f279e-b116-42d7-9d3b-997f4a1b8bec',
        lastUsed: '2024-01-04T17:06:48.045Z',
        name: 'Translator NMT Generic (L) - FREN',
        source: 'uu',
        target: 'EN',
        total: {
          elapsedTime: 100,
          mimeType: ['text/plain'],
          nbCacheHits: 101,
          nbCharacters: 102,
          nbCharactersCacheHits: 103,
          nbSegments: 104,
          nbTus: 105,
          nbTusFailed: 106,
          request: 107,
          success: 108,
          userAgent: ['Translation Box -> anonymous']
        },
        translationResourceId: '10b0b924-8e39-43ea-81c8-cc62478b25fa'
      }
    ],
    total: 1,
    offset: 0
  },

  Scim_1: {
    global: {
      elapsedTime: 1600,
      lastUsed: '2024-01-04T17:06:48.045Z',
      mimeType: ['text/plain'],
      nbCacheHits: 1,
      nbCharacters: 50,
      nbCharactersCacheHits: 3,
      nbSegments: 9,
      nbTus: 11,
      nbTusFailed: 0,
      request: 9,
      success: 9,
      userAgent: ['Translation Box']
    },
    id: '1',
    name: 'Scim_1',
    date: '2024-1',
    data: [
      {
        id: 'Scim_1-1',
        lastUsed: '2024-01-04T17:06:48.045Z',
        name: 'S1T1Translator NMT Generic (L) - FREN',
        source: 'FR',
        target: 'EN',
        total: {
          elapsedTime: 1100,
          mimeType: ['text/plain'],
          nbCacheHits: 1101,
          nbCharacters: 1102,
          nbCharactersCacheHits: 1103,
          nbSegments: 1104,
          nbTus: 1105,
          nbTusFailed: 1106,
          request: 1107,
          success: 1108,
          userAgent: ['Translation Box -> Scim_1']
        },
        translationResourceId: '10b0b924-8e39-43ea-81c8-cc62478b25fa'
      },
      {
        id: 'Scim_1-2',
        lastUsed: '2024-01-04T17:06:48.045Z',
        name: 'Translator NMT Generic (L) - FREN',
        source: 'ZH',
        target: 'ES',
        total: {
          elapsedTime: 11100,
          mimeType: ['text/plain'],
          nbCacheHits: 11101,
          nbCharacters: 11102,
          nbCharactersCacheHits: 11103,
          nbSegments: 11104,
          nbTus: 11105,
          nbTusFailed: 11106,
          request: 11107,
          success: 11108,
          userAgent: ['Translation Box -> Scim_1-2']
        },
        translationResourceId: '10b0b924-8e39-43ea-81c8-cc62478b25fa'
      }
    ],
    total: 2,
    offset: 0
  },

  Administrator: {
    global: {
      elapsedTime: 266594,
      lastUsed: '2024-01-17T17:25:02.092Z',
      mimeType: [
        'text/plain',
        'text/html-old',
        'text/rtf',
        'xml/application',
        'application/vnd.openxmlformats'
      ],
      nbCacheHits: 4234,
      nbCharacters: 237902,
      nbCharactersCacheHits: 179629,
      nbSegments: 7729,
      nbTokens: 0,
      nbTus: 10318,
      nbTusFailed: 0,
      request: 190,
      success: 188,
      userAgent: [
        'Integration test',
        'gateway',
        'File Translate Box',
        'Translation Box'
      ]
    },
    id: '659d832714bc9e000da91571',
    name: 'Administrator',
    date: '2024-1',
    data: [
      {
        id: 'ea492ae3-adbf-4c02-950e-3dc41dfbac51',
        lastUsed: '2024-01-11T13:24:43.406Z',
        name: 'Translator NMT Generic (L) - FREN',
        source: 'fr',
        target: 'en',
        total: {
          elapsedTime: 112757,
          mimeType: [
            'text/plain',
            'text/html-old',
            'text/rtf',
            'xml/application'
          ],
          nbCacheHits: 4173,
          nbCharacters: 196357,
          nbCharactersCacheHits: 173939,
          nbSegments: 7215,
          nbTokens: 0,
          nbTus: 9792,
          nbTusFailed: 0,
          request: 125,
          success: 125,
          userAgent: ['Integration test', 'gateway', 'Translation Box']
        },
        translationResourceId: 'c1659c3e-83d9-4252-a759-2b894d2fabfb'
      },
      {
        id: 'd61e807e-90ee-4332-9e98-97b300463b15',
        lastUsed: '2024-01-10T10:02:22.105Z',
        name: 'Filter',
        source: 'ar',
        target: 'fr',
        total: {
          elapsedTime: 7628,
          mimeType: ['text/plain', 'application/vnd.openxmlformats'],
          nbCacheHits: 0,
          nbCharacters: 0,
          nbCharactersCacheHits: 0,
          nbSegments: 0,
          nbTokens: 0,
          nbTus: 0,
          nbTusFailed: 0,
          request: 31,
          success: 31,
          userAgent: ['Integration test', 'File Translate Box']
        },
        translationResourceId: 'b866d27f-4f16-44b4-b53d-8723ffd5daa8'
      },
      {
        id: '0522041e-e5a7-471c-bdcc-7f5cd54a8341',
        lastUsed: '2024-01-17T17:25:02.092Z',
        name: 'Translator NMT Generic (L) - ENFR',
        source: 'en',
        target: 'fr',
        total: {
          elapsedTime: 19186,
          mimeType: ['text/plain', 'application/vnd.openxmlformats'],
          nbCacheHits: 8,
          nbCharacters: 7521,
          nbCharactersCacheHits: 1264,
          nbSegments: 82,
          nbTokens: 0,
          nbTus: 86,
          nbTusFailed: 0,
          request: 14,
          success: 12,
          userAgent: [
            'Integration test',
            'File Translate Box',
            'Translation Box'
          ]
        },
        translationResourceId: '548b59bd-4a81-4743-ba4c-a0c0768c9acc'
      },
      {
        id: '41c97162-3e3e-4c9c-9c67-3f46bd0b68eb',
        lastUsed: '2024-01-09T17:39:45.463Z',
        name: 'Translator NMT Generic (L) - ZHEN',
        source: 'zh-Hans',
        target: 'en',
        total: {
          elapsedTime: 655,
          mimeType: ['text/plain'],
          nbCacheHits: 3,
          nbCharacters: 28,
          nbCharactersCacheHits: 21,
          nbSegments: 4,
          nbTokens: 0,
          nbTus: 4,
          nbTusFailed: 0,
          request: 4,
          success: 4,
          userAgent: ['Integration test']
        },
        translationResourceId: 'fb8cc1e6-9876-49d0-b906-c8b3cc5dfd62'
      },
      {
        id: 'b2038378-541c-472c-a8f6-982aa9e31a35',
        lastUsed: '2024-01-09T17:39:21.867Z',
        name: 'profile with options',
        source: 'fr',
        target: 'en',
        total: {
          elapsedTime: 1692,
          mimeType: ['text/plain'],
          nbCacheHits: 2,
          nbCharacters: 684,
          nbCharactersCacheHits: 456,
          nbSegments: 3,
          nbTokens: 0,
          nbTus: 6,
          nbTusFailed: 0,
          request: 3,
          success: 3,
          userAgent: ['Integration test']
        },
        translationResourceId: 'c1659c3e-83d9-4252-a759-2b894d2fabfb'
      },
      {
        id: 'b5e678d6-c666-4236-9c3b-9b9ac31c231e',
        lastUsed: '2024-01-09T17:39:21.927Z',
        name: 'profile without options',
        source: 'fr',
        target: 'en',
        total: {
          elapsedTime: 1401,
          mimeType: ['text/plain'],
          nbCacheHits: 2,
          nbCharacters: 684,
          nbCharactersCacheHits: 456,
          nbSegments: 3,
          nbTokens: 0,
          nbTus: 6,
          nbTusFailed: 0,
          request: 3,
          success: 3,
          userAgent: ['Integration test']
        },
        translationResourceId: 'c1659c3e-83d9-4252-a759-2b894d2fabfb'
      },
      {
        id: '1d698bfd-f5e0-48e6-8222-f5084cc29520',
        lastUsed: '2024-01-09T17:43:59.408Z',
        name: 'profile with corpus',
        source: 'en',
        target: 'fr',
        total: {
          elapsedTime: 446,
          mimeType: ['text/plain'],
          nbCacheHits: 1,
          nbCharacters: 74,
          nbCharactersCacheHits: 37,
          nbSegments: 2,
          nbTokens: 0,
          nbTus: 2,
          nbTusFailed: 0,
          request: 2,
          success: 2,
          userAgent: ['Integration test']
        },
        translationResourceId: '55ad1e06-23aa-42e7-bcd4-ba1fdc97ec9d'
      },
      {
        id: '9cfbfb82-7ea4-408b-9c32-e104918a36f0',
        lastUsed: '2024-01-09T17:43:59.454Z',
        name: 'profile with dictionary',
        source: 'en',
        target: 'fr',
        total: {
          elapsedTime: 493,
          mimeType: ['text/plain'],
          nbCacheHits: 1,
          nbCharacters: 74,
          nbCharactersCacheHits: 37,
          nbSegments: 2,
          nbTokens: 0,
          nbTus: 2,
          nbTusFailed: 0,
          request: 2,
          success: 2,
          userAgent: ['Integration test']
        },
        translationResourceId: '55ad1e06-23aa-42e7-bcd4-ba1fdc97ec9d'
      },
      {
        id: '825b6237-2854-4c7c-967a-2c824e6afe85',
        lastUsed: '2024-01-10T10:03:20.942Z',
        name: 'Translator NMT Generic (L) - ARFR',
        source: 'ar',
        target: 'fr',
        total: {
          elapsedTime: 118888,
          mimeType: ['application/vnd.openxmlformats'],
          nbCacheHits: 44,
          nbCharacters: 31950,
          nbCharactersCacheHits: 3419,
          nbSegments: 414,
          nbTokens: 0,
          nbTus: 414,
          nbTusFailed: 0,
          request: 2,
          success: 2,
          userAgent: ['File Translate Box']
        },
        translationResourceId: 'ed0799bc-2cbe-4efb-ab64-d36ce9071d91'
      },
      {
        id: 'f06d9a68-8aa9-4d5d-8cc4-1bb0219f1e82',
        lastUsed: '2024-01-09T17:39:20.525Z',
        name: 'profile with options and domain=UnitTests',
        source: 'fr',
        target: 'en',
        total: {
          elapsedTime: 1386,
          mimeType: ['text/plain'],
          nbCacheHits: 0,
          nbCharacters: 228,
          nbCharactersCacheHits: 0,
          nbSegments: 1,
          nbTokens: 0,
          nbTus: 2,
          nbTusFailed: 0,
          request: 1,
          success: 1,
          userAgent: ['Integration test']
        },
        translationResourceId: 'c1659c3e-83d9-4252-a759-2b894d2fabfb'
      }
    ],
    total: 10,
    offset: 0
  }
};

const fakeDatagroupList = {
  groups: [
    {
      name: 'Administrator',
      roles: [],
      accounts: [],
      id: '659d832714bc9e000da9157f'
    },
    {
      name: 'Systran',
      roles: [],
      accounts: [],
      id: '1'
    },
    {
      name: 'Default',
      roles: [],
      accounts: [],
      id: '659d832714bc9e000da91579'
    }
  ],
  total: 3,
  offset: 0,
  limit: 3
};

const fakeDataGroupView = {
  Systran: {
    global: {
      elapsedTime: 1189265,
      lastUsed: '2024-01-10T13:25:33.027Z',
      mimeType: ['text/plain'],
      nbCacheHits: 176,
      nbCharacters: 43289,
      nbCharactersCacheHits: 5629,
      nbSegments: 772,
      nbTokens: 0,
      nbTus: 803,
      nbTusFailed: 0,
      request: 693,
      success: 693,
      userAgent: ['Translation Box']
    },
    id: '5beef5283cdb62553e6a8244',
    name: 'ServerAdministrators',
    date: '2024-1',
    data: [
      {
        id: '0b67f940-b3b2-4590-9d78-76c7ca02204c',
        lastUsed: '2024-01-05T11:37:33.803Z',
        name: '[LINGTEST] ENFR Systran Generic (L) 9.3.3',
        source: 'en',
        target: 'fr',
        total: {
          elapsedTime: 270462,
          mimeType: ['text/plain'],
          nbCacheHits: 52,
          nbCharacters: 14706,
          nbCharactersCacheHits: 2750,
          nbSegments: 277,
          nbTokens: 0,
          nbTus: 346,
          nbTusFailed: 0,
          request: 277,
          success: 277,
          userAgent: ['Translation Box']
        },
        translationResourceId: '422fa011-5a0b-4922-ae6e-99dbae47f772'
      },
      {
        id: 'd1a15948-d852-41f0-a03f-758ae56e59ae',
        lastUsed: '2024-01-05T10:00:24.743Z',
        name: '[LINGTEST] ENFR Systran Generic 9.3.3 TR-735',
        source: 'en',
        target: 'fr',
        total: {
          elapsedTime: 427335,
          mimeType: ['text/plain'],
          nbCacheHits: 5,
          nbCharacters: 9979,
          nbCharactersCacheHits: 350,
          nbSegments: 123,
          nbTokens: 0,
          nbTus: 123,
          nbTusFailed: 0,
          request: 123,
          success: 123,
          userAgent: ['Translation Box']
        },
        translationResourceId: '422fa011-5a0b-4922-ae6e-99dbae47f772'
      },
      {
        id: 'dadc8d3b-8e8c-4205-91b3-17203f8a2349',
        lastUsed: '2024-01-09T17:39:56.096Z',
        name: 'Test GB YD',
        source: 'fr',
        target: 'en',
        total: {
          elapsedTime: 391011,
          mimeType: ['text/plain'],
          nbCacheHits: 3,
          nbCharacters: 10061,
          nbCharactersCacheHits: 170,
          nbSegments: 107,
          nbTokens: 0,
          nbTus: 108,
          nbTusFailed: 0,
          request: 107,
          success: 107,
          userAgent: ['Translation Box']
        },
        translationResourceId: 'c1659c3e-83d9-4252-a759-2b894d2fabfb'
      },
      {
        id: '76a711c0-f26d-4689-8e9b-3f67c091b09f',
        lastUsed: '2024-01-04T12:05:26.647Z',
        name: '[LINGTEST] ENFR TVH CL 9.3.0',
        source: 'en',
        target: 'fr',
        total: {
          elapsedTime: 57061,
          mimeType: ['text/plain'],
          nbCacheHits: 17,
          nbCharacters: 3575,
          nbCharactersCacheHits: 664,
          nbSegments: 82,
          nbTokens: 0,
          nbTus: 92,
          nbTusFailed: 0,
          request: 82,
          success: 82,
          userAgent: ['Translation Box']
        },
        translationResourceId: 'b9b23a1d-f69c-46e7-9734-471f9802af32'
      },
      {
        id: 'd998d3c2-4898-4fb5-aa56-3f9ccc4693c8',
        lastUsed: '2024-01-10T11:19:41.585Z',
        name: ' [LINGTEST] ENAR Adidas Marketing 9.3.0 lower UD ',
        source: 'en',
        target: 'ar',
        total: {
          elapsedTime: 9982,
          mimeType: ['text/plain'],
          nbCacheHits: 88,
          nbCharacters: 1974,
          nbCharactersCacheHits: 1303,
          nbSegments: 123,
          nbTokens: 0,
          nbTus: 77,
          nbTusFailed: 0,
          request: 51,
          success: 51,
          userAgent: ['Translation Box']
        },
        translationResourceId: '35cfd89d-06b7-4cd3-96c3-49aba2171bc6'
      },
      {
        id: '706c1b4a-86e4-48f1-94d3-1a618fe258f8',
        lastUsed: '2024-01-10T11:26:37.595Z',
        name: '[LINGTEST] AREN Generic Systran L 9.3.3 ',
        source: 'ar',
        target: 'en',
        total: {
          elapsedTime: 7822,
          mimeType: ['text/plain'],
          nbCacheHits: 6,
          nbCharacters: 481,
          nbCharactersCacheHits: 147,
          nbSegments: 21,
          nbTokens: 0,
          nbTus: 19,
          nbTusFailed: 0,
          request: 17,
          success: 17,
          userAgent: ['Translation Box']
        },
        translationResourceId: '697c531a-5c5b-4c00-8e39-da30fc28ee99'
      },
      {
        id: '5b271454-e635-4001-95d7-5907daa3b1a6',
        lastUsed: '2024-01-04T17:09:49.155Z',
        name: '[LINGTEST] FREN Systran Generic 9.3.2 US',
        source: 'fr',
        target: 'en',
        total: {
          elapsedTime: 15265,
          mimeType: ['text/plain'],
          nbCacheHits: 0,
          nbCharacters: 1114,
          nbCharactersCacheHits: 0,
          nbSegments: 11,
          nbTokens: 0,
          nbTus: 11,
          nbTusFailed: 0,
          request: 11,
          success: 11,
          userAgent: ['Translation Box']
        },
        translationResourceId: 'c1659c3e-83d9-4252-a759-2b894d2fabfb'
      },
      {
        id: '887593ae-1756-45e2-91aa-2920c256000f',
        lastUsed: '2024-01-05T10:03:28.987Z',
        name: '[LINGTEST] FREN Systran Generic 9.3.3 US',
        source: 'fr',
        target: 'en',
        total: {
          elapsedTime: 5904,
          mimeType: ['text/plain'],
          nbCacheHits: 1,
          nbCharacters: 890,
          nbCharactersCacheHits: 86,
          nbSegments: 10,
          nbTokens: 0,
          nbTus: 10,
          nbTusFailed: 0,
          request: 10,
          success: 10,
          userAgent: ['Translation Box']
        },
        translationResourceId: 'c1659c3e-83d9-4252-a759-2b894d2fabfb'
      },
      {
        id: '83da01cb-a1b0-444a-9fd1-00894a248ca6',
        lastUsed: '2024-01-05T11:36:52.231Z',
        name: '[LINGTEST] FREN Systran Generic 9.3.3 GB',
        source: 'fr',
        target: 'en',
        total: {
          elapsedTime: 2109,
          mimeType: ['text/plain'],
          nbCacheHits: 4,
          nbCharacters: 357,
          nbCharactersCacheHits: 159,
          nbSegments: 9,
          nbTokens: 0,
          nbTus: 9,
          nbTusFailed: 0,
          request: 9,
          success: 9,
          userAgent: ['Translation Box']
        },
        translationResourceId: 'c1659c3e-83d9-4252-a759-2b894d2fabfb'
      },
      {
        id: 'd8a53c86-2d72-4c9e-8ee0-b77934c76c68',
        lastUsed: '2024-01-10T11:18:46.332Z',
        name: 'YD Yannick test',
        source: 'en',
        target: 'fr',
        total: {
          elapsedTime: 1417,
          mimeType: ['text/plain'],
          nbCacheHits: 0,
          nbCharacters: 104,
          nbCharactersCacheHits: 0,
          nbSegments: 7,
          nbTokens: 0,
          nbTus: 6,
          nbTusFailed: 0,
          request: 4,
          success: 4,
          userAgent: ['Translation Box']
        },
        translationResourceId: '422fa011-5a0b-4922-ae6e-99dbae47f772'
      }
    ],
    total: 10,
    offset: 0
  },

  Systran2: {
    global: {
      elapsedTime: 13439328,
      lastUsed: '2024-01-18T13:36:36.610Z',
      mimeType: [
        'text/plain',
        'application/vnd.openxmlformats',
        'xml/application',
        'text/bitext',
        'text/html-old',
        'application/pdf',
        'image/jpeg'
      ],
      nbCacheHits: 9406,
      nbCharacters: 2088087,
      nbCharactersCacheHits: 286207,
      nbSegments: 37118,
      nbTokens: 0,
      nbTus: 37839,
      nbTusFailed: 2,
      request: 15843,
      success: 15843,
      userAgent: [
        'Translation Box',
        'File Translate Box',
        'gateway',
        'SYSTRAN Windows App',
        'CMLess Relativity Agent',
        'CMLess Relativity Admin Tool',
        'SYSTRAN Browser Extension - Chrome / Page',
        'Office Add-Ins - Text Translation',
        'Office Add-Ins - File Translation',
        'SYSTRAN Browser Extension - Chrome / Text',
        'Google compat mode',
        'Translation Alternatives',
        'SYSTRAN Browser Extension - Firefox / Text',
        'SYSTRAN macOS App',
        'SYSTRAN Linux App',
        'SYSTRAN Windows App - File Translation'
      ]
    },
    id: '601bf10868bffa1db67a072f',
    name: 'Systran',
    date: '2024-1',
    data: [
      {
        id: 'cef6d1d1-9361-4e4b-b9cd-c7d592f538cd',
        lastUsed: '2024-01-17T16:55:18.376Z',
        name: 'Model: Generic (by SYSTRAN)',
        source: 'en',
        target: 'es',
        total: {
          elapsedTime: 904713,
          mimeType: ['xml/application', 'text/plain'],
          nbCacheHits: 1225,
          nbCharacters: 72246,
          nbCharactersCacheHits: 14195,
          nbSegments: 2689,
          nbTokens: 0,
          nbTus: 2596,
          nbTusFailed: 0,
          request: 2594,
          success: 2594,
          userAgent: [
            'CMLess Relativity Admin Tool',
            'SYSTRAN Browser Extension - Chrome / Page',
            'SYSTRAN Browser Extension - Chrome / Text',
            'Translation Alternatives',
            'Translation Box',
            'SYSTRAN Windows App'
          ]
        },
        translationResourceId: 'f4d6b5fc-db45-4898-9f0c-86842eb2d5e3'
      },
      {
        id: '376b97d7-5653-43c2-84cf-f9298fba486a',
        lastUsed: '2024-01-18T12:26:22.798Z',
        name: 'Model: Generic (by SYSTRAN)',
        source: 'en',
        target: 'fr',
        total: {
          elapsedTime: 1819464,
          mimeType: [
            'text/plain',
            'xml/application',
            'application/vnd.openxmlformats',
            'text/html-old',
            'text/bitext'
          ],
          nbCacheHits: 884,
          nbCharacters: 162539,
          nbCharactersCacheHits: 24324,
          nbSegments: 2757,
          nbTokens: 0,
          nbTus: 2478,
          nbTusFailed: 0,
          request: 2232,
          success: 2232,
          userAgent: [
            'Translation Box',
            'CMLess Relativity Admin Tool',
            'SYSTRAN Windows App',
            'gateway',
            'File Translate Box',
            'Google compat mode',
            'SYSTRAN Browser Extension - Firefox / Text',
            'SYSTRAN Browser Extension - Chrome / Text',
            'Office Add-Ins - Text Translation',
            'SYSTRAN Browser Extension - Chrome / Page',
            'SYSTRAN macOS App',
            'Office Add-Ins - File Translation'
          ]
        },
        translationResourceId: '422fa011-5a0b-4922-ae6e-99dbae47f772'
      },
      {
        id: '70396b16-7821-4a0a-b194-5d2203d5e5e2',
        lastUsed: '2024-01-16T16:41:54.974Z',
        name: 'Translator NMT myGenericPLUS (L) - ENIT',
        source: 'en',
        target: 'it',
        total: {
          elapsedTime: 1934912,
          mimeType: ['text/plain'],
          nbCacheHits: 0,
          nbCharacters: 46681,
          nbCharactersCacheHits: 0,
          nbSegments: 1245,
          nbTokens: 0,
          nbTus: 1125,
          nbTusFailed: 0,
          request: 1115,
          success: 1115,
          userAgent: [
            'SYSTRAN Browser Extension - Chrome / Page',
            'SYSTRAN Browser Extension - Chrome / Text'
          ]
        },
        translationResourceId: 'ce87256c-ca72-4b0b-93b5-ad6b5f2d3b12'
      },
      {
        id: 'b61789f8-d4f2-409b-b1e7-689c5453fe12',
        lastUsed: '2024-01-17T16:26:31.794Z',
        name: 'Model: Dialog (by SYSTRAN)',
        source: 'en',
        target: 'fr',
        total: {
          elapsedTime: 270356,
          mimeType: ['text/plain'],
          nbCacheHits: 176,
          nbCharacters: 18070,
          nbCharactersCacheHits: 1941,
          nbSegments: 906,
          nbTokens: 0,
          nbTus: 890,
          nbTusFailed: 0,
          request: 890,
          success: 890,
          userAgent: [
            'SYSTRAN Windows App',
            'SYSTRAN macOS App',
            'SYSTRAN Browser Extension - Chrome / Page'
          ]
        },
        translationResourceId: '422fa011-5a0b-4922-ae6e-99dbae47f772'
      },
      {
        id: '736817f0-dca7-42fc-9b91-bb01d327a854',
        lastUsed: '2024-01-10T00:34:19.924Z',
        name: 'English to French 1',
        source: 'en',
        target: 'fr',
        total: {
          elapsedTime: 700960,
          mimeType: ['text/plain'],
          nbCacheHits: 0,
          nbCharacters: 26546,
          nbCharactersCacheHits: 0,
          nbSegments: 789,
          nbTokens: 0,
          nbTus: 717,
          nbTusFailed: 0,
          request: 717,
          success: 717,
          userAgent: ['SYSTRAN Browser Extension - Chrome / Page']
        },
        translationResourceId: '422fa011-5a0b-4922-ae6e-99dbae47f772'
      }
    ],
    total: 3,
    offset: 0
  },

  Administrator: {
    global: {
      elapsedTime: 13439328,
      lastUsed: '2024-01-18T13:36:36.610Z',
      mimeType: [
        'text/plain',
        'application/vnd.openxmlformats',
        'xml/application',
        'text/bitext',
        'text/html-old',
        'application/pdf',
        'image/jpeg'
      ],
      nbCacheHits: 9406,
      nbCharacters: 2088087,
      nbCharactersCacheHits: 286207,
      nbSegments: 37118,
      nbTokens: 0,
      nbTus: 37839,
      nbTusFailed: 2,
      request: 15843,
      success: 15843,
      userAgent: [
        'Translation Box',
        'File Translate Box',
        'gateway',
        'SYSTRAN Windows App',
        'CMLess Relativity Agent',
        'CMLess Relativity Admin Tool',
        'SYSTRAN Browser Extension - Chrome / Page',
        'Office Add-Ins - Text Translation',
        'Office Add-Ins - File Translation',
        'SYSTRAN Browser Extension - Chrome / Text',
        'Google compat mode',
        'Translation Alternatives',
        'SYSTRAN Browser Extension - Firefox / Text',
        'SYSTRAN macOS App',
        'SYSTRAN Linux App',
        'SYSTRAN Windows App - File Translation'
      ]
    },
    id: '1',
    name: 'Administrator',
    date: '2024-1',
    data: [
      {
        id: 'c7058a35-bce3-4baa-9a39-febe617048f6',
        lastUsed: '2024-01-16T16:32:23.334Z',
        name: 'Model: Generic (by SYSTRAN)',
        source: 'en',
        target: 'aa',
        total: {
          elapsedTime: 536510,
          mimeType: ['text/plain', 'xml/application'],
          nbCacheHits: 400,
          nbCharacters: 24334,
          nbCharactersCacheHits: 9436,
          nbSegments: 875,
          nbTokens: 0,
          nbTus: 864,
          nbTusFailed: 119990,
          request: 700,
          success: 700,
          userAgent: [
            'gateway',
            'CMLess Relativity Admin Tool',
            'SYSTRAN Browser Extension - Chrome / Page'
          ]
        },
        translationResourceId: 'b7f98ea6-8717-4669-909e-2612256334c5'
      },
      {
        id: '85a005b6-3275-47db-a8c4-a542af3f21d9',
        lastUsed: '2024-01-17T21:58:03.191Z',
        name: 'CADTH_ENFR',
        source: 'en',
        target: 'fr',
        total: {
          elapsedTime: 268936,
          mimeType: [
            'text/plain',
            'application/vnd.openxmlformats',
            'application/pdf'
          ],
          nbCacheHits: 1002,
          nbCharacters: 704065,
          nbCharactersCacheHits: 9920,
          nbSegments: 5222,
          nbTokens: 0,
          nbTus: 5199,
          nbTusFailed: 0,
          request: 588,
          success: 588,
          userAgent: [
            'SYSTRAN Windows App',
            'SYSTRAN Browser Extension - Chrome / Page',
            'File Translate Box',
            'Translation Box'
          ]
        },
        translationResourceId: '422fa011-5a0b-4922-ae6e-99dbae47f772'
      }
    ],
    total: 3,
    offset: 0
  },

  others: {
    global: {
      elapsedTime: 13439328,
      lastUsed: '2024-01-18T13:36:36.610Z',
      mimeType: [
        'text/plain',
        'application/vnd.openxmlformats',
        'xml/application',
        'text/bitext',
        'text/html-old',
        'application/pdf',
        'image/jpeg'
      ],
      nbCacheHits: 9406,
      nbCharacters: 2088087,
      nbCharactersCacheHits: 286207,
      nbSegments: 37118,
      nbTokens: 0,
      nbTus: 37839,
      nbTusFailed: 2,
      request: 15843,
      success: 15843,
      userAgent: [
        'Translation Box',
        'File Translate Box',
        'gateway',
        'SYSTRAN Windows App',
        'CMLess Relativity Agent',
        'CMLess Relativity Admin Tool',
        'SYSTRAN Browser Extension - Chrome / Page',
        'Office Add-Ins - Text Translation',
        'Office Add-Ins - File Translation',
        'SYSTRAN Browser Extension - Chrome / Text',
        'Google compat mode',
        'Translation Alternatives',
        'SYSTRAN Browser Extension - Firefox / Text',
        'SYSTRAN macOS App',
        'SYSTRAN Linux App',
        'SYSTRAN Windows App - File Translation'
      ]
    },
    id: '1',
    name: 'Administrator',
    date: '2024-1',
    data: [
      {
        id: '71a96631-0d5d-4439-8754-62be08dc2556',
        lastUsed: '2024-01-17T18:01:33.907Z',
        name: 'Model: Generic (by SYSTRAN)',
        source: 'fr',
        target: 'en',
        total: {
          elapsedTime: 173690,
          mimeType: [
            'text/plain',
            'xml/application',
            'application/vnd.openxmlformats',
            'text/html-old'
          ],
          nbCacheHits: 222,
          nbCharacters: 40136,
          nbCharactersCacheHits: 14506,
          nbSegments: 710,
          nbTokens: 0,
          nbTus: 918,
          nbTusFailed: 0,
          request: 560,
          success: 560,
          userAgent: [
            'Translation Box',
            'SYSTRAN Windows App',
            'CMLess Relativity Agent',
            'CMLess Relativity Admin Tool',
            'Office Add-Ins - File Translation',
            'SYSTRAN Browser Extension - Chrome / Text',
            'gateway',
            'SYSTRAN macOS App',
            'SYSTRAN Linux App',
            'Office Add-Ins - Text Translation'
          ]
        },
        translationResourceId: 'c1659c3e-83d9-4252-a759-2b894d2fabfb'
      },
      {
        id: '03b7a834-f19a-4efc-a7f2-b66d1b35d2e8',
        lastUsed: '2024-01-05T17:40:32.662Z',
        name: 'Model: Generic_Formal (by SYSTRAN)',
        source: 'en',
        target: 'de',
        total: {
          elapsedTime: 1031172,
          mimeType: ['text/plain'],
          nbCacheHits: 323,
          nbCharacters: 19627,
          nbCharactersCacheHits: 9018,
          nbSegments: 593,
          nbTokens: 0,
          nbTus: 560,
          nbTusFailed: 0,
          request: 560,
          success: 560,
          userAgent: ['SYSTRAN Browser Extension - Chrome / Page']
        },
        translationResourceId: '6fa67340-b7b0-4eaa-897f-b6a0fa7cff27'
      },
      {
        id: 'b6ead001-d7a3-49eb-a3c5-8f6205dc3d17',
        lastUsed: '2024-01-12T16:31:01.352Z',
        name: 'Model: Medical (by Systran)',
        source: 'en',
        target: 'fr',
        total: {
          elapsedTime: 511979,
          mimeType: ['text/plain'],
          nbCacheHits: 192,
          nbCharacters: 19137,
          nbCharactersCacheHits: 8311,
          nbSegments: 446,
          nbTokens: 0,
          nbTus: 416,
          nbTusFailed: 0,
          request: 416,
          success: 416,
          userAgent: [
            'SYSTRAN Windows App',
            'SYSTRAN Browser Extension - Chrome / Page',
            'SYSTRAN Browser Extension - Chrome / Text',
            'SYSTRAN macOS App'
          ]
        },
        translationResourceId: 'ab517986-30d2-4081-8997-c20b92388fd5'
      }
    ],
    total: 446,
    offset: 0
  }
};

const fakeDataProfileView = {
  data: [
    {
      total: 1,
      totalSuccess: 1,
      avgSuccess: 100,
      totalError: 0,
      avgError: 0,
      nbSegments: 1,
      nbCacheHits: 0,
      totalNbCharacters: 37,
      avgNbCharacters: 37,
      totalNbTokens: 0,
      avgNbTokens: 0,
      totalNbTus: 1,
      avgNbTus: 1,
      totalNbTusFailed: 0,
      avgNbTusFailed: 0,
      totalElapsedTime: 451,
      avgElapsedTime: 451,
      sourceLanguage: 'EN',
      targetLanguage: 'FR',
      profileName: 'profile without resources',
      profileId: '57da7738-d93e-4df6-877f-2f8034570bbb',
      selectors: {
        domain: 'Generic',
        owner: 'Systran',
        size: 'L',
        tech: {
          name: 'Docker-OpenNMT-ctranslate',
          type: 'NMT'
        }
      },
      totalAccounts: 1
    },
    {
      total: 129,
      totalSuccess: 125,
      avgSuccess: 96.9,
      totalError: 4,
      avgError: 3.1,
      nbSegments: 7215,
      nbCacheHits: 4173,
      totalNbCharacters: 196357,
      avgNbCharacters: 1522.1,
      totalNbTokens: 0,
      avgNbTokens: 0,
      totalNbTus: 9792,
      avgNbTus: 78.336,
      totalNbTusFailed: 0,
      avgNbTusFailed: 0,
      totalElapsedTime: 112770,
      avgElapsedTime: 874.2,
      sourceLanguage: 'FR',
      targetLanguage: 'EN',
      profileName: 'Translator NMT Generic (L) - FREN',
      profileId: 'ea492ae3-adbf-4c02-950e-3dc41dfbac51',
      selectors: {
        domain: 'Generic',
        owner: 'Systran',
        size: 'L',
        tech: {
          name: 'Docker-OpenNMT-ctranslate',
          type: 'NMT'
        }
      },
      totalAccounts: 5
    },
    {
      total: 7,
      totalSuccess: 0,
      avgSuccess: 0,
      totalError: 7,
      avgError: 100,
      nbSegments: 0,
      nbCacheHits: 0,
      totalNbCharacters: 0,
      avgNbCharacters: 0,
      totalNbTokens: 0,
      avgNbTokens: 0,
      totalNbTus: 0,
      avgNbTus: null,
      totalNbTusFailed: 0,
      avgNbTusFailed: null,
      totalElapsedTime: 6438,
      avgElapsedTime: 919.7,
      sourceLanguage: 'FR',
      targetLanguage: 'EN',
      profileName: null,
      profileId: '',
      totalAccounts: 5
    },
    {
      total: 4,
      totalSuccess: 4,
      avgSuccess: 100,
      totalError: 0,
      avgError: 0,
      nbSegments: 4,
      nbCacheHits: 3,
      totalNbCharacters: 28,
      avgNbCharacters: 7,
      totalNbTokens: 0,
      avgNbTokens: 0,
      totalNbTus: 4,
      avgNbTus: 1,
      totalNbTusFailed: 0,
      avgNbTusFailed: 0,
      totalElapsedTime: 655,
      avgElapsedTime: 163.8,
      sourceLanguage: 'ZH-HANS',
      targetLanguage: 'EN',
      profileName: 'Translator NMT Generic (L) - ZHEN',
      profileId: '41c97162-3e3e-4c9c-9c67-3f46bd0b68eb',
      selectors: {
        domain: 'Generic',
        owner: 'Systran',
        size: 'L',
        tech: {
          name: 'Docker-OpenNMT-ctranslate',
          type: 'NMT'
        }
      },
      totalAccounts: 1
    },
    {
      total: 31,
      totalSuccess: 31,
      avgSuccess: 100,
      totalError: 0,
      avgError: 0,
      nbSegments: 0,
      nbCacheHits: 0,
      totalNbCharacters: 0,
      avgNbCharacters: 0,
      totalNbTokens: 0,
      avgNbTokens: 0,
      totalNbTus: 0,
      avgNbTus: null,
      totalNbTusFailed: 0,
      avgNbTusFailed: 0,
      totalElapsedTime: 7628,
      avgElapsedTime: 246.1,
      sourceLanguage: 'EN',
      targetLanguage: 'FR',
      profileName: 'Filter',
      profileId: 'd61e807e-90ee-4332-9e98-97b300463b15',
      totalAccounts: 1
    },
    {
      total: 1,
      totalSuccess: 1,
      avgSuccess: 100,
      totalError: 0,
      avgError: 0,
      nbSegments: 1,
      nbCacheHits: 0,
      totalNbCharacters: 228,
      avgNbCharacters: 228,
      totalNbTokens: 0,
      avgNbTokens: 0,
      totalNbTus: 2,
      avgNbTus: 2,
      totalNbTusFailed: 0,
      avgNbTusFailed: 0,
      totalElapsedTime: 1386,
      avgElapsedTime: 1386,
      sourceLanguage: 'FR',
      targetLanguage: 'EN',
      profileName: 'profile with options and domain=UnitTests',
      profileId: 'f06d9a68-8aa9-4d5d-8cc4-1bb0219f1e82',
      selectors: {
        domain: 'UnitTests',
        owner: 'Self',
        size: 'L',
        tech: {
          name: 'Docker-OpenNMT-ctranslate',
          type: 'NMT'
        }
      },
      totalAccounts: 1
    },
    {
      total: 3,
      totalSuccess: 3,
      avgSuccess: 100,
      totalError: 0,
      avgError: 0,
      nbSegments: 3,
      nbCacheHits: 2,
      totalNbCharacters: 684,
      avgNbCharacters: 228,
      totalNbTokens: 0,
      avgNbTokens: 0,
      totalNbTus: 6,
      avgNbTus: 2,
      totalNbTusFailed: 0,
      avgNbTusFailed: 0,
      totalElapsedTime: 1692,
      avgElapsedTime: 564,
      sourceLanguage: 'FR',
      targetLanguage: 'EN',
      profileName: 'profile with options',
      profileId: 'b2038378-541c-472c-a8f6-982aa9e31a35',
      selectors: {
        domain: 'Generic',
        owner: 'Self',
        size: 'L',
        tech: {
          name: 'Docker-OpenNMT-ctranslate',
          type: 'NMT'
        }
      },
      totalAccounts: 1
    },
    {
      total: 1,
      totalSuccess: 1,
      avgSuccess: 100,
      totalError: 0,
      avgError: 0,
      nbSegments: 1,
      nbCacheHits: 0,
      totalNbCharacters: 228,
      avgNbCharacters: 228,
      totalNbTokens: 0,
      avgNbTokens: 0,
      totalNbTus: 2,
      avgNbTus: 2,
      totalNbTusFailed: 0,
      avgNbTusFailed: 0,
      totalElapsedTime: 1700,
      avgElapsedTime: 1700,
      sourceLanguage: 'FR',
      targetLanguage: 'EN',
      profileName: 'ProfileSharedWithUser',
      profileId: 'a3a6d4b3-e027-40b8-83c7-7fcc82ff2b49',
      selectors: {
        domain: 'Generic',
        owner: 'Systran',
        size: 'L',
        tech: {
          name: 'Docker-OpenNMT-ctranslate',
          type: 'NMT'
        }
      },
      totalAccounts: 1
    },
    {
      total: 3,
      totalSuccess: 3,
      avgSuccess: 100,
      totalError: 0,
      avgError: 0,
      nbSegments: 3,
      nbCacheHits: 2,
      totalNbCharacters: 684,
      avgNbCharacters: 228,
      totalNbTokens: 0,
      avgNbTokens: 0,
      totalNbTus: 6,
      avgNbTus: 2,
      totalNbTusFailed: 0,
      avgNbTusFailed: 0,
      totalElapsedTime: 1401,
      avgElapsedTime: 467,
      sourceLanguage: 'FR',
      targetLanguage: 'EN',
      profileName: 'profile without options',
      profileId: 'b5e678d6-c666-4236-9c3b-9b9ac31c231e',
      selectors: {
        domain: 'Generic',
        owner: 'Systran',
        size: 'L',
        tech: {
          name: 'Docker-OpenNMT-ctranslate',
          type: 'NMT'
        }
      },
      totalAccounts: 1
    },
    {
      total: 1,
      totalSuccess: 1,
      avgSuccess: 100,
      totalError: 0,
      avgError: 0,
      nbSegments: 1,
      nbCacheHits: 0,
      totalNbCharacters: 228,
      avgNbCharacters: 228,
      totalNbTokens: 0,
      avgNbTokens: 0,
      totalNbTus: 2,
      avgNbTus: 2,
      totalNbTusFailed: 0,
      avgNbTusFailed: 0,
      totalElapsedTime: 1361,
      avgElapsedTime: 1361,
      sourceLanguage: 'FR',
      targetLanguage: 'EN',
      profileName: 'ProfileSharedWithGroup',
      profileId: '3443c9fb-7ce8-4ff1-9845-7971577c87fc',
      selectors: {
        domain: 'Generic',
        owner: 'Systran',
        size: 'L',
        tech: {
          name: 'Docker-OpenNMT-ctranslate',
          type: 'NMT'
        }
      },
      totalAccounts: 1
    }
  ],
  total: 17
};
