import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ALL_LEVEL, LEVEL_LIST } from 'app/[lang]/notifications/notifications.constant';
import { SelectBox } from './SelectBox';


const meta = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Component/selectBox',
  component: SelectBox,
  args: {
    name: 'select primary',
    itemList: ['item 1', 'item 2', 'item 3'],
    onChange: (event) => action('onChange: ')(event.target.value)
  }
} satisfies Meta<typeof SelectBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'select default',
    itemList: ['spring', 'summer', 'fall', 'winter']
  }
}satisfies Story;

export const OnPage: Story = {
  args: {
    name: 'select default',
    // itemList: serviceList()
  }
};


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
