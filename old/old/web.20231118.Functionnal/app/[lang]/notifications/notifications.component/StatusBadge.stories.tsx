import type { Meta, StoryObj } from '@storybook/react';
import StatusBadge from './StatusBadge';
import { Status } from '../notifications.type';


const meta:Meta<typeof StatusBadge> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'notifications/StatusBadge',
  component: StatusBadge,
  args: {
    title: 'status badge',
    status: Status.DEFAULT,
    outliner: false
  }
} 

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
   
  }
}
export const DefaultOutiner: Story = {
  args: {
    outliner: true
   
  }
}


export const Success: Story = {
  args: {
    title: 'status badge success',
    status: Status.SUCCESS,
  }
}
export const SuccessOutiner: Story = {
  args: {
    title: 'status badge success',
    status: Status.SUCCESS,
    outliner: true
   
  }
}



