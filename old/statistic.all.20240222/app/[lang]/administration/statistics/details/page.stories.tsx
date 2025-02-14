import { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import Apis from '@/utils/apis';
import StatisticDetail from './page';

const meta: Meta<typeof StatisticDetail> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'pages/DetailStatisticTable',
  component: StatisticDetail,
  parameters: {
    msw: {
      handlers: [
        rest.get(Apis.statistics.fullView, async (req, res, ctx) => {
          return res(ctx.delay(10), ctx.json(detailViewSpnsAlpha_il8));
        }),
        rest.get(Apis.statistics.bySession, async (req, res, ctx) => {
          return res(ctx.delay(10), ctx.json(sessionViewSpnsAlpha_il8));
        })
      ]
    }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**  ____________________ fake data ___________________________________ */

const detailViewSpnsAlpha_il8 = {
  data: [
    {
      id: '659e6b2e8355fc001f297d4a',
      date: '2024-01-10T10:02:21.000Z',
      accountId: '659d832714bc9e000da91571_A',
      accountName: 'Administrator_A',
      sourceLanguage: 'AR',
      targetLanguage: 'FR',
      profileId: 'd61e807e-90ee-4332-9e98-97b300463b15',
      profileName: 'Filter',
      operation: 'detect/language',
      success: true,
      elapsedTime: 1091,
      mimetype: 'application/vnd.openxmlformats',
      userAgent: 'File Translate Box'
    },
    {
      id: '659e6b68732cb0001e217d29',
      date: '2024-01-10T10:02:21.000Z',
      accountId: '659d832714bc9e000da91571',
      accountName: 'Administrator',
      sourceLanguage: 'AR',
      targetLanguage: 'FR',
      profileId: '825b6237-2854-4c7c-967a-2c824e6afe85',
      profileName: 'Translator NMT Generic (L) - ARFR',
      operation: 'translate/async/file',
      success: true,
      elapsedTime: 59934,
      mimetype: 'application/vnd.openxmlformats',
      nbCharacters: 15975,
      nbTokens: 0,
      nbTus: 207,
      nbTusFailed: 0,
      userAgent: 'File Translate Box',
      nbSegments: 207,
      nbCacheHits: 44
    },
    {
      id: '659e6b1c8355fc001f297d48',
      date: '2024-01-10T10:02:03.000Z',
      accountId: '659d832714bc9e000da91571',
      accountName: 'Administrator',
      sourceLanguage: 'AR',
      targetLanguage: 'FR',
      profileId: 'd61e807e-90ee-4332-9e98-97b300463b15',
      profileName: 'Filter',
      operation: 'detect/language',
      success: true,
      elapsedTime: 1594,
      mimetype: 'application/vnd.openxmlformats',
      userAgent: 'File Translate Box'
    },
    {
      id: '659e6b55732cb0001e217d25',
      date: '2024-01-10T10:02:03.000Z',
      accountId: '659d832714bc9e000da91571',
      accountName: 'Administrator',
      sourceLanguage: 'AR',
      targetLanguage: 'FR',
      profileId: '825b6237-2854-4c7c-967a-2c824e6afe85',
      profileName: 'Translator NMT Generic (L) - ARFR',
      operation: 'translate/async/file',
      success: true,
      elapsedTime: 58954,
      mimetype: 'application/vnd.openxmlformats',
      nbCharacters: 15975,
      nbTokens: 0,
      nbTus: 207,
      nbTusFailed: 0,
      userAgent: 'File Translate Box',
      nbSegments: 207,
      nbCacheHits: 0
    },
    {
      id: '659e6b128355fc001f297d46',
      date: '2024-01-10T10:01:53.000Z',
      accountId: '659d832714bc9e000da91571',
      accountName: 'Administrator',
      sourceLanguage: 'AR',
      targetLanguage: 'FR',
      profileId: 'd61e807e-90ee-4332-9e98-97b300463b15',
      profileName: 'Filter',
      operation: 'detect/language',
      success: true,
      elapsedTime: 1040,
      mimetype: 'application/vnd.openxmlformats',
      userAgent: 'File Translate Box'
    },
    {
      id: '659e6b12732cb0001e217d23',
      date: '2024-01-10T10:01:53.000Z',
      accountId: '659d832714bc9e000da91571',
      accountName: 'Administrator',
      sourceLanguage: 'AUTO',
      targetLanguage: 'FR',
      profileId: '',
      operation: 'translate/async/file',
      success: false,
      elapsedTime: 1046,
      mimetype: 'application/vnd.openxmlformats',
      userAgent: 'File Translate Box'
    },
    {
      id: '659e6b088355fc001f297d44',
      date: '2024-01-10T10:01:43.000Z',
      accountId: '659d832714bc9e000da91571',
      accountName: 'Administrator',
      sourceLanguage: 'AUTO',
      targetLanguage: 'FR',
      profileId: '',
      operation: 'translate/async/file',
      success: false,
      elapsedTime: 1628,
      mimetype: 'application/vnd.openxmlformats',
      userAgent: 'File Translate Box'
    },
    {
      id: '659e6b08732cb0001e217d20',
      date: '2024-01-10T10:01:43.000Z',
      accountId: '659d832714bc9e000da91571',
      accountName: 'Administrator',
      sourceLanguage: 'AR',
      targetLanguage: 'FR',
      profileId: 'd61e807e-90ee-4332-9e98-97b300463b15',
      profileName: 'Filter',
      operation: 'detect/language',
      success: true,
      elapsedTime: 1621,
      mimetype: 'application/vnd.openxmlformats',
      userAgent: 'File Translate Box'
    },
    {
      id: '659e6aec8355fc001f297d3f',
      date: '2024-01-10T10:01:15.000Z',
      accountId: '659d832714bc9e000da91571',
      accountName: 'Administrator',
      sourceLanguage: 'AR',
      targetLanguage: 'FR',
      profileId: 'd61e807e-90ee-4332-9e98-97b300463b15',
      profileName: 'Filter',
      operation: 'detect/language',
      success: true,
      elapsedTime: 1314,
      mimetype: 'application/vnd.openxmlformats',
      userAgent: 'File Translate Box'
    },
    {
      id: '659e6aec732cb0001e217d1c',
      date: '2024-01-10T10:01:15.000Z',
      accountId: '659d832714bc9e000da91571',
      accountName: 'Administrator',
      sourceLanguage: 'AUTO',
      targetLanguage: 'FR',
      profileId: '',
      operation: 'translate/async/file',
      success: false,
      elapsedTime: 1335,
      mimetype: 'application/vnd.openxmlformats',
      userAgent: 'File Translate Box'
    },
    {
      id: '659e6aea732cb0001e217d19',
      date: '2024-01-10T10:01:14.000Z',
      accountId: '659d832714bc9e000da91571',
      accountName: 'Administrator',
      sourceLanguage: 'EN',
      targetLanguage: 'FR',
      profileId: 'd61e807e-90ee-4332-9e98-97b300463b15',
      profileName: 'Filter',
      operation: 'detect/language',
      success: true,
      elapsedTime: 885,
      mimetype: 'application/vnd.openxmlformats',
      userAgent: 'File Translate Box'
    },
    {
      id: '659e6af8732cb0001e217d1e',
      date: '2024-01-10T10:01:14.000Z',
      accountId: '659d832714bc9e000da91571',
      accountName: 'Administrator',
      sourceLanguage: 'EN',
      targetLanguage: 'FR',
      profileId: '0522041e-e5a7-471c-bdcc-7f5cd54a8341',
      profileName: 'Translator NMT Generic (L) - ENFR',
      operation: 'translate/async/file',
      success: true,
      elapsedTime: 14567,
      mimetype: 'application/vnd.openxmlformats',
      nbCharacters: 5916,
      nbTokens: 0,
      nbTus: 71,
      nbTusFailed: 0,
      userAgent: 'File Translate Box',
      nbSegments: 71,
      nbCacheHits: 0
    }
  ],
  total: 12
};

const sessionViewSpnsAlpha_il8 = {
  data: [
    {
      id: '65cc9c15ef5cb100231749aa',
      date: '2024-02-14T10:55:17.000Z',
      accountId: '65ca03b00c89ff000ff5b8f3',
      accountName: 'Administrator',
      sourceLanguage: 'RU',
      targetLanguage: 'EN',
      profileId: '8a1c5fba-0bef-418a-8b13-aabdb79d1af6',
      profileName: 'ruen',
      operation: 'translate/file',
      success: true,
      elapsedTime: 300,
      mimetype: 'text/plain',
      nbCharacters: 14,
      nbTokens: 0,
      nbTus: 1,
      nbTusFailed: 0,
      userAgent: 'Translation Box',
      nbSegments: 1,
      nbCacheHits: 0
    },
    {
      id: '65cc98d4ef5cb100231749a8',
      date: '2024-02-14T10:41:23.000Z',
      accountId: '65ca03b00c89ff000ff5b8f3',
      accountName: 'Administrator',
      sourceLanguage: 'RU',
      targetLanguage: 'EN',
      profileId: '8a1c5fba-0bef-418a-8b13-aabdb79d1af6',
      profileName: 'ruen',
      operation: 'translate/file',
      success: true,
      elapsedTime: 1121,
      mimetype: 'text/plain',
      nbCharacters: 0,
      nbTokens: 0,
      nbTus: 1,
      nbTusFailed: 1,
      userAgent: 'Translation Box',
      nbSegments: 1,
      nbCacheHits: 0
    },
    {
      id: '65cc96f5ef5cb100231749a6',
      date: '2024-02-14T10:33:24.000Z',
      accountId: '65ca03b00c89ff000ff5b8f3',
      accountName: 'Administrator',
      sourceLanguage: 'RU',
      targetLanguage: 'EN',
      profileId: '8a1c5fba-0bef-418a-8b13-aabdb79d1af6',
      profileName: 'ruen',
      operation: 'translate/file',
      success: true,
      elapsedTime: 1143,
      mimetype: 'text/plain',
      nbCharacters: 0,
      nbTokens: 0,
      nbTus: 1,
      nbTusFailed: 1,
      userAgent: 'Translation Box',
      nbSegments: 1,
      nbCacheHits: 0
    },
    {
      id: '65cc89bcef5cb100231749a4',
      date: '2024-02-14T09:36:59.000Z',
      accountId: '65ca03b00c89ff000ff5b8f3',
      accountName: 'Administrator',
      sourceLanguage: 'RU',
      targetLanguage: 'EN',
      profileId: '8a1c5fba-0bef-418a-8b13-aabdb79d1af6',
      profileName: 'ruen',
      operation: 'translate/file',
      success: true,
      elapsedTime: 1549,
      mimetype: 'text/plain',
      nbCharacters: 0,
      nbTokens: 0,
      nbTus: 1,
      nbTusFailed: 1,
      userAgent: 'Translation Box',
      nbSegments: 1,
      nbCacheHits: 0
    },
    {
      id: '65cc89b8ef5cb100231749a0',
      date: '2024-02-14T09:36:55.000Z',
      accountId: '65ca03b00c89ff000ff5b8f3',
      accountName: 'Administrator',
      sourceLanguage: 'RU',
      targetLanguage: 'EN',
      profileId: '8a1c5fba-0bef-418a-8b13-aabdb79d1af6',
      profileName: 'ruen',
      operation: 'translate/file',
      success: true,
      elapsedTime: 1095,
      mimetype: 'text/plain',
      nbCharacters: 0,
      nbTokens: 0,
      nbTus: 1,
      nbTusFailed: 1,
      userAgent: 'Translation Box',
      nbSegments: 1,
      nbCacheHits: 0
    },
    {
      id: '65cc89b96cfbf80022e923d5',
      date: '2024-02-14T09:36:55.000Z',
      accountId: '65ca03b00c89ff000ff5b8f3',
      accountName: 'Administrator',
      sourceLanguage: 'RU',
      targetLanguage: 'EN',
      profileId: '8a1c5fba-0bef-418a-8b13-aabdb79d1af6',
      profileName: 'ruen',
      operation: 'translate/file',
      success: true,
      elapsedTime: 1778,
      mimetype: 'text/plain',
      nbCharacters: 0,
      nbTokens: 0,
      nbTus: 1,
      nbTusFailed: 1,
      userAgent: 'Translation Box',
      nbSegments: 1,
      nbCacheHits: 0
    },
    {
      id: '65cc89b9ef5cb100231749a2',
      date: '2024-02-14T09:36:55.000Z',
      accountId: '65ca03b00c89ff000ff5b8f3',
      accountName: 'Administrator',
      sourceLanguage: 'RU',
      targetLanguage: 'EN',
      profileId: '8a1c5fba-0bef-418a-8b13-aabdb79d1af6',
      profileName: 'ruen',
      operation: 'translate/file',
      success: true,
      elapsedTime: 2044,
      mimetype: 'text/plain',
      nbCharacters: 0,
      nbTokens: 0,
      nbTus: 1,
      nbTusFailed: 1,
      userAgent: 'Translation Box',
      nbSegments: 1,
      nbCacheHits: 0
    },
    {
      id: '65cc89986cfbf80022e923d3',
      date: '2024-02-14T09:36:23.000Z',
      accountId: '65ca03b00c89ff000ff5b8f3',
      accountName: 'Administrator',
      sourceLanguage: 'RU',
      targetLanguage: 'EN',
      profileId: '8a1c5fba-0bef-418a-8b13-aabdb79d1af6',
      profileName: 'ruen',
      operation: 'translate/file',
      success: true,
      elapsedTime: 1066,
      mimetype: 'text/plain',
      nbCharacters: 0,
      nbTokens: 0,
      nbTus: 1,
      nbTusFailed: 1,
      userAgent: 'Translation Box',
      nbSegments: 1,
      nbCacheHits: 0
    },
    {
      id: '65cc89956cfbf80022e923d1',
      date: '2024-02-14T09:36:20.000Z',
      accountId: '65ca03b00c89ff000ff5b8f3',
      accountName: 'Administrator',
      sourceLanguage: 'RU',
      targetLanguage: 'EN',
      profileId: '8a1c5fba-0bef-418a-8b13-aabdb79d1af6',
      profileName: 'ruen',
      operation: 'translate/file',
      success: true,
      elapsedTime: 1202,
      mimetype: 'text/plain',
      nbCharacters: 0,
      nbTokens: 0,
      nbTus: 1,
      nbTusFailed: 1,
      userAgent: 'Translation Box',
      nbSegments: 1,
      nbCacheHits: 0
    },
    {
      id: '65cb367f6cfbf80022e923cf',
      date: '2024-02-13T09:29:35.000Z',
      accountId: '65ca03b00c89ff000ff5b8f3',
      accountName: 'Administrator',
      sourceLanguage: 'PA',
      targetLanguage: 'EN',
      profileId: '8dc5c292-a907-4d77-8fcc-981759447fd5',
      profileName: 'test paen',
      operation: 'translate/file',
      success: true,
      elapsedTime: 444,
      mimetype: 'text/plain',
      nbCharacters: 59,
      nbTokens: 0,
      nbTus: 1,
      nbTusFailed: 0,
      userAgent: 'Translation Box',
      nbSegments: 1,
      nbCacheHits: 0
    }
  ],
  total: 214
};
