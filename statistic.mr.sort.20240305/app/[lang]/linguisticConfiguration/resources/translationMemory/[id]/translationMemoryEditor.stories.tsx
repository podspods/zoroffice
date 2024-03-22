import { rest } from 'msw';
import Apis from '@/utils/apis';
import { Meta, StoryObj } from '@storybook/react';
import translationMemoryEditor from './translationMemoryEditor';

const fakei18n = {
  t: function(text: string) {
    return text || '';
  },
  language: ''
};
(global as any).i18n = fakei18n;


const fileInfo = {
  filename: '/DemoDay_en_fr.tmx',
  format: 'application/x-tmx+xml',
  id: '65bcf9005799808f1100990c',
  sourceLanguage: 'en',
  sourceLanguageCode: 'en',
  targetLanguageCodes: [
    'fr'
  ],
  targetLanguages: [
    'fr'
  ]
};

const segments = {
  iTotalRecords: 7,
  iTotalDisplayRecords: 7,
  segments: [
    {
      DT_RowId: '65bcf9005799808f1100990a_65bcf9005799808f1100990d_0',
      id: '65bcf9005799808f1100990a.65bcf9005799808f1100990d',
      source: 'Entity',
      target: {
        id: '65bcf9005799808f1100990e',
        language: 'fr',
        seg: 'Entité'
      }
    },
    {
      DT_RowId: '65bcf9005799808f1100990a_65bcf9005799808f1100990f_1',
      id: '65bcf9005799808f1100990a.65bcf9005799808f1100990f',
      source: 'Hello',
      target: {
        id: '65bcf9005799808f11009910',
        language: 'fr',
        seg: 'Bonjour'
      }
    },
    {
      DT_RowId: '65bcf9005799808f1100990a_65bcf9005799808f11009911_2',
      id: '65bcf9005799808f1100990a.65bcf9005799808f11009911',
      source: 'hmm',
      target: {
        id: '65bcf9005799808f11009912',
        language: 'fr',
        seg: 'euuh'
      }
    },
    {
      DT_RowId: '65bcf9005799808f1100990a_65bcfbc05799808f11009950_3',
      id: '65bcf9005799808f1100990a.65bcfbc05799808f11009950',
      source: 'Map',
      target: {
        id: '65bcfbc05799808f11009951',
        language: 'fr',
        seg: 'Carte'
      }
    },
    {
      DT_RowId: '65bcfb995799808f11009946_65bcfb995799808f11009948_4',
      id: '65bcfb995799808f11009946.65bcfb995799808f11009948',
      source: 'hungry',
      target: {
        id: '65bcfb995799808f11009949',
        language: 'fr',
        seg: 'faim'
      }
    },
    {
      DT_RowId: '65bcfb995799808f11009946_65bcfb995799808f1100994a_5',
      id: '65bcfb995799808f11009946.65bcfb995799808f1100994a',
      source: 'waaaaw',
      target: {
        id: '65bcfb995799808f1100994b',
        language: 'fr',
        seg: 'woooow'
      }
    },
    {
      DT_RowId: '65bcfb995799808f11009946_65bcfb995799808f1100994c_6',
      id: '65bcfb995799808f11009946.65bcfb995799808f1100994c',
      source: 'booom',
      target: {
        id: '65bcfb995799808f1100994d',
        language: 'fr',
        seg: 'bouuum'
      }
    }
  ]
};


const meta = {
  title: 'pages/translationMemoryEditor',
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/en/linguisticConfiguration/resources/translationMemory/65bcf9005799808f1100990c',
        segments: [
          ['lang', 'en'],
          ['id', '65bcf9005799808f1100990c']
        ]
      }
    },
    msw: {
      handlers: [
        rest.get(Apis.corpus.segment.list({id: '65bcf9005799808f1100990c'}), async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(segments));
        }),
        rest.get(Apis.corpus.details({id: '65bcf9005799808f1100990c'}), async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(fileInfo));
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
      id: '65bcf9005799808f1100990c',
      lang: 'fr'
    }
  }
} satisfies Story;
