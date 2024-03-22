import { Meta, StoryObj } from '@storybook/react';
import { NotificationsToolbar } from './Toolbar';

const meta: Meta<typeof NotificationsToolbar> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Notifications/Toolbar',
  component: NotificationsToolbar,
  args: {
    isLoading: false
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
  args: {}
};

export const CheckedListMulti: Story = {
  args: {}
};
