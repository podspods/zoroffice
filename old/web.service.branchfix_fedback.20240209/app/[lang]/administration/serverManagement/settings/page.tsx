'use client';

import userAuthorizations from '../../../../../../lib/userAuthorizations';
import {actions} from '../../../../../../lib/permissionsList';
import useSWR from 'swr';
import Apis from '@/utils/apis';
import SettingsWrapper from './components/SettingsWrapper';
import SkeletonContent from '@/components/IframeLoader';

export default function AdministrationServerManagementSettings() {
  const hasSettingPermission = userAuthorizations.check((actions as any).ADMIN_SETTINGS);

  if (!hasSettingPermission) {
    return null;
  }

  const {data: settings, isLoading: isSettingsLoading, mutate: mutateSetting} = useSWR(Apis.setting.listSettings, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    onError: (err) => console.error('fetching settings:', err) // eslint-disable-line
  });

  const {data: template, isLoading: isTemplateLoading, mutate: mutateTemplate} = useSWR(Apis.setting.listTemplate, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    onError: (err) => console.error('fetching template:', err) // eslint-disable-line
  });

  if (isSettingsLoading || isTemplateLoading) {
    return <SkeletonContent />;
  }

  return (
    <SettingsWrapper
      settings={settings}
      template={template}
      mutateSetting={mutateSetting}
      mutateTemplate={mutateTemplate}
    />
  );
}
