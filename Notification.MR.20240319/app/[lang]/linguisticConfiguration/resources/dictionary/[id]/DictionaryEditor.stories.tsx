import { rest } from 'msw';
import Apis from '@/utils/apis';
import { Meta, StoryObj } from '@storybook/react';
import translationMemoryEditor from './DictionaryEditor';

const fakei18n = {
  t: function(text: string) {
    return text || '';
  },
  language: ''
};
(global as any).i18n = fakei18n;


const listDict = {
  data: [
    {
      accountId: '65c3ba16239b45000ae706cd',
      comments: '',
      id: '65c4fbc6437351679306ac01',
      imports: [
        {
          endDate: 1707408356039,
          fileName: 'EN_FR_PERSO_DEMO.tmx',
          importId: '65c4fbe3437351679306ac02',
          nbEntriesImportedKo: 0,
          nbEntriesImportedOk: 3,
          nbEntriesToImport: 3,
          startDate: 1707408355917,
          status: 'finished'
        },
        {
          endDate: 1707408419219,
          fileName: 'locales_en_GB-fr_FR_fr_BE.tmx',
          importId: '65c4fc23437351679306ac09',
          nbEntriesImportedKo: 0,
          nbEntriesImportedOk: 2,
          nbEntriesToImport: 2,
          startDate: 1707408419186,
          status: 'error'
        },
        {
          endDate: 1708441958352,
          fileName: 'testDico.txt',
          importId: '65d4c16610e3bb15c607e6ab',
          nbEntriesImportedKo: 0,
          nbEntriesImportedOk: 2,
          nbEntriesToImport: 2,
          startDate: 1708441958313,
          status: 'finished'
        },
        {
          endDate: 1708441996573,
          fileName: 'testDico.txt',
          importId: '65d4c18c10e3bb15c607e6ae',
          nbEntriesImportedKo: 0,
          nbEntriesImportedOk: 2,
          nbEntriesToImport: 2,
          startDate: 1708441996523,
          status: 'finished'
        },
        {
          endDate: 1708442183878,
          fileName: 'testDico.txt',
          importId: '65d4c24710e3bb15c607e6b1',
          nbEntriesImportedKo: 0,
          nbEntriesImportedOk: 2,
          nbEntriesToImport: 2,
          startDate: 1708442183790,
          status: 'finished'
        },
        {
          endDate: 1708442893560,
          fileName: 'testDico.txt',
          importId: '65d4c50d10e3bb15c607e6b6',
          nbEntriesImportedKo: 0,
          nbEntriesImportedOk: 2,
          nbEntriesToImport: 2,
          startDate: 1708442893506,
          status: 'finished'
        },
        {
          endDate: 1708442945844,
          fileName: 'testDico.txt',
          importId: '65d4c54110e3bb15c607e6b9',
          nbEntriesImportedKo: 0,
          nbEntriesImportedOk: 2,
          nbEntriesToImport: 2,
          startDate: 1708442945777,
          status: 'finished'
        },
        {
          endDate: 1708511617892,
          fileName: 'testDico.txt',
          importId: '65d5d18110e3bb15c607e6bd',
          nbEntriesImportedKo: 0,
          nbEntriesImportedOk: 2,
          nbEntriesToImport: 2,
          startDate: 1708511617814,
          status: 'finished'
        },
        {
          endDate: 1708511673220,
          fileName: 'testDico.txt',
          importId: '65d5d1b910e3bb15c607e6c1',
          nbEntriesImportedKo: 0,
          nbEntriesImportedOk: 2,
          nbEntriesToImport: 2,
          startDate: 1708511673146,
          status: 'finished'
        },
        {
          endDate: 1708511779426,
          fileName: 'testDico.txt',
          importId: '65d5d22310e3bb15c607e6c5',
          nbEntriesImportedKo: 0,
          nbEntriesImportedOk: 2,
          nbEntriesToImport: 2,
          startDate: 1708511779367,
          status: 'finished'
        }
      ],
      name: 'test Dico',
      nbEntries: 11,
      srcLang: 'en',
      tgtLangs: 'fr',
      type: 'UD',
      permission: 'owner',
      DT_RowId: '65c4fbc6437351679306ac01',
      sharingStatus: [

      ]
    },
    {
      accountId: '65c3ba16239b45000ae706cd',
      comments: '',
      id: '65c9fc2ef62c45fcd80b7771',
      imports: [

      ],
      name: 'tejipfjeiopfjeiofjei',
      nbEntries: 4,
      srcLang: 'en',
      tgtLangs: 'fr,es',
      type: 'UD',
      permission: 'owner',
      DT_RowId: '65c9fc2ef62c45fcd80b7771',
      sharingStatus: [

      ]
    }
  ]
};

const entries = {
  recordsTotal: 4,
  recordsFiltered: 4,
  data: [
    {
      comments: '',
      src: 'Sachaa',
      tgt: 'Sachaa',
      pos: 'proper noun',
      confidence: 35,
      srcId: '65cf70247b1bd7c3eb092c96',
      tgtId: '65cf6d387b1bd7c3eb092c95',
      priority: 9,
      srcVid: 0,
      tgtVid: 11,
      type: 'translation',
      tgtInflection: 'Sachaa',
      srcInflection: ''
    },
    {
      comments: 'Nom propre',
      src: 'Uber Eat',
      tgt: 'Uber Eat',
      pos: 'proper noun',
      confidence: 17.64,
      srcId: '65d333a410e3bb15c607e693',
      tgtId: '65cf209e7b1bd7c3eb092c84',
      priority: 4,
      srcVid: 0,
      tgtVid: 59,
      type: 'dnt',
      tgtInflection: '',
      srcInflection: ''
    },
    {
      comments: 'Test verbe',
      src: 'to eat',
      tgt: 'manger',
      pos: 'verb',
      confidence: 100,
      srcId: '65cf6a0f7b1bd7c3eb092c8e',
      tgtId: '65cf68ba7b1bd7c3eb092c8b',
      priority: 4,
      srcVid: 0,
      tgtVid: 37,
      type: 'translation',
      tgtInflection: 'manger/il mange/mangé',
      srcInflection: ''
    },
    {
      comments: 'Test hello',
      src: 'hello',
      tgt: 'bonjour',
      pos: 'noun',
      confidence: 60,
      srcId: '65cf57e07b1bd7c3eb092c88',
      tgtId: '65cf20867b1bd7c3eb092c82',
      priority: 4,
      srcVid: 0,
      tgtVid: 9,
      type: 'translation',
      tgtInflection: 'sg. bonjour/pl. bonjours',
      srcInflection: 'sg. hello/pl. hello'
    }
  ]
};


const meta = {
  title: 'pages/DictionaryEditor',
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/en/linguisticConfiguration/resources/dictionary/65c9fc2ef62c45fcd80b7771',
        segments: [
          ['lang', 'en'],
          ['id', '65c9fc2ef62c45fcd80b7771']
        ]
      }
    },
    msw: {
      handlers: [
        rest.get(Apis.dictionary.entry.list, async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(entries));
        }),
        rest.get(Apis.dictionary.list({type: 'UD'}), async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(listDict));
        })
      ]
    }
  },
  component: translationMemoryEditor
} satisfies Meta<typeof translationMemoryEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    params: {
      id: '65c9fc2ef62c45fcd80b7771',
      lang: 'fr'
    }
  }
} satisfies Story;
