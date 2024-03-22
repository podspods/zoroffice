import { Meta, StoryObj } from '@storybook/react';
import DisplayIcon from '@/components/Services/components/DisplayIcon';
import { IconeName } from './DisplayIcon';

const meta: Meta<typeof DisplayIcon> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Services/DisplayIcon',
  component: DisplayIcon,
  args: {
    iconeName: IconeName.PLUS
  }
};

type Story = StoryObj<typeof meta>;
export default meta;
export const Default: Story = {
  args: {
    iconeName: IconeName.DELETE
  }
};


export const IconePlus: Story = {
  args: {
    iconeName: IconeName.PLUS
  }
};

