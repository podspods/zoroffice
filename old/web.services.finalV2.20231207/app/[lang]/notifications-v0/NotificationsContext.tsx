// NanoStoreContext.tsx
import React, {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  ReactNode
} from 'react';

type NotificationsState = {
  [key: string]: any;
  refreshAsked: boolean;
};

type NotificationsAction = { type: 'SET_VALUE'; key: string; value: any };

type NotificationContextType = {
  state: NotificationsState;
  dispatch: Dispatch<NotificationsAction>;
};

const NotificationContex = createContext<NotificationContextType | undefined>(
  undefined
);

/** ------------------ function  ------------------------*/

function reducer(state: NotificationsState, action: NotificationsAction) {
  switch (action.type) {
    case 'SET_VALUE':
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }
}
/** ------------------ function  ------------------------*/

export function NotificationsContext({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {} as NotificationsState);

  return (
    <NotificationContex.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContex.Provider>
  );
}

/** ------------------ function  ------------------------ */

export function useNotificationHook(): NotificationContextType {
  const context = useContext(NotificationContex);
  if (!context) {
    throw new Error(
      'useNotificationHook must be used within a NotificationsContext'
    );
  }
  return context;
}

export function setContext(key: string, value: any) {
  const { dispatch } = useContext(NotificationContex);
  dispatch({ type: 'SET_VALUE', key: key, value: value });
}
