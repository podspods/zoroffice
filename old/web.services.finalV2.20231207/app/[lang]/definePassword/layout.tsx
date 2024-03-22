import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Define Password'
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
}
