import { Meta, StoryObj } from '@storybook/react';
import AdministrationStatisticsProfiles from './page';

const meta: Meta<typeof AdministrationStatisticsProfiles> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'statistic/profile-page-tabs',
  component: AdministrationStatisticsProfiles

};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};

