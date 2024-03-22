import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DisplayLine } from './DisplayLine';
import { Status } from '../services.type';

const meta = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Perso/DisplayLine',
  component: DisplayLine,
  args: {
    label: 'my label',
    value: 'value text',
    innerHtml: <h1>H1 text </h1>,
    column: 0,
    leading: true,
    columnSize: 10,
    leadingSize: 1,
    status: Status.success
  }

} satisfies Meta<typeof DisplayLine>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TestOne: Story = {
  args: {
    label: 'test one'
  }
};

export const Leading: Story = {
  args: { label: 'my lable', value: 'ma value with leading ', leading: true }
};

