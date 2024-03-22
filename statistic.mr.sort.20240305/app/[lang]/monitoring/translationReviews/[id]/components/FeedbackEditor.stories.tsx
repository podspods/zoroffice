import {Meta, StoryObj} from '@storybook/react';
import FeedbackEditor from './FeedbackEditor';
import { rest } from 'msw';
import Apis from '@/utils/apis';

const fakei18n = {
  t: function(text: string) {
    return text || '';
  },
  language: ''
};
(global as any).i18n = fakei18n;

const feedbackData = {
  _id: '65629d95a4509cb37f92733e',
  sourceLanguage: 'en',
  targetLanguage: 'fr',
  source: 'a house',
  target: 'une maison',
  translationRating: 'incomprehensible',
  suggestedTranslation: 'dddddd',
  insertedAt: '2023-11-15T14:06:57.533Z',
  updatedAt: '2023-12-20T10:45:04.345Z',
  createdBy: '64dc0476b5df1b167659e6a1',
  status: 'in-progress',
  problemSeverity: 'minor',
  severityPriority: 2,
  updates: [
    {
      createdBy: '64dc0476b5df1b167659e6a1',
      updatedAt: '2023-09-21T14:06:57.533Z'
    },
    {
      updatedBy: '64dc0476b5df1b167659e6a1',
      updatedAt: '2023-12-05T23:26:34.680Z',
      addToUD: {
        ownerId: '64dc0476b5df1b167659e6a1',
        dictId: '656f4881c9d848f5bb0cb6b5',
        source: 'o this is a test',
        target: 'essai'
      }
    },
    {
      updatedBy: '64dc0476b5df1b167659e6a1',
      updatedAt: '2023-12-11T14:14:56.221Z',
      addToUD: {
        ownerId: '64dc0476b5df1b167659e6a1',
        dictId: '6572f2fa089b935256090f02',
        source: 'a house',
        target: 'une habitation'
      }
    },
    {
      updatedBy: '64dc0476b5df1b167659e6a1',
      updatedAt: '2023-12-20T10:45:04.345Z',
      status: 'in-progress',
      oldStatus: 'new'
    }
  ],
  accountName: 'Administrator',
  addToUD: true,
  updatedBy: '64dc0476b5df1b167659e6a1',
  addToTM: true
}

const tmsData = {
  files: [
    {
      DT_RowId: '65804897e17231fe2203d6f1',
      status: 'ok',
      filename: '/test2',
      sourceLanguage: 'en',
      targetLanguages: [
        'fr'
      ],
      nbSegments: '0',
      indexationStatus: {
        status: ' '
      },
      type: 'file',
      permission: 'owner',
      isOwner: true,
      sharingStatus: []
    },
    {
      DT_RowId: '650d5d3c12d44089c5003ef1',
      status: 'ok',
      filename: '/test',
      sourceLanguage: 'en',
      targetLanguages: [
        'fr'
      ],
      nbSegments: '29',
      indexationStatus: {
        status: '100%',
        percentage: 100,
        processSeg: 29,
        totalSeg: 29
      },
      type: 'file',
      permission: 'owner',
      isOwner: true,
      sharingStatus: []
    }
  ]
};

const udsData = {
  data: [
    {
      accountId: '64dc0476b5df1b167659e6a1',
      comments: '',
      id: '6572f2fa089b935256090f02',
      imports: [],
      name: 'TestUD_enfr',
      nbEntries: 4,
      srcLang: 'en',
      tgtLangs: 'fr',
      type: 'UD',
      permission: 'owner',
      DT_RowId: '6572f2fa089b935256090f02',
      sharingStatus: []
    },
    {
      accountId: '64dc0476b5df1b167659e6a1',
      comments: '',
      id: '65786912089b935256090f0f',
      imports: [],
      name: 'testUD2',
      nbEntries: 2,
      srcLang: 'en',
      tgtLangs: 'fr',
      type: 'UD',
      permission: 'owner',
      DT_RowId: '65786912089b935256090f0f',
      sharingStatus: []
    }
  ]
}

const meta = {
  title: 'pages/FeedbackEditor',
  args: {
    params: {id: '65629d95a4509cb37f92733e', lang: 'en'}
  },
  parameters: {
    msw: {
      handlers: [
        rest.get(Apis.feedback.getFeedback('65629d95a4509cb37f92733e'), async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(feedbackData));
        }),
        rest.get(Apis.feedback.getAccounts, async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(feedbackData));
        }),
        rest.get(Apis.feedback.listTM(), async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(tmsData));
        }),
        rest.get(Apis.dictionary.list({type: 'UD'}), async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(udsData));
        })
      ]
    }
  },
  component: FeedbackEditor
} satisfies Meta<typeof FeedbackEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
