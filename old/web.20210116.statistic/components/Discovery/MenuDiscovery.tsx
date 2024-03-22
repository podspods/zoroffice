'use client';

import {PropsWithChildren, ReactNode, useContext, useEffect, useState} from 'react';
import UserIcon from '@systran/react-components/lib/atoms/Icons/UserIcon';
import QuestionIcon from '@systran/react-components/lib/atoms/Icons/QuestionIcon';
import BellIcon from '@systran/react-components/lib/atoms/Icons/BellIcon';
import GlobeIcon from '@systran/react-components/lib/atoms/Icons/GlobeIcon';
import InfoIcon from '@systran/react-components/lib/atoms/Icons/InfoIcon';
import NavBar, { type NavCategory } from '@systran/react-components/lib/organisms/AppLayout/NavBar/NavBar';
import SystranMenu, { MenuButtonsContainer, MenuPopover } from '@systran/react-components/lib/organisms/AppLayout/SystranMenu';
import Screen from '@systran/react-components/lib/organisms/AppLayout/Screen';
import MenuButton from '@systran/react-components/lib/atoms/Buttons/MenuButton';
import Link from 'next/link';
import UserPopover from '../Navigation/UserPopover';
import LanguagePopover from '../Navigation/LanguagePopover';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import useSWR from 'swr';
import {SettingsContext, type Settings} from '@/components/SettingProvider';
import {getRedirectionPathName, handleSigninRedirection, setLanguageCookie} from '../../app/utils';
import {usePathname, redirect, useParams} from 'next/navigation';
import {initUserAuthorizations, hasAccessToInfoPage, isValidRolesPermissions} from '../UserAuthorizations';
import MenuItemDirectorBuilder from './MenuItems/DirectorBuilder';
import Apis from '../../utils/apis';
import { setCsrfToken } from '@/utils/fetcher';

declare global {
  interface Window {
    i18n: UseTranslationResponse<'translation', undefined>;
  }
}

export type Props = PropsWithChildren<{lang: string, MenuLogo: ReactNode, hideSystranLogoNavBar: boolean, documentationLink?: string}>

const MenuDiscovery = ({children, ...props}: Props) => {

  const [localizationPopoverIsOpen, setLocalizationPopoverIsOpen] = useState(false);
  const [profilePopoverIsOpen, setProfilePopoverIsOpen] = useState(false);

  const i18n = useTranslation();
  const pathname = usePathname();

  const { initSettings } = useContext(SettingsContext);

  const params = useParams();

  const currentPathName = getRedirectionPathName(pathname, params.lang, params.id);

  useEffect(() => {
    window['i18n'] = i18n;
    const language = params.lang.toString();
    setLanguageCookie(language);
  }, [params.lang]);

  const toggleLocalizationPopover = () => {
    setTimeout(() => { // necessary to allow the popover to open due to the ClickAwayListener
      setLocalizationPopoverIsOpen(!localizationPopoverIsOpen);
    }, 1);
  };

  const toggleProfilePopover = () => {
    setTimeout(() => {
      setProfilePopoverIsOpen(!profilePopoverIsOpen);
    }, 1);
  };

  useSWR<Settings>(
    Apis.globalSettings,
    {
      dedupingInterval: 1000 * 60 * 60 * 24 * 365,
      onError: (err) => {
        console.error('Error fetching global settings:', err) // eslint-disable-line
      },
      onSuccess: (data) => {
        if (data.csrfToken) {
          setCsrfToken(data.csrfToken);
        }
        initSettings(data);
      }
    }
  );

  const {data: rolesPermission} = useSWR(
    Apis.userRoles,
    {
      shouldRetryOnError: false, revalidateOnFocus: false,
      onError: (err) => console.error('Error fetching permissions:', err) // eslint-disable-line
    }
  );

  if (rolesPermission === undefined) {
    // we didn't check for globalsettings to be defined because we don't use it in the render of the menu
    return null;
  }

  const isConnected = rolesPermission?.id !== '0';
  const isAnonymousUser = rolesPermission?.id === '0';

  const isAuthenticationPath = pathname.includes('/authentication') || pathname.includes('/resetPassword') || pathname.includes('/definePassword');

  if (!isConnected && !isAuthenticationPath) {
    handleSigninRedirection({serviceName: pathname});
  }
  if (isConnected && isAuthenticationPath) {
    redirect('/');
  }

  let items: NavCategory[] = [];
  let adminItems: NavCategory = { navItems: [], categoryTitle: '' };
  let displayInfoButton = false;
  if (isValidRolesPermissions(rolesPermission)) {
    initUserAuthorizations(rolesPermission);
    const menuItemDirector = MenuItemDirectorBuilder();
    items = menuItemDirector.makeItems();
    adminItems = menuItemDirector.makeAdminItems();
    displayInfoButton = hasAccessToInfoPage();
  }

  const buildMenuContainer = () => {
    const linkDocumentation = props.documentationLink ? props.documentationLink + props.lang : `/doc/${props.lang}/index.html`;
    if (isAnonymousUser) {
      return (
        <MenuButtonsContainer>
          <MenuButton icon={<GlobeIcon />} tooltipLabel={'Navigation Language'} onClick={toggleLocalizationPopover} />
        </MenuButtonsContainer>
      );
    }
    return (
      <MenuButtonsContainer>
        {displayInfoButton && <Link href='/information/view' prefetch={false}>
          <MenuButton tooltipLabel={'Info Page'} icon={<InfoIcon />} />
        </Link>}
        <Link href='/notifications' prefetch={false}>
          <MenuButton tooltipLabel={'Notifications'} icon={<BellIcon />} />
        </Link>
        <Link href={linkDocumentation} target='_blank' rel='noopener noreferrer' prefetch={false}>
          <MenuButton tooltipLabel={'Help'} icon={<QuestionIcon />} />
        </Link>
        <MenuButton icon={<GlobeIcon />} tooltipLabel={'Navigation Language'} onClick={toggleLocalizationPopover} />
        <MenuButton icon={<UserIcon />} tooltipLabel={'My Account'} onClick={toggleProfilePopover} />
      </MenuButtonsContainer>
    );
  };

  return (
    <div className='content' style={{ display: 'flex', flex: '1' }}>
      <SystranMenu appLogo={props.MenuLogo as any}>
        {buildMenuContainer()}
      </SystranMenu>
      <NavBar
        items={items}
        adminItems={adminItems}
        selectedButtonInitial={currentPathName}
        hideLogoSystran={props.hideSystranLogoNavBar}
      />
      <Screen withoutMenu={isAnonymousUser}>
        <div style={{ display: 'flex', flex: '1', width: '100%' }}>
          <MenuPopover open={localizationPopoverIsOpen} title={i18n.t('Language')} onClose={() => setLocalizationPopoverIsOpen(false)}>
            <LanguagePopover />
          </MenuPopover>
          <MenuPopover open={profilePopoverIsOpen} title={i18n.t('Account')} onClose={() => setProfilePopoverIsOpen(false)}>
            <UserPopover togglePopover={toggleProfilePopover} />
          </MenuPopover>
          {children}
        </div>
      </Screen>
    </div>
  );
};

export default MenuDiscovery;
