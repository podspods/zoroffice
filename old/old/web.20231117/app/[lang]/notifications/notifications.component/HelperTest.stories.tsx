import type { Meta, StoryObj } from '@storybook/react';
import HelperTest from './HelperTest';
import jsonData from '../notifications.data/data.json'; // fake data for testing

const meta = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'notifications/HelperTest',
  component: HelperTest,
  args: {
    notificationsData: jsonData
  }
} satisfies Meta<typeof HelperTest>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EndPoint: Story = {
  args: {
    testEndPoint: true
  }
};


export const DataGrid: Story = {
  args: {
    dataGrid: true
  }
};
