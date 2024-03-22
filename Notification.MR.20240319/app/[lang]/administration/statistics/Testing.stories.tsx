import { Meta, StoryObj } from '@storybook/react';
import Testing from './Testing';

const meta: Meta<typeof Testing> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'emile/testing',
  component: Testing
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    maxWidth: '1rem',
    minWidth: '1rem',
    width: '1rem'
  }
};

export const MinWidth: Story = {
  args: {
    minWidth: '0.1rem'
  }
};
export const MaxWidth: Story = {
  args: {
    maxWidth: '1rem'
  }
};
export const Width: Story = {
  args: {
    width: '1rem'
  }
};

export const WidthAuto: Story = {
  args: {
    maxWidth: 'auto',
    minWidth: 'auto',
    width: 'auto'

  }
};


export const EmptyArg: Story = {
};
