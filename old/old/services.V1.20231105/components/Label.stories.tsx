import type { Meta, StoryObj } from '@storybook/react';
global.i18n = fakei18n;
import { fakei18n } from '__TEST__/mocks/i18n';
import { Label } from './Label';
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


