'use client';

import useSWRImmutable from 'swr/immutable';
import {getValidator} from '@systran/iam/dist/lib/password/validation'
import { useTranslation } from 'react-i18next';
import Apis from '@/utils/apis';
import { commonFetch } from '@/utils/fetcher';
import DefinePassword from '@systran/react-components/lib/molecules/DefinePassword'

export default function ChangePasswordId({tokenId, type}: {tokenId: string, type: 'reset' | 'define'}) {
  const {t} = useTranslation();

  const route = type === 'define' ? Apis.password.define(tokenId) : Apis.password.reset(tokenId);

  const { error: accessError, isLoading: accessIsLoading } = useSWRImmutable(route);
  const { data: rules = [] } = useSWRImmutable(Apis.password.rules);

  if (accessError) {
    throw accessError;
  }

  const validateRules = getValidator(rules); // eslint-disable-line

  const submit = async ({newPassword}: {newPassword: string}) => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        password: newPassword,
        type
      })
    };

    try {
      await commonFetch(route, options);
    }
    catch (error) {
      const message = error instanceof Error && error.cause
        ? error.cause.toString()
        : t('An error occurred while submitting your new password.');
      throw new Error(message);
    }
  };

  return !accessIsLoading && <DefinePassword validateRules={validateRules} submit={submit} type={type} />;
}
