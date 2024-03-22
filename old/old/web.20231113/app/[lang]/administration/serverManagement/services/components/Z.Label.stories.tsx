import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Z.Label';
const meta = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'perso/Label',
  component: Label,
  args: {
    message: 'Hello Label'
  }
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
};


