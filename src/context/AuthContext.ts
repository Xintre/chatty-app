import { createContext } from 'react';

export type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
};

export const defaultAuthContext: AuthContextType = { token: null, setToken(token) {} };

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthContextProvider = AuthContext.Provider;
