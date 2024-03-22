import {redirect} from 'next/navigation';
import Cookies from 'js-cookie';
import {Available} from '../locales/languages.json';
import i18n from '../i18n';
import { isIn } from '@systran/react-components/lib/atoms/utils';

const LOCALES = Available.map(({locale}) => locale);
export function handleSigninRedirection({serviceName = '', onClick = false}) {
  setServiceCookie(serviceName);

  const redirectURL = `/signin?service=${serviceName}`;
  if (!onClick)
    redirect(redirectURL);
  else
    window.location.replace(redirectURL);
}

export function setServiceCookie(service: string) {
  const formattedLocalesPath = LOCALES.map((locale) => `/${locale}`);
  if (formattedLocalesPath.includes(service) || service.includes('/authentication/')) {
    return;
  }
  Cookies.set('_service', service, {secure: true, expires: 10000});
}

export function setLanguageCookie(language: string) {
  if (!LOCALES.includes(language)) {
    return;
  }
  Cookies.set('language', language, {secure: true});
  i18n.changeLanguage(language)
    .then(() => {
    })
    .catch(() => {
    });
}

export const redirections = {
  '/translationTools': '/translationTools/text',
  '/administration': '/administration/users',
  '/advancedConfiguration': '/advancedConfiguration/translationResources',
  '/statistics': '/statistics/personal',
  '/resourcesManagement': '/resourcesManagement/dictionary'
};

export function getRedirectionPathName(pathname: string, lang: string | string[], id?: string | string[]) {
  const pathNameNoLocale = pathname.replace(`/${lang}`, '');
  const pathNameNoId = id ? pathNameNoLocale.replace(`/${id}`, '') : pathNameNoLocale;
  let currentPathName = pathNameNoId ? pathNameNoId : '/translationTools/text';
  if (isIn(currentPathName, redirections)) {
    currentPathName = redirections[currentPathName];
  }
  return currentPathName;
}
