import {rest} from 'msw';
import Apis from '@/utils/apis';
import {Meta, StoryObj} from '@storybook/react';
import FilePostEditorLayout from './FilePostEditorLayout';

const fakei18n = {
  t: function(text: string) {
    return text || '';
  },
  language: ''
};
(global as any).i18n = fakei18n;

const sentencesData = {
  iTotalRecords: 4,
  iTotalDisplayRecords: 4,
  sentences: [
    {
      _id: '659c093a71af921018751359',
      mid: 1,
      srcPath: '/*/*/*/*[1]/*[3]/*[1]',
      sourceSentence: 'this is a house',
      targetSentence: 'ceci est un cheval',
      tgtPath: '/*/*/*/*[1]/*[3]/*[2]',
      mtSentence: 'ceci est un cheval',
      tuId: 1,
      fileId: '291bbd69-b03f-4de0-b6da-f2662d840f1f',
      date: '2024-01-26T10:49:12.577Z',
      status: 'Validated',
      tmSentence: [
        {
          penalty: 0,
          score: 1,
          source: 'this is a house',
          target: 'ceci est un cheval'
        },
        {
          penalty: 0,
          score: 0.75,
          source: 'this is the house',
          target: 'ceci est la vache'
        }
      ],
      uploadDateRenamed: '2024-01-08T14:39:54.830Z',
      DT_RowId: '659c093a71af921018751359',
      id: '659c093a71af921018751359'
    },
    {
      _id: '659c093a71af92101875135a',
      mid: 1,
      srcPath: '/*/*/*/*[3]/*[3]/*[1]',
      sourceSentence: 'this is a horse',
      targetSentence: 'ceci est une vache',
      tgtPath: '/*/*/*/*[3]/*[3]/*[2]',
      mtSentence: 'c\'est un cheval',
      tuId: 3,
      fileId: '291bbd69-b03f-4de0-b6da-f2662d840f1f',
      date: '2024-01-26T10:00:08.292Z',
      status: 'Validated',
      tmSentence: [
        {
          penalty: 0,
          score: 0.75,
          source: 'this is a house',
          target: 'ceci est un cheval'
        },
        {
          penalty: 0,
          score: 0.75,
          source: 'this is the horse',
          target: 'ceci est une vache'
        }
      ],
      uploadDateRenamed: '2024-01-08T14:39:54.831Z',
      DT_RowId: '659c093a71af92101875135a',
      id: '659c093a71af92101875135a'
    },
    {
      _id: '659c093a71af92101875135b',
      mid: 1,
      srcPath: '/*/*/*/*[5]/*[3]/*[1]',
      sourceSentence: 'this is the horse',
      targetSentence: 'ceci est une vache test',
      tgtPath: '/*/*/*/*[5]/*[3]/*[2]',
      mtSentence: 'ceci est une vache',
      tuId: 5,
      fileId: '291bbd69-b03f-4de0-b6da-f2662d840f1f',
      date: '2024-01-24T10:11:07.820Z',
      status: 'Validated',
      tmSentence: [
        {
          penalty: 0,
          score: 1,
          source: 'this is the horse',
          target: 'ceci est une vache'
        },
        {
          penalty: 0,
          score: 0.75,
          source: 'this is the house',
          target: 'ceci est la vache'
        }
      ],
      uploadDateRenamed: '2024-01-08T14:39:54.832Z',
      DT_RowId: '659c093a71af92101875135b',
      id: '659c093a71af92101875135b'
    },
    {
      _id: '659c093a71af92101875135c',
      mid: 1,
      srcPath: '/*/*/*/*[7]/*[3]/*[1]',
      sourceSentence: 'Hello',
      targetSentence: 'Bonjour ça va ? ',
      tgtPath: '/*/*/*/*[7]/*[3]/*[2]',
      mtSentence: 'Bonjour',
      tuId: 7,
      fileId: '291bbd69-b03f-4de0-b6da-f2662d840f1f',
      date: '2024-01-09T16:20:03.822Z',
      uploadDateRenamed: '2024-01-08T14:39:54.833Z',
      status: 'Validated',
      DT_RowId: '659c093a71af92101875135c',
      id: '659c093a71af92101875135c'
    }
  ]
};

const profiles = {
  profiles: [
    {
      id: '37c52ef3-86a6-4429-87d6-67855a6f1f47',
      deactivated: false,
      running: true,
      name: 'Translator NMT Generic (M) - ENFR',
      localization: {},
      source: 'en',
      target: 'fr',
      selectors: {
        owner: 'Self',
        domain: 'Generic',
        size: 'M'
      }
    }
  ]
};

const fileInfo = {
  source: 'en',
  target: 'fr',
  groupId: [],
  selectors: {},
  xliffId: 'a9ba6ceb-0b07-4924-89ae-aa5932d9db9f',
  fileName: 'Test23.txt',
  sysContentType: 'text/plain',
  postEdited: true,
  resultId: '059c0494-1b3e-45bf-a97a-37a71f18bd84',
  status: 'translated',
  detectedSelectors: {
    detectedDomain: 'Generic',
    detectedOwner: 'Self',
    detectedProfileId: '37c52ef3-86a6-4429-87d6-67855a6f1f47',
    detectedSize: 'L'
  },
  modelOptions: {
    locale: 'fr-FR'
  }
};

const meta = {
  title: 'pages/FileTranslation/PostEditor',
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/en/translationTools/file/1',
        segments: [
          ['lang', 'en'],
          ['id', '1']
        ]
      }
    },
    msw: {
      handlers: [
        rest.get(Apis.filePostEditor.translation('1'), async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(sentencesData));
        }),
        rest.get(Apis.filePostEditor.fileInfo('1'), async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(fileInfo));
        }),
        rest.get(Apis.fileTranslation.profiles, async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(profiles));
        })
      ]
    }
  },
  component: FilePostEditorLayout
} satisfies Meta<typeof FilePostEditorLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    params: {
      id: '1',
      lang: 'fr'
    }
  }} satisfies Story;
