import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {SearchInput} from './SearchInput';


const meta = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Services/searchInput',
  component: SearchInput,
  args: {
    value: 'la valeur',
    onChange: (event) => action('onChange: ')(event.target.value),
    onClick: () => action('on Click')('valider la recherche')
  }


} satisfies Meta<typeof SearchInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
}satisfies Story;

