import * as React from 'react';
import Link from 'next/link';
import {MenuLink} from '@systran/react-components/lib/organisms/AppLayout/SystranMenu';
import { usePathname } from 'next/navigation';
import localesData from '../../locales/languages.json';
import {setLanguageCookie} from '../../app/utils';
import {revalidatePath} from 'next/cache';


export default function LanguagePopover() {

  const pathName = usePathname();
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const locales = localesData.Available;

  const updateLanguageCookie = (locale: string) => {
    setLanguageCookie(locale)
    revalidatePath(pathName)
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      {locales.map((language) => {
        return (
          <MenuLink>
            <Link href={redirectedPathName(language.locale)} onClick={() => updateLanguageCookie(language.locale)}>{language.name}</Link>
          </MenuLink>
        );
      }
      )}
    </div>
  );
}
