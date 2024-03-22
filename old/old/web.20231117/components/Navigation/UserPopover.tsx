import * as React from 'react';
import Link from 'next/link';
import {MenuLink} from '@systran/react-components/lib/organisms/AppLayout/SystranMenu';
import { useTranslation } from 'react-i18next';

export default function UserPopover(props) {

  const i18n = useTranslation();
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <MenuLink>
        <Link href='/account' onClick={props.togglePopover} >{i18n.t('My Account')}</Link>
      </MenuLink>
      <MenuLink>
        <Link href='/signout' prefetch={false} >{i18n.t('Log out')}</Link>
      </MenuLink>
    </div>
  );
}
