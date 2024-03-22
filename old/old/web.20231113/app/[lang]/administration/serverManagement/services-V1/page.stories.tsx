import { Meta, StoryObj } from '@storybook/react';
import AdministrationServerManagementServices from './page';
import { fakei18n } from '__TEST__/mocks/i18n';
import jsonData from './data/AdministrationServerManagementServices.json'; // fake data for testing
global.i18n = fakei18n;

const data = jsonData.services;
const meta = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'perso/page service',
  component: AdministrationServerManagementServices
} satisfies Meta<typeof AdministrationServerManagementServices>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    serviceInput: jsonData
  }
}satisfies Story;

export const LoadWithData = {
  args: {
    services: data
  }
} satisfies Story;
