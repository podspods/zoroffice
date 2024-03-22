import { Meta, StoryObj } from '@storybook/react';
import TranslationMemoryListTable from './TranslationMemoryListTable';
import { rest } from 'msw';
import Apis from '@/utils/apis';
import { lpsData, tmFilesData } from './TranslationMemoryListTable.data';

const currentDirectory = '/';

const meta = {
  title: 'Pages/TranslationMemoryListTable',
  args: {
    currentDirectory
  },
  parameters: {
    msw: {
      handlers: [
        rest.get(Apis.corpus.list({directory: currentDirectory}), async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(tmFilesData));
        }),
        rest.get(Apis.lps, async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(lpsData));
        })
      ]
    }
  },
  component: TranslationMemoryListTable
} satisfies Meta<typeof TranslationMemoryListTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
