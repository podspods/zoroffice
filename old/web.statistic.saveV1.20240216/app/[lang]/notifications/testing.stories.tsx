import { Meta, StoryObj } from '@storybook/react';
import HeaderFilteringDataGridPro from './testing';

const meta: Meta<typeof HeaderFilteringDataGridPro> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'statistic/emile/HeaderFilteringDataGridPro',
  component: HeaderFilteringDataGridPro,
  args: {
    totalChar: 1234,
    totalUsers: 42
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  // args: {
  //   totalChar: 1234555,
  //   totalUsers: 42555
  // }
};
