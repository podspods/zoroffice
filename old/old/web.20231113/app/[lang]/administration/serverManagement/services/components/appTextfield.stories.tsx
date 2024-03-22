import type { Meta, StoryObj } from '@storybook/react';
import AppTextField from '@systran/react-components/lib/atoms/AppTextField';
const meta = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'perso/AppTextField',
  component: AppTextField,
  args: {
    value: 'text to display',
    readOnly: true
  }
} satisfies Meta<typeof AppTextField>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
};


