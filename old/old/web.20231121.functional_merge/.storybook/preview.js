import { SystranThemeProvider } from '@systran/react-components/lib/Theme/ThemeProvider';
import {  DEFAULT_THEME } from "@systran/react-components/lib/Theme";
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
import withI18n from './decorators/I18n';
import translateServerPrimary from '../public/custom/theme/translate_server_theme.json';
import merge from 'lodash/merge';

const translateCloudPrimary = {
  "palette": {
    "primary": {
    "extraDark": "#1C5E0D",
    "dark": "#21710F",
    "main": "#24890D",
    "border": "#8DC381",
    "light": "#E8F8E5",
    "extraLight": "#F3FEF1"
    }
  }
}

const translateServerTheme = merge({}, DEFAULT_THEME, translateServerPrimary);
const translateCloudTheme = merge({}, DEFAULT_THEME, translateCloudPrimary);

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
      default: DEFAULT_THEME,
      TranslateServer: translateServerTheme,
      TranslateCloud: translateCloudTheme
    },
    defaultTheme: "TranslateServer",
    Provider: SystranThemeProvider
  }),
  withI18n
];
