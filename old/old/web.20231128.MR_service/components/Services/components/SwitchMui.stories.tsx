import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { IconeName } from './DisplayIcon';
import { Switch } from '@mui/material';

const meta: Meta<typeof Switch> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Services/Switch',
  component: Switch,
  args: {
    color: 'success',
    checked: false,
    onChange: (event) => action('onChange: ')(event.target.value)
  }
};

type Story = StoryObj<typeof meta>;
export default meta;
export const Default: Story = {
  args: {}
};

export const IconePlus: Story = {
  args: {}
};
