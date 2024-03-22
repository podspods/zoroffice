import type { Meta, StoryObj } from '@storybook/react';
import HelperTest from './HelperTest';
import jsonData from '../storybook.data/AdministrationServerManagementServices.json'; // fake data for testing
const meta = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'perso/HelperTest',
  component: HelperTest,
  args: {
    serviceInput: jsonData,
    testEndPoint: false,
    testNode: false,
    testColumn: false,
    testSearch: false
  }
} satisfies Meta<typeof HelperTest>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EndPoint: Story = {
  args: {
    testEndPoint: true
  }
};

export const TestNode: Story = {
  args: {
    testNode: true
  }
};

export const TestColumn: Story = {
  args: {
    testColumn: true
  }
};


export const TestSearch: Story = {
  args: {
    testSearch: true
  }
};