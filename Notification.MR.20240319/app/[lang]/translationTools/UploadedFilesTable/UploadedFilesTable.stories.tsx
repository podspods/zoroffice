import UploadedFilesTable from './UploadedFilesTable';
import {Meta, StoryObj} from '@storybook/react';
import {files, profiles} from '../mock';
import {action} from '@storybook/addon-actions';

import { rest } from 'msw';
import Apis from '@/utils/apis';
import useActions from '../file/useActions';

const meta: Meta<typeof UploadedFilesTable> = {
  component: UploadedFilesTable,
  args: {
    useActions: useActions
  },
  title: 'Components/UploadedFilesTable',
  parameters: {
    msw: {
      handlers: [
        rest.get(Apis.fileTranslation.profiles(), async (req, res, ctx) => {
          return res(ctx.delay(1000), ctx.json(profiles));
        }),
        rest.get(Apis.fileTranslation.files, async (req, res, ctx) => {
          return res(ctx.delay(1000), ctx.json(files));
        }),
        rest.post(Apis.fileTranslation.delete, async (req, res, ctx) => {
          action('delete file')(await req.json());
          return res(ctx.delay(1000), ctx.json(true));
        }),
        rest.post(Apis.fileTranslation.cancel(':id'), async (req, res, ctx) => {
          action('cancel file')(await req.json());
          return res(ctx.delay(1000), ctx.json(true));
        }),
        rest.get(Apis.fileTranslation.downloadFile(':id'), async (req, res, ctx) => {
          return res(ctx.delay(1000), ctx.json(files));
        }),
        rest.get(Apis.fileTranslation.downloadFiles([]), async (req, res, ctx) => {
          return res(ctx.delay(1000), ctx.json(files));
        })
      ]
    }
  }
} satisfies Meta<typeof UploadedFilesTable>;

export default meta;

type Story = StoryObj<typeof meta>

export const Default = {
  args: {}
} satisfies Story;
