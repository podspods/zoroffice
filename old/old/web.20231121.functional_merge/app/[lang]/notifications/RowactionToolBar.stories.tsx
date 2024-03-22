import { Meta, StoryObj } from '@storybook/react';
import { MyToolbar } from './RowactionToolBar';
const meta: Meta<typeof MyToolbar> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Notifications/MyToolBar',
  component: MyToolbar,
  args: {

  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
