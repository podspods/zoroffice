import { Meta, StoryObj } from '@storybook/react';
import { NotificationsToolbar } from './notifications.toolbar';
import {
  MARK_AS_READ,
  MARK_AS_UNREAD,
  leftActionList,
  toolbarElement
} from './notifications.constant';
import { action } from '@storybook/addon-actions';
import { RefreshRate } from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import { toggleRead } from './notifications.store';
const meta: Meta<typeof NotificationsToolbar> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Notifications/Toolbar',
  component: NotificationsToolbar,
  args: {
    isLoading: false,
    refreshRate: 5,
    checkedList: [],
    // leftActionList: leftActionList,
    setRefresh: () => action('on Click')('setRefresh'),
    refreshChange: (value: RefreshRate) => action('refreshChange: ')(value),
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};

export const Loading: Story = {
  args: {
    isLoading: true
  }
};

export const CheckedList: Story = {
  args: {
    checkedList: [{ insertedAt: '1', level: '1', read: true }],
    leftActionList: [
      {
        label: MARK_AS_READ,
        icon: <PlusIcon />,
        onClick: (params) => action(MARK_AS_READ)(params[0].id),
        disable: () => false
      },
      {
        label: MARK_AS_UNREAD,
        icon: <PlusIcon />,
        onClick: (params) => action(MARK_AS_UNREAD)(params[0].id),
        disable: () => false
      }
    ]
  }
};

export const CheckedListMulti: Story = {
  args: {
    leftActionList: toolbarElement,
    checkedList: [
      { id: '1', insertedAt: '1', level: '1', read: true },
      { id: '2', insertedAt: '12', level: '1', read: true },
      { id: '3', insertedAt: '133', level: '1', read: true }
    ]

  }
};