'use client';

import ResetPassword from '@systran/react-components/lib/molecules/ResetPassword'
import { commonFetch } from '@/utils/fetcher';
import Apis from '@/utils/apis';

export default function ResetPasswordEmail() {

  const submit = async ({email}: {email: string}) => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        type: 'reset'
      })
    };

    try {
      await commonFetch(Apis.password.sendReset, options);
    }
    catch (error) {
      if (error instanceof Error) {
        const message = error.cause ? error.cause.toString() : 'An error occurred while submitting your new reset password link.';
        throw new Error(message);
      }
      throw new Error('An error occurred while submitting your new reset password link.');
    }
  };

  return <ResetPassword submit={submit} />;

}
