import type { Meta, StoryObj } from '@storybook/react';
import Toaster from './Toaster';
const meta = {
  component: Toaster,
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'perso/Toaster',
  args: {
    message: 'hello toast'
  }
} satisfies Meta<typeof Toaster>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TestOne: Story = {
  args: {
    message: 'TestOne toast'
  }
};
