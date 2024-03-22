import { Meta, StoryObj } from '@storybook/react';
import testing from './testing';

const meta: Meta<typeof testing> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'emile/testing',
  component: testing,
  args: {
    arg1: 'toto'
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
