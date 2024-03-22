import { Meta, StoryObj } from '@storybook/react';
import ServiceToolbar from './ServiceToolbar';

const meta: Meta<typeof ServiceToolbar> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Services/Toolbar',
  component: ServiceToolbar,
  args: {
    isLoading: false
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};

export const Loading = {
  args: {
    isLoading: true
  }
};
