'use client';

import { TemporaryPageBox } from '@/components/TemporaryPageBox';
import NotificationMainPage from './components/NotificationMainPage';
import userAuthorizations from '../../../../lib/userAuthorizations';
import { actions } from '../../../../lib/permissionsList';

export default function Notifications() {
  if (!userAuthorizations.check((actions as any).NOTIF)) return <></>;
  return (
    <TemporaryPageBox>
      <NotificationMainPage />
    </TemporaryPageBox>
  );
}
