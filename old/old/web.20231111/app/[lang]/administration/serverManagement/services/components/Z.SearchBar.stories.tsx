import type { Meta, StoryObj } from '@storybook/react';

import { SearchBar } from './Z.SearchBar';
const meta = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'perso/Search Bar',
  component: SearchBar

} satisfies Meta<typeof SearchBar>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
};


