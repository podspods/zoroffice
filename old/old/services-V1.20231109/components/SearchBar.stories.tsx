import type { Meta, StoryObj } from '@storybook/react';
global.i18n = fakei18n;
import { fakei18n } from '__TEST__/mocks/i18n';
import { SearchBar } from './SearchBar';
const meta = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'perso/Search Bar',
  component: SearchBar

} satisfies Meta<typeof SearchBar>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
};


