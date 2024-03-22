import { Meta, StoryObj } from '@storybook/react';
import StatusBadge, {
  Status
} from '@systran/react-components/lib/atoms/StatusBadge';
const meta: Meta<typeof StatusBadge> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Notifications/Toolbar',
  component: StatusBadge,
  args: {
    title='defautl title',
    status='default'
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};

export const Loading: Story = {
  args: {
    isLoading: true
  }
};

export const CheckedList: Story = {
  args: {}
};

export const CheckedListMulti: Story = {
  args: {}
};
