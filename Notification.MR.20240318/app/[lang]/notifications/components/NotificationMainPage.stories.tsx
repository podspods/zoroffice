import { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import Apis from '@/utils/apis';
import NotificationMainPage from './NotificationMainPage';

const meta: Meta<typeof NotificationMainPage> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'pages/Notifications',
  component: NotificationMainPage,
  parameters: {
    msw: {
      handlers: [
        rest.get(Apis.notification.list, async (req, res, ctx) => {
          return res(ctx.delay(10), ctx.json(notifications));
        })
      ]
    }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {

};

const notifications = {
  total: 6,
  offset: 0,
  notifications: [
    {
      id: '6488959f18de370e30ebb15e',
      insertedAt: '2023-06-13T16:13:19.306Z',
      level: 'error',
      str: {
        display: 'File ${filename} successfully translated',
        data: {
          filename: {
            type: 'fileTranslation',
            value: '7be078af-8542-44bb-89b9-01fb697dddaa',
            label: 'Organization_chart_SYSTRAN_SAS_2023-06-12.pdf'
          }
        },
        v: 2
      },
      read: true,
      pushed: true
    },
    {
      id: '64d49de4641265e5797e0e42',
      insertedAt: '2023-08-10T08:20:52.401Z',
      level: 'info',
      str: {
        display: 'Delete corpus ${id}',
        data: {
          id: {
            type: 'tm',
            value: '',
            label: '64d49d1f9333f70dc0077f61'
          }
        },
        v: 2
      },
      read: false,
      pushed: true
    },
    {
      id: '64d49d33641265e5797e0d35',
      insertedAt: '2023-08-10T08:17:55.895Z',
      level: 'info',
      str: {
        display: 'Add a corpus segment for corpus id ${id}',
        data: {
          id: {
            type: 'tm',
            value: '64d49d1f9333f70dc0077f61',
            label: '64d49d1f9333f70dc0077f61'
          }
        },
        v: 2
      },
      read: false,
      pushed: true
    },
    {
      id: '648894cb3a335e212d553abe',
      insertedAt: '2023-06-13T16:09:47.062Z',
      level: 'success',
      str: {
        display: 'File ${filename} translated',
        data: {
          filename: {
            type: 'fileTranslation',
            value: '28f5e90a-31ed-4979-b7af-6457fc16037c',
            label: 'SYSTRAN_livret_accueil_2023-06-12.pdf'
          }
        },
        v: 2
      },
      read: true,
      pushed: true
    },
    {
      id: '64d4c956d3af42e5879a1bc2',
      insertedAt: '2023-08-10T11:26:14.005Z',
      level: 'error',
      str: {
        display:
          '${type} Translation Resource ${id} to ${upgradeId} with error : ${err}',
        data: {
          type: {
            value: 'upgrade',
            type: 'string'
          },
          id: {
            type: 'tr',
            value: 'b059ff16-83ec-4fb1-bb49-3f58a21b9159',
            label: 'b059ff16-83ec-4fb1-bb49-3f58a21b9159'
          },
          upgradeId: {
            type: 'tr',
            value: '20e79057-8a53-4e73-ad4f-e037f9a59a9e',
            label: '20e79057-8a53-4e73-ad4f-e037f9a59a9e'
          },
          err: {
            type: 'string',
            value: 'Unable to upgrade TR correctly'
          }
        },
        v: 2
      },
      read: false,
      pushed: true
    },
    {
      id: '64afc7fcbbabe38c0748a4ee',
      insertedAt: '2023-07-13T09:46:36.777Z',
      level: 'error',
      str: {
        display: 'Unable to import the corpus ${filename}: ${err}',
        data: {
          filename: {
            type: 'string',
            value: '/file.tmx'
          },
          err: {
            type: 'error',
            value: 502
          }
        },
        v: 2
      },
      read: false,
      pushed: true
    }
  ]
};
