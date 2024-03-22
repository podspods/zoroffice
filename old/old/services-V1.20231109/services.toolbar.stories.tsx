import { Meta, StoryObj } from '@storybook/react';
import { fakei18n } from '__TEST__/mocks/i18n';
import { ServiceToolbar } from './services.toolbar';
global.i18n = fakei18n;

const meta = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'perso/Toolbar',
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
