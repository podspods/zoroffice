import { NextResponse, NextRequest } from 'next/server';
import localesData from './locales/languages.json';
import {internalRoutes} from "./internalRoutes";

const locales = localesData.Available;

const localeList = locales.map((locale) => {
  return locale.locale;
});

const getBrowserLanguage = (req: NextRequest) => {
  return req.headers
    .get('accept-language')
    ?.split(',')
    .map((i) => i.split(';'))
    ?.reduce(
      (ac: { code: string; priority: string }[], lang) => [
        ...ac,
        { code: lang[0], priority: lang[1] }
      ],
      []
    )
    ?.sort((a, b) => (a.priority > b.priority ? -1 : 1))
    ?.find((i) => localeList.includes(i.code.substring(0, 2)))
    ?.code?.substring(0, 2);
};

/**
 * This middleware is only to localize the internal routes
 * if the route starts with the name of a folder in app/[lang] we put a locale in front
 * else we do nothing
 * if a route is added in /app/[lang] don't forget to add it to internalRoutes.ts file
 * if there is a problem with the localization, check that the route you want localized is in internalRoutes.ts file
 **/
export default function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams.toString();

  const pathNameShouldBeLocalized = internalRoutes.some((path) => pathname.startsWith(path)) || pathname === '/';
  // Redirect if there is no locale and the path a page of the app
  if ((pathNameShouldBeLocalized)) {
    const cookieLanguage = request.cookies.get('language')?.value;
    const defaultLocale = localesData.Default || 'en';
    const locale = cookieLanguage || getBrowserLanguage(request) || defaultLocale;
    // e.g. incoming request is /products
    // The new URL is now /en/products
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}?${searchParams}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)'
    // Optional: only run on root (/) URL
    // '/'
  ]
};
