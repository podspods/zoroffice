import { Meta, StoryObj } from '@storybook/react';
import { ServiceToolbar } from './ServiceToolbar';

const meta = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Services/Toolbar',
  component: ServiceToolbar,
  args: {
    isLoading: false
  }
} satisfies Meta<typeof ServiceToolbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
  }
}satisfies Story;

export const Loading = {
  args: {
    isLoading: true
  }
} satisfies Story;
