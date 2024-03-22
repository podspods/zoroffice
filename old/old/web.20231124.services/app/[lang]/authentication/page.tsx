'use client';

import { redirect } from 'next/navigation';


export default function Authentication() {
  return redirect('/signin');
}
