import { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import { Apis } from './statisticsType';
import TableGroupView from './TableGroupView';

const meta: Meta<typeof TableGroupView> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'statistic/poc/user-panel-toolbar/TableGroupView',
  component: TableGroupView,
  args: {
    // totalChar: 1234,
    // totalUsers: 42
  },

  parameters: {
    msw: {
      handlers: [
        rest.get(Apis.statistics.listGroup, async (req, res, ctx) => {
          return res(ctx.delay(1000), ctx.json(rawDataGroup));
        }),
        rest.get(
          Apis.statistics.groupView('659d832714bc9e000da9157f'),
          async (req, res, ctx) => {
            return res(ctx.delay(1000), ctx.json(dataGroupViewAdmin));
          }
        ),
        rest.get(
          Apis.statistics.groupView('659d832714bc9e000da91579'),
          async (req, res, ctx) => {
            return res(ctx.delay(1000), ctx.json(dataGroupViewDefault));
          }
        )
      ]
    }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  // args: {
  //   totalChar: 1234555,
  //   totalUsers: 42555
  // }
};

/** -------------- fake data ----------------------------------- */
const rawDataGroup = {
  groups: [
    {
      name: 'Administrator',
      roles: [],
      accounts: [],
      id: '659d832714bc9e000da9157f'
    },
    {
      name: 'Default',
      roles: [],
      accounts: [],
      id: '659d832714bc9e000da91579'
    }
  ],
  total: 2,
  offset: 0,
  limit: 2
};

const dataGroupViewDefault = {
  global: {},
  id: '659d832714bc9e000da91579',
  name: 'Default',
  date: '2024-1',
  data: [
    {
      id: 'ea492ae3-adbf-4c02-950e-3dc41dfbac51',
      lastUsed: '2024-01-09T17:43:08.992Z',
      name: 'Default -Translator NMT Generic (L) - FREN',
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
    }
  ],
  total: 0,
  offset: 0
};

const dataGroupViewAdmin = {
  global: {},
  id: '659d832714bc9e000da9157f',
  name: 'Administrator',
  date: '2024-1',
  data: [
    {
      id: 'ea492ae3-adbf-4c02-950e-3dc41dfbac51',
      lastUsed: '2024-01-09T17:43:08.992Z',
      name: 'Administrator - Translator NMT Generic (L) - FREN',
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
    }
  ],
  total: 0,
  offset: 0
};
