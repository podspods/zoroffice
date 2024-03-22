import React from 'react';
import { Metadata } from 'next';
import { PAGE_NAME } from '../../../components/Notifications/constant';

export const metadata: Metadata = {
  title: {
    absolute: PAGE_NAME
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <React.Fragment>{children}</React.Fragment>;
}
