import React, { createContext } from 'react';

export interface UseDeFiContextType {}

export const UseDeFiContext = createContext<UseDeFiContextType>({});

export interface UseDeFiContextProviderProps {
  children: React.ReactNode;
}

export default function UseDeFiProvider({ children }: UseDeFiContextProviderProps) {
  return <UseDeFiContext.Provider value={{}}>{children}</UseDeFiContext.Provider>;
}
