import {Meta, StoryObj} from '@storybook/react';
import FeedbackContainer from './FeedbackContainer';
import { rest } from 'msw';
import Apis from '@/utils/apis';
import {
  tmFilesData
} from '../../../linguisticConfiguration/resources/translationMemory/components/TranslationMemoryListTable/TranslationMemoryListTable.data';
import { udFilesData } from '../../../linguisticConfiguration/components/CorpusListTable/CorpusListTable.data';

const fakei18n = {
  t: function(text: string) {
    return text || '';
  },
  language: ''
};
(global as any).i18n = fakei18n;

const feedbacksData = {
  iTotalRecords: 7,
  iTotalDisplayRecords: 7,
  feedbacks: [
    {
      _id: '65629d95a4509cb37f92733e',
      sourceLanguage: 'en',
      targetLanguage: 'fr',
      source: 'this is an example for a test source ',
      target: 'ceci un example pour un test target',
      translationRating: 'incomprehensible test test',
      suggestedTranslation: 'ceci un suggestion translation pour tester',
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
          updatedAt: '2023-12-12T15:51:01.614Z',
          addToTM: {
            corpusId: '650d5d3c12d44089c5003ef1',
            sourceSentence: 'a house',
            targetSentence: 'une habitation'
          }
        },
        {
          updatedBy: '64dc0476b5df1b167659e6a1',
          updatedAt: '2023-12-13T11:31:09.220Z',
          suggestedTranslation: 'une habitationTEST',
          oldSuggestedTranslation: 'une habitation'
        },
        {
          updatedBy: '64dc0476b5df1b167659e6a1',
          updatedAt: '2023-12-18T13:26:28.291Z',
          addToTM: {
            corpusId: '650d5d3c12d44089c5003ef1',
            sourceSentence: 'a house',
            targetSentence: 'une habitationTEST'
          }
        },
        {
          updatedBy: '64dc0476b5df1b167659e6a1',
          updatedAt: '2023-12-19T14:48:36.637Z',
          status: 'resolved',
          oldStatus: 'new',
          translationRating: 'disfluent',
          oldTranslationRating: 'good'
        },
        {
          updatedBy: '64dc0476b5df1b167659e6a1',
          updatedAt: '2023-12-19T15:11:57.780Z',
          status: 'new',
          oldStatus: 'resolved',
          suggestedTranslation: 'dddddd',
          oldSuggestedTranslation: 'une habitationTEST',
          comment: 'new new comment'
        },
        {
          updatedBy: '64dc0476b5df1b167659e6a1',
          updatedAt: '2023-12-19T16:53:01.297Z',
          comment: 'dddd'
        },
        {
          updatedBy: '64dc0476b5df1b167659e6a1',
          updatedAt: '2023-12-20T10:44:50.043Z',
          translationRating: 'incomprehensible',
          oldTranslationRating: 'disfluent',
          problemSeverity: 'minor',
          oldProblemSeverity: 'trivial',
          comment: 'hello'
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
      addToTM: true,
      reviewer: 'Administrator',
      description: ''
    },
    {
      _id: '65629dada4509cb37f9273b3',
      sourceLanguage: 'en',
      targetLanguage: 'fr',
      source: 'The Facebook founder chose the Pacific island to build his luxury self-sufficient bunker.',
      target: 'Le fondateur de Facebook a choisi île du Pacifique pour construire son Bunker autosuffisant de luxe.',
      translationRating: '',
      suggestedTranslation: 'troisième essai',
      insertedAt: '2023-12-03T14:06:57.533Z',
      updatedAt: '2023-09-21T14:06:57.533Z',
      createdBy: '64dc0476b5df1b167659e6a1',
      status: 'new',
      problemSeverity: 'normal',
      severityPriority: 3,
      updates: [
        {
          createdBy: '64dc0476b5df1b167659e6a1',
          updatedAt: '2023-09-21T14:06:57.533Z'
        }
      ],
      accountName: 'Administrator',
      description: ''
    },
    {
      _id: '65629db7a4509cb37f9273e8',
      sourceLanguage: 'en',
      targetLanguage: 'fr',
      source: 'A pharaonic project of 250 million euros which says a lot about the survivalist whims of tech billionaires',
      target: 'Un projet pharaonique de 250 millions d’euros qui en dit long sur les lubies survivalistes des milliardaires de la tech',
      translationRating: 'good',
      suggestedTranslation: 'projet pharaonique de 250 millions d’euros qui en dit long sur les lubies survivalistes des milliardaires de la tech',
      insertedAt: '2023-12-04T14:06:57.533Z',
      updatedAt: '2023-12-05T14:06:57.533Z',
      createdBy: '64dc0476b5df1b167659e6a1',
      status: 'closed',
      problemSeverity: 'normal',
      severityPriority: 3,
      updates: [
        {
          createdBy: '64dc0476b5df1b167659e6a1',
          updatedAt: '2023-09-21T14:06:57.533Z'
        }
      ],
      accountName: 'Administrator',
      description: ''
    },
    {
      _id: '65629dc3a4509cb37f927422',
      sourceLanguage: 'en',
      targetLanguage: 'fr',
      source: 'have a good day',
      target: 'bonne journée',
      translationRating: '',
      suggestedTranslation: 'bonne nuit',
      insertedAt: '2023-09-21T14:06:57.533Z',
      updatedAt: '2023-09-21T14:06:57.533Z',
      createdBy: '64dc0476b5df1b167659e6a1',
      status: 'rejected',
      problemSeverity: 'normal',
      severityPriority: 3,
      updates: [
        {
          createdBy: '64dc0476b5df1b167659e6a1',
          updatedAt: '2023-09-21T14:06:57.533Z'
        }
      ],
      accountName: 'Administrator',
      description: ''
    },
    {
      _id: '65629dd2a4509cb37f927461',
      sourceLanguage: 'en',
      targetLanguage: 'fr',
      source: 'The property is dotted with guest houses: according to the New York Post, Mark Zuckerberg has already organized two corporate events there',
      target: 'La propriété est parsemée de maisons d’hôtes: selon le New York Post, Mark Zuckerberg y aurait déjà organisé deux évènements d’entreprise',
      translationRating: '',
      suggestedTranslation: 'Propriété est parsemée de maisons d’hôtes: selon le New York Post, Mark Zuckerberg y aurait déjà organisé deux évènements d’entreprise',
      insertedAt: '2023-12-03T14:06:57.533Z',
      updatedAt: '2023-12-19T00:14:39.649Z',
      createdBy: '64dc0476b5df1b167659e6a1',
      status: 'rejected',
      problemSeverity: 'normal',
      severityPriority: 3,
      updates: [
        {
          createdBy: '64dc0476b5df1b167659e6a1',
          updatedAt: '2023-09-21T14:06:57.533Z'
        },
        {
          updatedBy: '64dc0476b5df1b167659e6a1',
          updatedAt: '2023-12-19T00:14:06.152Z',
          addToTM: {
            corpusId: '650d5d3c12d44089c5003ef1',
            sourceSentence: 'tomorrow',
            targetSentence: 'lendemain'
          }
        },
        {
          updatedBy: '64dc0476b5df1b167659e6a1',
          updatedAt: '2023-12-19T00:14:39.649Z',
          addToUD: {
            ownerId: '64dc0476b5df1b167659e6a1',
            dictId: '65786912089b935256090f0f',
            source: 'tomorrow',
            target: 'lendemain'
          }
        }
      ],
      accountName: 'Administrator',
      addToTM: true,
      updatedBy: '64dc0476b5df1b167659e6a1',
      addToUD: true,
      reviewer: 'Administrator',
      description: ''
    },
    {
      _id: '65629ddea4509cb37f92749d',
      sourceLanguage: 'en',
      targetLanguage: 'fr',
      source: 'a table',
      target: 'une table',
      translationRating: '',
      suggestedTranslation: 'un tablette',
      insertedAt: '2023-09-21T14:06:57.533Z',
      updatedAt: '2023-09-21T14:06:57.533Z',
      createdBy: '64dc0476b5df1b167659e6a1',
      status: 'new',
      problemSeverity: 'normal',
      severityPriority: 3,
      updates: [
        {
          createdBy: '64dc0476b5df1b167659e6a1',
          updatedAt: '2023-09-21T14:06:57.533Z'
        }
      ],
      accountName: 'Administrator',
      description: ''
    }
  ],
  isFeedbackManager: true
};

const meta = {
  title: 'pages/FeedbackTable',
  args: {
    hasAdminUserPermission: true
  },
  parameters: {
    msw: {
      handlers: [
        rest.get(Apis.feedback.list, async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(feedbacksData));
        }),
        rest.get(Apis.feedback.listTM, async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(tmFilesData));
        }),
        rest.get(Apis.dictionary.list({type: 'UD'}), async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(udFilesData));
        })
      ]
    }
  },
  component: FeedbackContainer
} satisfies Meta<typeof FeedbackContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
