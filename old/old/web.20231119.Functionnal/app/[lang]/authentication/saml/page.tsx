'use client';

import {redirect} from 'next/navigation';


export default function AuthSaml() {
  // TODO: review this screen with Izzy
  // TODO: and handle redirection
  // return (
  //   <div>
  //     <a onClick={() => router.push('/auth/saml')}>Signin with SAML</a>
  //   </div>
  // );
  return redirect('/auth/saml');
}
