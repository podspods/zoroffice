import React, {useEffect} from 'react';
import {I18nextProvider, initReactI18next} from 'react-i18next';
import i18n from 'i18next';

interface WithI18nProps {
  locale: string;
}

i18n.use(initReactI18next)
  .use({
    type: 'postProcessor',
    name: 'storybook',
    process: function(value, key, options, translator) {
      if (translator.language === 'toUpperCase') {
        return value.toUpperCase()
      }
      if (translator.language === 'identity') {
        return value
      }
      return value
    }
  })
  .init({
    fallbackLng: false,
    interpolation: {escapeValue: false},
    postProcess: ['storybook'],
    resources: {
      identity: {
        translation: {}
      },
      toUpperCase: {
        translation: {}
      }
    }
  });

export default function withI18n(Story: React.ComponentType, context: {globals: WithI18nProps}): JSX.Element {
  const {locale} = context.globals;

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return (
    <I18nextProvider i18n={i18n}>
      <Story />
    </I18nextProvider>
  );
};

