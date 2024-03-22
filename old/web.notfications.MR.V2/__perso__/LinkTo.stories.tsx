import { Meta, StoryObj } from '@storybook/react';
import LinkTo from '@/components/Services/components/LinkTo';

const meta: Meta<typeof LinkTo> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Services/Linkto',
  component: LinkTo,
  args: {
    label: 'label',
    link: 'http://link.to'
  }
};

type Story = StoryObj<typeof meta>;
export default meta;
export const Default: Story = {
  args: {
    label: 'default',
    link: 'http://default.to'
  }
};
