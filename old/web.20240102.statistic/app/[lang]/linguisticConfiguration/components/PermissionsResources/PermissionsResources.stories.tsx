import { Meta, StoryObj } from '@storybook/react';
import PermissionsResources from './PermissionsResources';
import { rest } from 'msw';
import Apis from '@/utils/apis';

const usersData = {
  data: [
    {
      id: '0',
      displayName: 'anonymous',
      groupIds: [],
      current: false
    },
    {
      id: '6569b0b8d87d0e6bb11652c9',
      displayName: 'John Doe',
      groupIds: [
        '6569b084d87d0e6bb1165272'
      ],
      current: false
    }
  ],
  total: 2
};

const groupsData = {
  data: [
    {
      name: 'Administrator',
      id: '650811a8d6b6ee21a2c53980',
      accountIds: [],
      accountNames: '',
      displayName: 'Administrator'
    },
    {
      name: 'Default',
      id: '650811a8d6b6ee21a2c53978',
      accountIds: [],
      accountNames: '',
      displayName: 'Default'
    },
    {
      name: 'Super Group',
      id: '6569b084d87d0e6bb1165272',
      accountIds: [
        '6569b0b8d87d0e6bb11652c9'
      ],
      accountNames: 'John Doe',
      displayName: 'Super Group'
    }
  ],
  total: 3
};

const resourceId = '65732b26e30ccf710709010a';

const meta = {
  title: 'Components/PermissionsResources',
  args: {
    resourceId
  },
  parameters: {
    msw: {
      handlers: [
        rest.get(Apis.resources.tm('users', resourceId), async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(usersData));
        }),
        rest.get(Apis.resources.tm('groups', resourceId), async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(groupsData));
        })
      ]
    }
  },
  component: PermissionsResources
} satisfies Meta<typeof PermissionsResources>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Users = {
  args: {
    type: 'users'
  }
} satisfies Story;

export const Groups = {
  args: {
    type: 'groups'
  }
} satisfies Story;
