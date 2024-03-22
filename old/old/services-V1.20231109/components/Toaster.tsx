import React from 'react';
import toast, { Toaster as OriginalToater } from 'react-hot-toast';

export type ToasterProps = {
  message?: string;
};

// add toast here to display message

export default function Toaster({
  message = 'toast sans beurre'
}: ToasterProps) {
  toast(message);

  return <OriginalToater />;
}
