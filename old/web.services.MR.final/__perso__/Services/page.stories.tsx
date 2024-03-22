import { Meta, StoryObj } from '@storybook/react';
import AdministrationServerManagementServices from 'app/[lang]/administration/serverManagement/services/page';

const meta: Meta<typeof AdministrationServerManagementServices> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Services/page service',
  component: AdministrationServerManagementServices
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
