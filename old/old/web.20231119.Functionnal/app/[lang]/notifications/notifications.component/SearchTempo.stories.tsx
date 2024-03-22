import { Meta, StoryObj } from '@storybook/react';

import { SearchTempo } from './SearchTempo';
const meta: Meta<typeof SearchTempo> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Notifications/SearchTempo',
  component: SearchTempo,
  args: {}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
