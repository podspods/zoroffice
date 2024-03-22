import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DisplayLine from './DisplayLine';
import { Status } from './serviceType';


const meta: Meta<typeof DisplayLine> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Services/DisplayLine',
  component: DisplayLine,
  args: {
    label: 'my label',
    value: 'value text',
    innerHtml: <h1>H1 text </h1>,
    column: 0,
    leading: true,
    columnSize: 10,
    leadingSize: 1,
    status: Status.SUCCESS
  }

};

export default meta;

type Story = StoryObj<typeof meta>;

export const TestOne: Story = {
  args: {
    label: 'test one'
  }
};

export const Leading: Story = {
  args: { label: 'my lable', value: 'my value with leading ', leading: true }
};

export const ErrorCase: Story = {
  args: { label: 'my lable', value: 'my value in error', leading: true, status: Status.ERROR}
};


export const Column_1: Story = {
  args: { label: 'my lable', value: 'my value in error', leading: true, status: Status.ERROR, column: 1}
};
