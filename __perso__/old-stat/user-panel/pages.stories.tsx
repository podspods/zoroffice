import { Meta, StoryObj } from '@storybook/react';
import AdministrationStatisticsUser from './page';

const meta: Meta<typeof AdministrationStatisticsUser> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'statistic/poc/statUser',
  component: AdministrationStatisticsUser,
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
