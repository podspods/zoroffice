import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { SearchInput } from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  component: SearchInput,
  args: {
    placeholder: 'Search',
    value: 'la valeur',
    onChange: (event) => action('onChange: ')(event.target.value),
    onClick: () => action('on Click')('valider la recherche')
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
