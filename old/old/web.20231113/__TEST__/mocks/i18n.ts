import type {i18n as i18nInterface} from 'i18next';

export const fakeUpperCasei18n: Partial<i18nInterface> = {
  t: function(text: string) {
    return text && text.toUpperCase() || '';
  },
  language: ''
};

export const fakei18n: Partial<i18nInterface> = {
  t: function(text: string) {
    return text || '';
  },
  language: ''
};

export const fakeIdentityi18n: Partial<i18nInterface> = {
  t: function(text: string) {
    return text || '';
  },
  language: ''
};

export const fakeUpperCasei18nWithPrintf: Partial<i18nInterface> = {
  t: function(text: string, opts?: {sprintf: Array<number | string>}) {
    if (opts) {
      opts.sprintf.forEach((value) => {
        let pattern: '%d' | '%s';
        if (typeof value === 'number') {
          pattern = '%d';
        }
        else {
          pattern = '%s';
        }
        text = text.replace(pattern, value);
      });
    }
    return text && text.toUpperCase() || '';
  },
  language: ''
};

export const fakeIdentityi18nWithPrintf: Partial<i18nInterface> = {
  t: function(text: string, opts?: {sprintf: Array<number | string>}) {
    if (opts) {
      opts.sprintf.forEach((value) => {
        let pattern: '%d' | '%s';
        if (typeof value === 'number') {
          pattern = '%d';
        }
        else {
          pattern = '%s';
        }
        text = text.replace(pattern, value);
      });
    }
    return text || '';
  },
  language: ''
};
