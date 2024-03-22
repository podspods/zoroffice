import type { Meta, StoryObj } from '@storybook/react';
import PageTitle from './PageTitle';

const meta = {
  title: 'perso/PageTitle',
  component: PageTitle
} satisfies Meta<typeof PageTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const TestOne: Story = {
 args :{
  children: 'toto'
 }
};



