import * as React from 'react';
import Link from 'next/link';
import {MenuLink} from '@systran/react-components/lib/organisms/AppLayout/SystranMenu';
import { useTranslation } from 'react-i18next';

export type Props = {
  togglePopover: () => void
}

export default function UserPopover(props: Props) {
  const {t} = useTranslation();

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <MenuLink>
        <Link href='/account' onClick={props.togglePopover} >{t('My Account')}</Link>
      </MenuLink>
      <MenuLink>
        <a href='/signout' >{t('Log out')}</a>
      </MenuLink>
    </div>
  );
}
