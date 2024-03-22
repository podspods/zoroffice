import {Meta, StoryObj} from '@storybook/react';
import SettingsWrapper from './SettingsWrapper';
import {action} from '@storybook/addon-actions';


const fakei18n = {
  t: function(text: string) {
    return text || '';
  },
  language: ''
};

(global as any).i18n = fakei18n;

import settings from './json/settings.json';
import template from './json/template.json';

const meta = {
  args: {
    settings: {},
    template: {},
    mutateSetting: async () => action('mutate')(),
    mutateTemplate: async () => action('mutate')()
  },
  component: SettingsWrapper
} satisfies Meta<typeof SettingsWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoadedWithSettings = {
  args: {
    settings: settings,
    template: template
  }
} satisfies Story;
