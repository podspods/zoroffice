
import { ThemeProvider } from '@emotion/react';
import { DEFAULT_THEME } from '@systran/react-components/lib/Theme';
import {ModelStudioPrimaryPalette, TranslateCloudPrimaryPalette,  TranslateServerPrimaryPalette
} from '@systran/react-components/.storybook/static/primaryPalettes';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
import withI18n from './decorators/I18n';
import merge from 'lodash/merge';

const translateServerTheme = merge({}, DEFAULT_THEME, {palette: {primary: TranslateServerPrimaryPalette}});
const translateCloudTheme = merge({}, DEFAULT_THEME, {palette: {primary: TranslateCloudPrimaryPalette}});
const modelStudioTheme = merge({}, DEFAULT_THEME, {palette: {primary: ModelStudioPrimaryPalette}});


export const globalTypes = {
  locale: {
    name: 'I18n',
    description: 'I18n',
    defaultValue: 'identity',
    toolbar: {
      title: 'i18n',
      dynamicTitle: true,
      icon: 'globe',
      items: [
        { value: 'identity', left: '🔄', title: 'Identity' },
        { value: 'toUpperCase', left: '⬆️', title: 'Uppercase' }
      ],
      showName: true
    },
  },
};

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      base: DEFAULT_THEME,
      translateCloud: translateCloudTheme,
      translateServer: translateServerTheme,
      modelStudio: modelStudioTheme
    },
    defaultTheme: 'translateCloud',
    Provider: ThemeProvider
  }),
  withI18n
];

