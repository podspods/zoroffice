import type { Meta, StoryObj } from '@storybook/react';
import CustomizeDetailPanelToggle from './ZdetailPanel';

const meta = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Perso/ZDetailPanel',
  component: CustomizeDetailPanelToggle

} satisfies Meta<typeof CustomizeDetailPanelToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TestOne: Story = {
};


