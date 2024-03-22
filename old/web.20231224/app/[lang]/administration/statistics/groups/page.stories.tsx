import { Meta, StoryObj } from '@storybook/react';
import AdministrationStatisticsGroup from './page';

const meta: Meta<typeof AdministrationStatisticsGroup> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'statistic/groups-page',
  component: AdministrationStatisticsGroup

};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};

