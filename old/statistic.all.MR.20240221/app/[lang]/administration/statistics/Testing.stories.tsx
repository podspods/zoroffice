import { Meta, StoryObj } from '@storybook/react';
import Testing from './Testing';

const meta: Meta<typeof Testing> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'emile/testing',
  component: Testing,
  args: {
    arg1: 'toto'
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
