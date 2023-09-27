'use client';

import { createContext, type ReactNode, useState, useContext } from 'react';

interface LoadingState {
  isLoading: boolean;
}

const LoadingInitState: LoadingState = {
  isLoading: false
};

interface LoadingContextProps {
  state: LoadingState;
  startLoading: () => void;
  endLoading: () => void;
}

export const LoadingContext = createContext({} as any);

export const LoadingProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [state, setState] = useState(LoadingInitState);

  const startLoading = (): void => {
    setState({ isLoading: true });
  };

  const endLoading = (): void => {
    setState({ isLoading: false });
  };

  return (
    <LoadingContext.Provider value={{ state, endLoading, startLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = (): LoadingContextProps => {
  const context = useContext(LoadingContext);
  if (context === undefined)
    throw new Error('useLoadingContext must be used within a LoadingProvider');
  return context;
};
