import { Meta, StoryObj } from '@storybook/react';
import AdministrationStatisticsGlobal from './page';

const meta: Meta<typeof AdministrationStatisticsGlobal> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'statistic/global-page',
  component: AdministrationStatisticsGlobal

};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};

