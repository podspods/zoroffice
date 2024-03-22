import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { SelectBox } from './SelectBox';
import { ALL_LEVEL, LEVEL_LIST } from '../notifications.constant';


const meta:Meta<typeof SelectBox> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'notifications/selectBox',
  component: SelectBox,
  args: {
    name: 'select primary',
    itemList: ['item 1', 'item 2', 'item 3'],
    onChange: (event) => action('onChange: ')(event.target.value)
  }
} 

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'select default',
    itemList: ['spring', 'summer', 'fall', 'winter']
  }
}


export const notification: Story = {
  args: {
    name: 'Level',
    itemList: LEVEL_LIST,
  }
}

export const notificationAndDefautl: Story = {
  args: {
    name: 'Level',
    defaultValue : ALL_LEVEL,
    itemList: LEVEL_LIST,
  }
}


