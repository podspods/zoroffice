import { Meta, StoryObj } from '@storybook/react';
import DetailsTranslationMemoryModal from './DetailsTranslationMemoryModal';
import { action } from '@storybook/addon-actions';
import { rest } from 'msw';
import Apis from '@/utils/apis';

const detailsData = {
  accountId: '64b67c6dc74d571c33e61947',
  checksum: '72df90a5-37ae-4753-a0d0-81e5faeac812',
  completedAt: 'Fri Oct  6 08:31:10 2023\n',
  createdAt: 'Fri Oct  6 08:26:22 2023\n',
  features: { es1: { status: 'ok' }, fuzzy: { status: 'ok' } },
  filename: '/TEST3',
  id: '651fc4ae5c23eb4d6407a201',
  nbSegments: '100',
  sourceLanguage: 'en',
  sourceLanguageCode: 'en',
  status: 'ok',
  targetLanguageCodes: ['fr'],
  targetLanguages: ['fr'],
  indexationStatus: { status: '100%', percentage: 100, processSeg: 100, totalSeg: 100 },
  ownerId: '64b67c6dc74d571c33e61947',
  permission: 'owner'
};

const corpusId = '651fc4ae5c23eb4d6407a201';

const meta = {
  title: 'Components/DetailsTranslationMemoryModal',
  args: {
    open: false,
    onClose: action('onClose'),
    corpusId
  },
  parameters: {
    msw: {
      handlers: [
        rest.get(Apis.corpus.details({id: corpusId}), async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(detailsData));
        })
      ]
    }
  },
  component: DetailsTranslationMemoryModal
} satisfies Meta<typeof DetailsTranslationMemoryModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
