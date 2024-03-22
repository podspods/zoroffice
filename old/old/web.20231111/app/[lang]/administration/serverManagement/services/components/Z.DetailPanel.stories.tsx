import type { Meta, StoryObj } from '@storybook/react';
import DetailPanel from './Z.DetailPanel';

const meta = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Perso/DetailPanel',
  component: DetailPanel

} satisfies Meta<typeof DetailPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TestOne: Story = {
};


