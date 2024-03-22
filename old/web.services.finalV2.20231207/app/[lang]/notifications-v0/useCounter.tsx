import React, { createContext, useContext, useState } from 'react';

// Interface pour le store
interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

// Création du contexte pour le store
export const CounterContext = createContext<CounterState | undefined>(
  undefined
);

// Provider du store
export const CounterProvider: React.FC = ({ children }) => {
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  const contextValue: CounterState = {
    count,
    increment,
    decrement
  };

  return (
    <CounterContext.Provider value={contextValue}>
      {children}
    </CounterContext.Provider>
  );
};

// Utilisation du store avec useContext
export const useCounter = (): CounterState => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return context;
};
