import {Meta, StoryObj} from '@storybook/react';
import LanguagePopover from './LanguagePopover';

const meta = {
  title: 'Components/LanguagePopover',
  args: {
  },
  component: LanguagePopover
} satisfies Meta<typeof LanguagePopover>;

export default meta

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
