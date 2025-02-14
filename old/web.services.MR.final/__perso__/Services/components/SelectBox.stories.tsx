import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SelectBox from './SelectBox';
import { serviceList } from '../utils';


const meta = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Services/selectBox',
  component: SelectBox,
  args: {
    value: 'select box',
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
    itemList: serviceList()
  }
}satisfies Story;

