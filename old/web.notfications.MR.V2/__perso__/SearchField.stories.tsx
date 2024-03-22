import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SearchField from './SearchField';

const meta: Meta<typeof SearchField> = {
  component: SearchField,
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
