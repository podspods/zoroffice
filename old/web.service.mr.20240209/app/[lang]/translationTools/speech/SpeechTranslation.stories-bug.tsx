import {SWRConfig} from 'swr';
import SpeechTranslation from './page';
import {Meta, StoryObj} from '@storybook/react';
import {commonFetch} from '@/utils/fetcher';
import {features, files, lps, profiles, transcript} from '../mock';
import {action} from '@storybook/addon-actions';
import {Settings, SettingsContext} from '@/components/SettingProvider';
import {rest} from 'msw';
import Apis from '@/utils/apis';
import {satisfies} from 'semver';

const meta: Meta<typeof SpeechTranslation> = {
  component: SpeechTranslation,
  args: {
  },
  title: 'Pages/SpeechTranslation',
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
        uploadWhiteList: {
          fileTranslation: [],
          corpus: [],
          dictionary: [],
          speechTranslation: [
            'aac',
            'aiff',
            'alac',
            'avi',
            'flac',
            'm4a',
            'mkv',
            'mov',
            'mp3',
            'mp4',
            'mpeg',
            'ogg',
            'wav',
            'webm',
            'wma',
            'wmv'
          ]
        },
        maxUploadFileTranslationNumber: 10,
        uploadFileSizeLimit: 52428800,
        uploadFileSizeLimitByExtension: [
          {extension: 'aac', size: 100},
          {extension: 'aiff', size: 100},
          {extension: 'alac', size: 100},
          {extension: 'avi', size: 100},
          {extension: 'flac', size: 100},
          {extension: 'm4a', size: 100},
          {extension: 'mkv', size: 100},
          {extension: 'mov', size: 100},
          {extension: 'mp3', size: 100},
          {extension: 'mp4', size: 100},
          {extension: 'mpeg', size: 100},
          {extension: 'ogg', size: 100},
          {extension: 'wav', size: 100},
          {extension: 'webm', size: 100},
          {extension: 'wma', size: 100},
          {extension: 'wmv', size: 100}
        ],
        speechProvider: 'WhisperASR',
        speechProviderAllowUndefinedSource: false
      } satisfies Partial<Settings> as unknown as Settings;
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
        rest.get(Apis.speechTranslation.files, async (req, res, ctx) => {
          return res(ctx.delay(1000), ctx.json(files));
        }),
        rest.post(Apis.speechTranslation.delete, async (req, res, ctx) => {
          action('delete file')(await req.json());
          return res(ctx.delay(1000), ctx.json(true));
        }),
        rest.post(Apis.speechTranslation.cancel(':id'), async (req, res, ctx) => {
          action('cancel file')(await req.json());
          return res(ctx.delay(1000), ctx.json(true));
        }),
        rest.get(Apis.speechTranslation.download({mode: 'translation', ids: [':id']}), async (req, res, ctx) => {
          return res(ctx.delay(1000), ctx.json(files));
        }),
        rest.get(Apis.speechTranslation.download({mode: 'translation', ids: []}), async (req, res, ctx) => {
          return res(ctx.delay(1000), ctx.json(files));
        }),
        rest.get(Apis.speechTranslation.download({mode: 'transcript', ids: [':id']}), async (req, res, ctx) => {
          action('download transcript')(transcript.slice(0, 50));
          return res(ctx.delay(1000), ctx.text(transcript));
        }),
        rest.get(Apis.speechTranslation.download({mode: 'transcript', ids: []}), async (req, res, ctx) => {
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
} satisfies Meta<typeof SpeechTranslation>;

export default meta;

type Story = StoryObj<typeof meta>

export const Default = {
  args: {}
} satisfies Story;
