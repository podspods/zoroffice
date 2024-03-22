// FileTranslation.stories.tsx

import {SWRConfig} from 'swr';
import FileTranslation from './page';
import {Meta, StoryObj} from '@storybook/react';
import {commonFetch} from '@/utils/fetcher';
import {features, files, lps, profiles} from './mock';
import {action} from '@storybook/addon-actions';
import SettingsProvider, {Settings, SettingsContext} from '@/components/SettingProvider';
import {rest} from 'msw';
import Apis from '@/utils/apis';

const meta: Meta<typeof FileTranslation> = {
  component: FileTranslation,
  args: {
  },
  title: 'Pages/FileTranslation',
  decorators: [
    (Story) => {
      return (
        <SWRConfig value={{
          shouldRetryOnError: false,
          fetcher: commonFetch
        }}
        >
          <Story />
        </SWRConfig>
      );
    },
    (Story) => {
      const settings = {
        precisePDF: 0,
        uploadWhiteList: {fileTranslation: [
          'txt',
          'html',
          'htm',
          'xhtml',
          'xml',
          'tmx',
          'xliff',
          'xlf',
          'doc',
          'docx',
          'pptx',
          'xlsx',
          'rtf',
          'odp',
          'ods',
          'odt',
          'json',
          'properties',
          'resx',
          'bmp',
          'jpg',
          'jpeg',
          'png',
          'tif',
          'tiff',
          'markdown',
          'md',
          'idml',
          'srt',
          'zip',
          'tar',
          'tar\\.gz',
          'tgz'
        ], speechTranslation: []},
        maxUploadFileTranslationNumber: 10,
        uploadFileSizeLimit: 52428800,
        uploadFileSizeLimitByExtension: [
          { extension: 'txt', size: 10 },
          { extension: 'html', size: 20 },
          { extension: 'htm', size: 20 },
          { extension: 'xhtml', size: 20 },
          { extension: 'xml', size: 20 },
          { extension: 'tmx', size: 20 },
          { extension: 'xliff', size: 20 },
          { extension: 'xlf', size: 20 },
          { extension: 'doc', size: 20 },
          { extension: 'docx', size: 20 },
          { extension: 'pptx', size: 20 },
          { extension: 'xlsx', size: 20 },
          { extension: 'rtf', size: 20 },
          { extension: 'odp', size: 20 },
          { extension: 'ods', size: 20 },
          { extension: 'odt', size: 20 },
          { extension: 'json', size: 20 },
          { extension: 'properties', size: 20 },
          { extension: 'resx', size: 20 },
          { extension: 'bmp', size: 20 },
          { extension: 'jpg', size: 20 },
          { extension: 'jpeg', size: 20 },
          { extension: 'png', size: 20 },
          { extension: 'tif', size: 20 },
          { extension: 'tiff', size: 20 },
          { extension: 'markdown', size: 20 },
          { extension: 'md', size: 20 },
          { extension: 'idml', size: 20 },
          { extension: 'srt', size: 20 },
          { extension: 'zip', size: 40 },
          { extension: 'tar', size: 40 },
          { extension: 'tar.gz', size: 40 },
          { extension: 'tgz', size: 40 },
          { extension: 'pdf', size: 40 }
        ]
      } as unknown as Settings;
      return (
        <SettingsContext.Provider value={{settings, initSettings: () => {}, updateSettings: () => {}}}>
          <Story />
        </SettingsContext.Provider>
      );
    }
  ],
  parameters: {
    msw: {
      handlers: [
        rest.get(Apis.fileTranslation.profiles, async (req, res, ctx) => {
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
        }),
        rest.get(Apis.fileTranslation.lps, async (req, res, ctx) => {
          return res(ctx.delay(1000), ctx.json(lps));
        }),
        rest.get(Apis.fileTranslation.cache('file'), async (req, res, ctx) => {
          return res(ctx.delay(1000), ctx.json({}));
        }),
        rest.post(Apis.fileTranslation.cache(), async (req, res, ctx) => {
          action('updating cache');
          return res(ctx.delay(1000), ctx.json(true));
        }),
        rest.get(Apis.fileTranslation.features, async (req, res, ctx) => {
          return res(ctx.delay(1000), ctx.json(features));
        }),
        rest.post(Apis.fileTranslation.upload, async (req, res, ctx) => {
          action('uploading file')(req.json());
          return res(ctx.delay(1000), ctx.json(true));
        })
      ]
    }
  }
} satisfies Meta<typeof FileTranslation>;

export default meta;

type Story = StoryObj<typeof meta>

export const Default = {
  args: {}
} satisfies Story;
