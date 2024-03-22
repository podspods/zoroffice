import { Meta, StoryObj } from '@storybook/react';
import testingUtils from './testingUtils';

const meta: Meta<typeof testingUtils> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'statistic/utils',
  component: testingUtils,
  args: {
    name: 'no-name'
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
