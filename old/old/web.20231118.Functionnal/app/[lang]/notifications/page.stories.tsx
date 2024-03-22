import { Meta, StoryObj } from '@storybook/react';
import Notifications from './page';

const meta = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Notifications/page-notifications',
  component: Notifications
} satisfies Meta<typeof Notifications>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
  }
}satisfies Story;

export const LoadWithData = {
  args: {
  }
} satisfies Story;
