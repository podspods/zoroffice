import { ThemeProvider } from "@emotion/react";
import {  baseTheme, spnsTheme, modelStudioTheme } from "@systran/react-components/lib/Theme/theme";
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
import withI18n from './decorators/I18n';

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
      translatePro: baseTheme,
      spns: spnsTheme,
      modelStudio: modelStudioTheme
    },
    defaultTheme: "translatePro",
    Provider: ThemeProvider
  }),
  withI18n
];
