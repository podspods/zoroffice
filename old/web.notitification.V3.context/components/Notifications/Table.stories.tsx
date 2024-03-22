import { Meta, StoryObj } from '@storybook/react';
import NotificationsTable from './Table';

const meta: Meta<typeof NotificationsTable> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Notifications/table',
  component: NotificationsTable
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
