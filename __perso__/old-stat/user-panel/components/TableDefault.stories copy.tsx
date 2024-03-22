import { Meta, StoryObj } from '@storybook/react';
import TableDefault from './TableDefault';
import { rest } from 'msw';
import { Apis } from './statisticsType';

const meta: Meta<typeof TableDefault> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'statistic/user-panel-toolbar/tableDefault',
  component: TableDefault,
  args: {
    // totalChar: 1234,
    // totalUsers: 42
  },
  parameters: {
    msw: {
      handlers: [
        rest.get(Apis.statistics.listUser, async (req, res, ctx) => {
          return res(ctx.delay(1000), ctx.json(rawDataUser));
        }),
        rest.get(Apis.statistics.userView('0'), async (req, res, ctx) => {
          return res(ctx.delay(1000), ctx.json(dataUserViewAnonymous));
        }),
        rest.get(
          Apis.statistics.userView('659d60d2cdbe30000bdc916e'),
          async (req, res, ctx) => {
            return res(ctx.delay(1000), ctx.json(dataUserViewAdmin));
          }
        )
      ]
    }
  }
};

// http://localhost:5001/activity/user/659d60d2cdbe30000bdc916e/details?limit=10&skip=0&sortName=request&sortOrder=desc&date=2024-01

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  // args: {
  //   totalChar: 1234555,
  //   totalUsers: 42555
  // }
};

/** --------------------- fake data ------------------------------- */
const rawDataUser = {
  total: 2,
  accounts: [
    {
      id: '0',
      displayName: 'anonymous',
      groupIds: [],
      current: false
    },
    {
      id: '659d60d2cdbe30000bdc916e',
      displayName: 'Administrator',
      groupIds: [],
      current: true
    }
  ],
  offset: 0,
  limit: 2
};

/** data from spns-alpha-el8
 * extract from user view
 * https://spns-alpha-el8.systran.net/activity/user/659d832714bc9e000da91571/details?date=2024-1&skip=0&limit=10&sortName=request&sortOrder=desc
 *
 */

const dataUserViewAdmin = {
  global: {
    elapsedTime: 123907,
    lastUsed: '2024-01-09T17:43:59.454Z',
    mimeType: ['text/plain', 'text/html-old', 'text/rtf', 'xml/application'],
    nbCacheHits: 4190,
    nbCharacters: 200016,
    nbCharactersCacheHits: 176210,
    nbSegments: 7241,
    nbTokens: 0,
    nbTus: 9830,
    nbTusFailed: 0,
    request: 176,
    success: 176,
    userAgent: ['Integration test', 'gateway']
  },
  id: '659d832714bc9e000da91571',
  name: 'Administrator',
  date: '2024-1',
  data: [
    {
      id: 'ea492ae3-adbf-4c02-950e-3dc41dfbac51',
      lastUsed: '2024-01-09T17:43:08.992Z',
      name: 'Translator NMT Generic (L) - FREN',
      source: 'fr',
      target: 'en',
      total: {
        elapsedTime: 112230,
        mimeType: [
          'text/plain',
          'text/html-old',
          'text/rtf',
          'xml/application'
        ],
        nbCacheHits: 4173,
        nbCharacters: 196342,
        nbCharactersCacheHits: 173939,
        nbSegments: 7213,
        nbTokens: 0,
        nbTus: 9790,
        nbTusFailed: 0,
        request: 123,
        success: 123,
        userAgent: ['Integration test', 'gateway']
      },
      translationResourceId: 'c1659c3e-83d9-4252-a759-2b894d2fabfb'
    },
    {
      id: 'd61e807e-90ee-4332-9e98-97b300463b15',
      lastUsed: '2024-01-09T17:39:45.503Z',
      name: 'Filter',
      source: 'es',
      target: 'en',
      total: {
        elapsedTime: 83,
        mimeType: ['text/plain'],
        nbCacheHits: 0,
        nbCharacters: 0,
        nbCharactersCacheHits: 0,
        nbSegments: 0,
        nbTokens: 0,
        nbTus: 0,
        nbTusFailed: 0,
        request: 25,
        success: 25,
        userAgent: ['Integration test']
      },
      translationResourceId: 'b866d27f-4f16-44b4-b53d-8723ffd5daa8'
    },
    {
      id: '0522041e-e5a7-471c-bdcc-7f5cd54a8341',
      lastUsed: '2024-01-09T17:39:45.273Z',
      name: 'Translator NMT Generic (L) - ENFR',
      source: 'en',
      target: 'fr',
      total: {
        elapsedTime: 3459,
        mimeType: ['text/plain'],
        nbCacheHits: 8,
        nbCharacters: 1600,
        nbCharactersCacheHits: 1264,
        nbSegments: 10,
        nbTokens: 0,
        nbTus: 14,
        nbTusFailed: 0,
        request: 10,
        success: 10,
        userAgent: ['Integration test']
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
    },
    {
      id: '444c3721-7b29-4ff9-ac7e-43cbc3ba42c4',
      lastUsed: '2024-01-09T17:39:21.806Z',
      name: 'profile without options and domain=UnitTests',
      source: 'fr',
      target: 'en',
      total: {
        elapsedTime: 1258,
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
  total: 12,
  offset: 0
};

const dataUserViewAnonymous = {
  global: {
    elapsedTime: 123907,
    lastUsed: '2024-01-09T17:43:59.454Z',
    mimeType: ['text/plain', 'text/html-old', 'text/rtf', 'xml/application'],
    nbCacheHits: 4190,
    nbCharacters: 200016,
    nbCharactersCacheHits: 176210,
    nbSegments: 7241,
    nbTokens: 0,
    nbTus: 9830,
    nbTusFailed: 0,
    request: 176,
    success: 176,
    userAgent: ['Integration test', 'gateway']
  },
  id: '659d832714bc9e000da91571',
  name: 'John Doe',
  date: '2024-1',
  data: [
    {
      id: 'ea492ae3-adbf-4c02-950e-3dc41dfbac51',
      lastUsed: '2024-01-09T17:43:08.992Z',
      name: 'Translator NMT Generic (L) - FREN  John Doe',
      source: 'fr',
      target: 'en',
      total: {
        elapsedTime: 112230,
        mimeType: [
          'text/plain John Doe',
          'text/html-old John Doe',
          'text/rtf John Doe',
          'xml/application John Doe'
        ],
        nbCacheHits: 4173,
        nbCharacters: 196342,
        nbCharactersCacheHits: 173939,
        nbSegments: 7213,
        nbTokens: 0,
        nbTus: 9790,
        nbTusFailed: 0,
        request: 123,
        success: 123,
        userAgent: ['Integration test John Doe', 'gateway John Doe']
      },
      translationResourceId: 'c1659c3e-83d9-4252-a759-2b894d2fabfb'
    },
    {
      id: 'd61e807e-90ee-4332-9e98-97b300463b15',
      lastUsed: '2024-01-09T17:39:45.503Z',
      name: 'Filter  John Doe',
      source: 'es',
      target: 'en',
      total: {
        elapsedTime: 83,
        mimeType: ['text/plain'],
        nbCacheHits: 0,
        nbCharacters: 0,
        nbCharactersCacheHits: 0,
        nbSegments: 0,
        nbTokens: 0,
        nbTus: 0,
        nbTusFailed: 0,
        request: 25,
        success: 25,
        userAgent: ['Integration test  John Doe']
      },
      translationResourceId: 'b866d27f-4f16-44b4-b53d-8723ffd5daa8'
    },
    {
      id: '0522041e-e5a7-471c-bdcc-7f5cd54a8341',
      lastUsed: '2024-01-09T17:39:45.273Z',
      name: 'Translator NMT Generic (L) - ENFR John Doe',
      source: 'en',
      target: 'fr',
      total: {
        elapsedTime: 3459,
        mimeType: ['text/plain John Doe'],
        nbCacheHits: 8,
        nbCharacters: 1600,
        nbCharactersCacheHits: 1264,
        nbSegments: 10,
        nbTokens: 0,
        nbTus: 14,
        nbTusFailed: 0,
        request: 10,
        success: 10,
        userAgent: ['Integration test John Doe']
      },
      translationResourceId: '548b59bd-4a81-4743-ba4c-a0c0768c9acc'
    },
    {
      id: '444c3721-7b29-4ff9-ac7e-43cbc3ba42c4',
      lastUsed: '2024-01-09T17:39:21.806Z',
      name: 'profile without options and domain=UnitTests  John Doe',
      source: 'fr',
      target: 'en',
      total: {
        elapsedTime: 1258,
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
        userAgent: ['Integration test  John Doe']
      },
      translationResourceId: 'c1659c3e-83d9-4252-a759-2b894d2fabfb'
    }
  ],
  total: 12,
  offset: 0
};
