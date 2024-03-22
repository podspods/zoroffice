'use client';

import Apis from '@/utils/apis';
import ChangePasswordId from '@/components/Password/ChangePasswordId';

export default function DefinePasswordId({params}: {params: {id: string}}) {

  return <ChangePasswordId tokenId={params.id} type='reset' />;

}
