import * as React from 'react';
import Link from 'next/link';
import {MenuLink} from '@systran/react-components/lib/organisms/AppLayout/SystranMenu';
import { useTranslation } from 'react-i18next';

export type TrsLinks = {
  adminCenter?: string,
  subscription?: string,
  usageDashboard?: string,
  appsAndExtensions?: string
}

export type Props = {
  togglePopover: () => void,
  trsLinks?: TrsLinks
}

export default function UserPopover(props: Props) {
  const {t} = useTranslation();

  const renderTrsMenuLink = (link: string, label: string) => {
    return (<MenuLink>
      <a href={link} target='_blank' rel='noreferrer'>{label}</a>
    </MenuLink>)
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <MenuLink>
        <Link href='/account' onClick={props.togglePopover} >{t('My Account')}</Link>
      </MenuLink>
      {props.trsLinks?.adminCenter && renderTrsMenuLink(props.trsLinks.adminCenter, t('Admin Center'))}
      {props.trsLinks?.subscription && renderTrsMenuLink(props.trsLinks.subscription, t('Subscription'))}
      {props.trsLinks?.usageDashboard && renderTrsMenuLink(props.trsLinks.usageDashboard, t('Usage Dashboard'))}
      {props.trsLinks?.appsAndExtensions && renderTrsMenuLink(props.trsLinks.appsAndExtensions, t('Apps & Extensions'))}
      <MenuLink>
        <a href='/signout' >{t('Log out')}</a>
      </MenuLink>
    </div>
  );
}
