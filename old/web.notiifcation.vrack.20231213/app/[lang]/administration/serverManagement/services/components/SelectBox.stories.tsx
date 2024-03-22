import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SelectBox from './SelectBox';
import { Status } from './serviceType';


const meta: Meta<typeof SelectBox> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Services/SelectBox',
  component: SelectBox,
  args: {

  }

};

export default meta;

type Story = StoryObj<typeof meta>;

export const TestOne: Story = {

};
