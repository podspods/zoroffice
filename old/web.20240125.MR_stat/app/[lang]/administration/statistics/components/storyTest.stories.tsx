import { Meta, StoryObj } from '@storybook/react';
import storytest from './storyTest';

const meta: Meta<typeof storytest> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'statistic/delivery/storytest',
  component: storytest
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
};
