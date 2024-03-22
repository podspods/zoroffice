import {Meta, StoryObj} from '@storybook/react';
import StatusBadge from '@systran/react-components/lib/atoms/StatusBadge';

const meta = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Service/StatusBadge',
  component: StatusBadge,
  args: {
    children: 'string'
    <title></title>
  }
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success = {
  args: {
    children: 'Success Status',
    status: 'success'
  }
} satisfies Story;

export const Error = {
  args: {
    children: 'Error Status',
    status: 'error'
  }
} satisfies Story;

export const Default = {
  args: {
    children: 'Default Status',
    status: 'default'
  }
} satisfies Story;

export const Warning = {
  args: {
    children: 'Warning Status',
    status: 'warning'
  }
} satisfies Story;

export const Info = {
  args: {
    children: 'Info Status',
    status: 'info',
    endAdornment: 'loading'
  }
} satisfies Story;

