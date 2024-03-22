import { Meta, StoryObj } from '@storybook/react';
import DisplayStatusBadge from '@/components/Services/components/DisplayStatusBadge';
import { Status } from '@/components/Services/type';

const meta: Meta<typeof DisplayStatusBadge> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Services/DisplayStatusBadge',
  component: DisplayStatusBadge,
  args: {
    inputStatus: Status.SUCCESS
  }
};

type Story = StoryObj<typeof meta>;
export default meta;
export const TestOne: Story = {
  args: {
    inputStatus: Status.ERROR
  }
};

