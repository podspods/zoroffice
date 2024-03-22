import { Meta, StoryObj } from '@storybook/react';
import CorpusListTable from './CorpusListTable';
import { rest } from 'msw';
import Apis from '@/utils/apis';
import { lpsData, normFilesData, udFilesData } from './CorpusListTable.data';

const meta = {
  title: 'Pages/CorpusListTable',
  parameters: {
    msw: {
      handlers: [
        rest.get(Apis.dictionary.list({type: 'NORM'}), async (req, res, ctx) => {
          const url = new URL(req.url);
          if (url.searchParams.get('dictType') === 'NORM')
            return res(ctx.delay(2000), ctx.json(normFilesData));
          else // eslint-disable-next-line no-else-return
            return res(ctx.delay(2000), ctx.json(udFilesData));
        }),
        rest.get(Apis.lps, async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(lpsData));
        })
      ]
    }
  },
  component: CorpusListTable
} satisfies Meta<typeof CorpusListTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normalization = {
  args: {
    type: 'NORM'
  }
} satisfies Story;

export const Dictionary = {
  args: {
    type: 'UD'
  }
} satisfies Story;
