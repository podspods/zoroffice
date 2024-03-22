import { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import Apis from '@/utils/apis';
import PersonalStatisticTable from './PersonalStatisticTable';

const meta: Meta<typeof PersonalStatisticTable> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'pages/MyStatistic',
  component: PersonalStatisticTable,
  parameters: {
    msw: {
      handlers: [
        rest.get(Apis.statistics.personal, async (req, res, ctx) => {
          return res(ctx.delay(10), ctx.json(personalStatisticsFromSpnsClound));
        })
      ]
    }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**  ____________________ fake data ___________________________________ */

const personalStatisticsFromSpnsClound = {
  global: {
    elapsedTime: 13706107,
    lastUsed: '2024-02-20T08:48:31.014Z',
    mimeType: ['text/plain'],
    nbCacheHits: 92,
    nbCharacters: 55764,
    nbCharactersCacheHits: 4286,
    nbSegments: 910,
    nbTus: 1175,
    nbTusFailed: 0,
    request: 853,
    success: 850,
    userAgent: ['Translation Box']
  },
  id: '648890bea0fa3f2b02079e51',
  name: 'Jean valjean',
  date: '2024-2',
  data: [
    {
      id: '71a96631-0d5d-4439-8754-62be08dc2556',
      lastUsed: '2024-02-20T08:48:31.014Z',
      name: 'Model: Generic (by SYSTRAN)',
      source: 'fr',
      target: 'en',
      total: {
        elapsedTime: 13661979,
        mimeType: ['text/plain'],
        nbCacheHits: 73,
        nbCharacters: 45590,
        nbCharactersCacheHits: 3606,
        nbSegments: 713,
        nbTus: 988,
        nbTusFailed: 0,
        request: 689,
        success: 686,
        userAgent: ['Translation Box']
      },
      translationResourceId: '10b0b924-8e39-43ea-81c8-cc62478b25fa'
    },
    {
      id: 'dc96ee51-3731-4ad8-87a3-56fcdef329ca',
      lastUsed: '2024-02-20T08:02:46.042Z',
      name: 'Model: Generic (by SYSTRAN)',
      source: 'en',
      target: 'fr',
      total: {
        elapsedTime: 28629,
        mimeType: ['text/plain'],
        nbCacheHits: 5,
        nbCharacters: 5518,
        nbCharactersCacheHits: 208,
        nbSegments: 83,
        nbTus: 95,
        nbTusFailed: 0,
        request: 80,
        success: 80,
        userAgent: ['Translation Box']
      },
      translationResourceId: '09c28f97-ef1a-4e0a-8cde-3419e0f76cfc'
    },
    {
      id: 'd5d9833f-ccd8-4d55-be2c-74f5a31508d2',
      lastUsed: '2024-02-19T19:53:15.910Z',
      name: 'Model: IT (by SYSTRAN)',
      source: 'fr',
      target: 'en',
      total: {
        elapsedTime: 8990,
        mimeType: ['text/plain'],
        nbCacheHits: 11,
        nbCharacters: 3566,
        nbCharactersCacheHits: 441,
        nbSegments: 75,
        nbTus: 56,
        nbTusFailed: 0,
        request: 52,
        success: 52,
        userAgent: ['Translation Box']
      },
      translationResourceId: '8fea63cf-8621-40a2-bec0-b525ec588e5b'
    },
    {
      id: 'de18ec43-8ef4-493f-8d2d-f52fa6033dae',
      lastUsed: '2024-02-10T15:55:34.449Z',
      name: 'Model: Generic (by SYSTRAN)',
      source: 'vi',
      target: 'en',
      total: {
        elapsedTime: 1394,
        mimeType: ['text/plain'],
        nbCacheHits: 1,
        nbCharacters: 63,
        nbCharactersCacheHits: 7,
        nbSegments: 9,
        nbTus: 10,
        nbTusFailed: 0,
        request: 9,
        success: 9,
        userAgent: ['Translation Box']
      },
      translationResourceId: '67ac438a-76ef-4420-904e-5464f43bf66d'
    },
    {
      id: '6fae495d-37f6-4df4-b1bb-7c326e27bc71',
      lastUsed: '2024-02-20T08:02:40.852Z',
      name: 'Model: Generic (by SYSTRAN)',
      source: 'en',
      target: 'sq',
      total: {
        elapsedTime: 1221,
        mimeType: ['text/plain'],
        nbCacheHits: 0,
        nbCharacters: 742,
        nbCharactersCacheHits: 0,
        nbSegments: 15,
        nbTus: 8,
        nbTusFailed: 0,
        request: 8,
        success: 8,
        userAgent: ['Translation Box']
      },
      translationResourceId: '6adbe3d7-a90d-42f8-b882-c251e8e01a4c'
    },
    {
      id: '510dd153-a358-43f8-8c6e-457ae110e32a',
      lastUsed: '2024-02-10T15:56:49.150Z',
      name: 'Double Translation (VI >> EN >> FR)',
      source: 'vi',
      target: 'fr',
      total: {
        elapsedTime: 1862,
        mimeType: ['text/plain'],
        nbCacheHits: 1,
        nbCharacters: 72,
        nbCharactersCacheHits: 10,
        nbSegments: 7,
        nbTus: 10,
        nbTusFailed: 0,
        request: 7,
        success: 7,
        userAgent: ['Translation Box']
      },
      translationResourceId: null
    },
    {
      id: '033a3d3a-19c0-457c-af72-a5425bb3fd11',
      lastUsed: '2024-02-19T13:30:42.198Z',
      name: 'Double Translation (FR >> EN >> VI)',
      source: 'fr',
      target: 'vi',
      total: {
        elapsedTime: 1435,
        mimeType: ['text/plain'],
        nbCacheHits: 1,
        nbCharacters: 53,
        nbCharactersCacheHits: 14,
        nbSegments: 6,
        nbTus: 6,
        nbTusFailed: 0,
        request: 6,
        success: 6,
        userAgent: ['Translation Box']
      },
      translationResourceId: null
    },
    {
      id: '578b017f-627d-41ff-8ce2-5dfae7b2d32f',
      lastUsed: '2024-02-08T10:14:40.033Z',
      name: 'Model: IT (by SYSTRAN)',
      source: 'en',
      target: 'fr',
      total: {
        elapsedTime: 597,
        mimeType: ['text/plain'],
        nbCacheHits: 0,
        nbCharacters: 160,
        nbCharactersCacheHits: 0,
        nbSegments: 2,
        nbTus: 2,
        nbTusFailed: 0,
        request: 2,
        success: 2,
        userAgent: ['Translation Box']
      },
      translationResourceId: '8f95f99f-66e9-43f7-bdd2-ba8c30937d78'
    }
  ],
  total: 8,
  offset: 0
};