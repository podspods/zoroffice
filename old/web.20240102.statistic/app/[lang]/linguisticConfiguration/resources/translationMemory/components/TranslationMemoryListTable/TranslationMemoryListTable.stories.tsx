import { Meta, StoryObj } from '@storybook/react';
import TranslationMemoryListTable from './TranslationMemoryListTable';
import { rest } from 'msw';
import Apis from '@/utils/apis';

// Same as what could be returned by /node/admin/licenses/list
const tmFilesData = {
  files: [{
    filename: '/ENFR',
    type: 'directory',
    isOwner: false,
    sharingStatus: []
  }, {
    DT_RowId: '654a594e66e337c8d7096b28',
    status: 'ok',
    filename: '/hello48498',
    sourceLanguage: 'en',
    targetLanguages: ['fr'],
    createdAt: 'Tue Nov  7 15:35:42 2023\n',
    nbSegments: '0',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '6549283e66e337c8d7096b26',
    status: 'ok',
    filename: '/locales new',
    sourceLanguage: 'fr_FR',
    targetLanguages: ['en_GB'],
    createdAt: 'Mon Nov  6 17:54:07 2023\n',
    nbSegments: '0',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '6548d62766e337c8d7096b24',
    status: 'ok',
    filename: '/test_bad',
    sourceLanguage: 'zz',
    targetLanguages: ['yy'],
    createdAt: 'Mon Nov  6 12:03:51 2023\n',
    nbSegments: '0',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '6548d53a66e337c8d7096b22',
    status: 'ok',
    filename: '/locales',
    sourceLanguage: 'en_US',
    targetLanguages: ['fr_FR'],
    createdAt: 'Mon Nov  6 11:59:54 2023\n',
    nbSegments: '0',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '6545207366e337c8d7096b20',
    status: 'ok',
    filename: '/test (1) (1)',
    sourceLanguage: 'en',
    targetLanguages: ['fr'],
    createdAt: 'Fri Nov  3 16:31:49 2023\n',
    nbSegments: '0',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '6544f71566e337c8d7096b1e',
    status: 'ok',
    filename: '/test (1)',
    sourceLanguage: 'en_FR',
    targetLanguages: ['en_US'],
    createdAt: 'Fri Nov  3 13:35:17 2023\n',
    nbSegments: '0',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '6544dc9766e337c8d7096b1c',
    status: 'ok',
    filename: '/test',
    sourceLanguage: 'en',
    targetLanguages: ['fr', 'es'],
    createdAt: 'Fri Nov  3 11:42:15 2023\n',
    nbSegments: '0',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '653a82f066e337c8d7096b12',
    status: 'ok',
    filename: '/test6and5and',
    sourceLanguage: 'fr',
    targetLanguages: ['en'],
    createdAt: 'Thu Oct 26 15:17:04 2023\n',
    nbSegments: '0',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '6539378a19bcc59df40413de',
    status: 'ok',
    filename: '/test8',
    sourceLanguage: 'fr',
    targetLanguages: ['en'],
    createdAt: 'Wed Oct 25 15:43:06 2023\n',
    nbSegments: '0',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '653936ed19bcc59df40413dc',
    status: 'ok',
    filename: '/test5',
    sourceLanguage: 'fr',
    targetLanguages: ['en'],
    createdAt: 'Wed Oct 25 15:40:29 2023\n',
    nbSegments: '0',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '653906d719bcc59df40413d2',
    status: 'ok',
    filename: '/test4',
    sourceLanguage: 'fr',
    targetLanguages: ['en'],
    createdAt: 'Wed Oct 25 12:15:19 2023\n',
    nbSegments: '0',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '653906c319bcc59df40413ce',
    status: 'ok',
    filename: '/test1',
    sourceLanguage: 'fr',
    targetLanguages: ['en'],
    createdAt: 'Wed Oct 25 12:14:59 2023\n',
    nbSegments: '0',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '651fc4ae5c23eb4d6407a201',
    status: 'ok',
    filename: '/TEST3',
    sourceLanguage: 'en',
    targetLanguages: ['fr'],
    createdAt: 'Fri Oct  6 08:26:22 2023\n',
    nbSegments: '100',
    indexationStatus: { status: '100%', percentage: 100, processSeg: 100, totalSeg: 100 },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '651e9232fcbcf212f70fe1fe',
    status: 'error',
    filename: '/TM_ENFR-40k (25).tmx',
    createdAt: 'Thu Oct  5 10:38:42 2023\n',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '651e9218fcbcf212f70fd75e',
    status: 'error',
    filename: '/TM_ENFR-40k (24).tmx',
    createdAt: 'Thu Oct  5 10:38:16 2023\n',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '651e904afcbcf212f70f4eaa',
    status: 'error',
    filename: '/TM_ENFR-40k (23).tmx',
    createdAt: 'Thu Oct  5 10:30:34 2023\n',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '651d8a8afcbcf212f70e2f40',
    status: 'error',
    filename: '/TM_ENFR-40k (22).tmx',
    createdAt: 'Wed Oct  4 15:53:46 2023\n',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '651d8443fcbcf212f70cf6bc',
    status: 'ok',
    filename: '/TM_ENFR-40k (21).tmx',
    sourceLanguage: 'en',
    targetLanguages: ['fr'],
    createdAt: 'Wed Oct  4 15:26:59 2023\n',
    nbSegments: '40000',
    indexationStatus: { status: '100%', percentage: 100, processSeg: 40000, totalSeg: 40000 },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '651d810bfcbcf212f70c5b82',
    status: 'error',
    filename: '/TM_ENFR-40k (20).tmx',
    createdAt: 'Wed Oct  4 15:13:15 2023\n',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '651d7ecefcbcf212f70bb2ba',
    status: 'error',
    filename: '/TM_ENFR-40k (19).tmx',
    createdAt: 'Wed Oct  4 15:03:42 2023\n',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '651d7cc7fcbcf212f70b111c',
    status: 'error',
    filename: '/TM_ENFR-40k (18).tmx',
    createdAt: 'Wed Oct  4 14:55:03 2023\n',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '651d7b4dfcbcf212f70a700e',
    status: 'error',
    filename: '/TM_ENFR-40k (17).tmx',
    createdAt: 'Wed Oct  4 14:48:45 2023\n',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '651d740bfcbcf212f709f406',
    status: 'error',
    filename: '/TM_ENFR-40k (16).tmx',
    createdAt: 'Wed Oct  4 14:17:47 2023\n',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '651d60dbfcbcf212f7097354',
    status: 'error',
    filename: '/TM_ENFR-40k (15).tmx',
    createdAt: 'Wed Oct  4 12:55:55 2023\n',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '651d609efcbcf212f70968a6',
    status: 'error',
    filename: '/TM_ENFR-40k (14).tmx',
    createdAt: 'Wed Oct  4 12:54:54 2023\n',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '651c1adcfcbcf212f708f796',
    status: 'error',
    filename: '/TM_ENFR-40k (13).tmx',
    createdAt: 'Tue Oct  3 13:45:00 2023\n',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '651bfb71fcbcf212f70876e4',
    status: 'error',
    filename: '/TM_ENFR-40k (12).tmx',
    createdAt: 'Tue Oct  3 11:30:57 2023\n',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '651bf8b4fcbcf212f70876e0',
    status: 'error',
    filename: '/TM_ENFR-40k (11).tmx',
    createdAt: 'Tue Oct  3 11:19:16 2023\n',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '651bf8a6fcbcf212f70876dc',
    status: 'error',
    filename: '/TM_ENFR-40k (10).tmx',
    createdAt: 'Tue Oct  3 11:19:02 2023\n',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '651bf738fcbcf212f708141e',
    status: 'error',
    filename: '/TM_ENFR-40k (9).tmx',
    createdAt: 'Tue Oct  3 11:12:56 2023\n',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '651bf731fcbcf212f7081178',
    status: 'error',
    filename: '/TM_ENFR-40k (8).tmx',
    createdAt: 'Tue Oct  3 11:12:49 2023\n',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '651bf71bfcbcf212f70808b0',
    status: 'error',
    filename: '/TM_ENFR-40k (7).tmx',
    createdAt: 'Tue Oct  3 11:12:27 2023\n',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '651bf705fcbcf212f707ffd8',
    status: 'error',
    filename: '/TM_ENFR-40k (6).tmx',
    createdAt: 'Tue Oct  3 11:12:05 2023\n',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '651bf6cafcbcf212f707ea00',
    status: 'error',
    filename: '/TM_ENFR-40k (5).tmx',
    createdAt: 'Tue Oct  3 11:11:06 2023\n',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '651be3b6fcbcf212f7076c3a',
    status: 'error',
    filename: '/TM_ENFR-40k (4).tmx',
    createdAt: 'Tue Oct  3 09:49:42 2023\n',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '651bde83fcbcf212f7076c36',
    status: 'error',
    filename: '/TM_ENFR-40k (3).tmx',
    createdAt: 'Tue Oct  3 09:27:31 2023\n',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '651bde35fcbcf212f7076c32',
    status: 'error',
    filename: '/TM_ENFR-40k (2).tmx',
    createdAt: 'Tue Oct  3 09:26:13 2023\n',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '651bdd4afcbcf212f70751d4',
    status: 'error',
    filename: '/TM_ENFR-40k (1).tmx',
    createdAt: 'Tue Oct  3 09:22:18 2023\n',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }, {
    DT_RowId: '651bda4bfcbcf212f706d8e6',
    status: 'error',
    filename: '/TM_ENFR-40k.tmx',
    createdAt: 'Tue Oct  3 09:09:31 2023\n',
    indexationStatus: { status: '-' },
    type: 'file',
    permission: 'owner',
    isOwner: true,
    sharingStatus: []
  }]
};

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
        })
      ]
    }
  },
  component: TranslationMemoryListTable
} satisfies Meta<typeof TranslationMemoryListTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
