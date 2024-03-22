import {PropsWithChildren, createContext, useState} from 'react';

export type ToastMessage = {
  label: string;
  status: 'error' | 'success' | 'info' | 'warning';
} | undefined

export type UpdateToastMessage = (toastMessage: ToastMessage) => void;

interface ToastContext {
  toastMessage: ToastMessage;
  updateToastMessage: (toastMessage: ToastMessage) => void;
}

export const ToastMessageContext = createContext<ToastContext>({
  toastMessage: undefined,
  updateToastMessage: () => {}
});

export default function ToastMessageProvider({children, initialToastMessage = undefined}: PropsWithChildren & {initialToastMessage?: ToastMessage}) {
  const [toastMessage, setToastMessage] = useState<ToastMessage>(initialToastMessage);

  const updateToastMessage = (toastMessage: ToastMessage) => {
    setToastMessage(toastMessage);
  };

  return (
    <ToastMessageContext.Provider value={{toastMessage, updateToastMessage}}>
      {children}
    </ToastMessageContext.Provider>
  );
}
