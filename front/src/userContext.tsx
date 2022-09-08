import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from "react";

import { AUTH } from "./constants";

type Props = {
  children: React.ReactNode;
};

type Context = {
  signIn: (user: string, token: string) => void;
  signOut: () => void;
  user: string | null;
};

const UserContext = createContext<Context>({
  signIn: () => {},
  signOut: () => {},
  user: null,
});

const UserContextProvider = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useState<any | null>(null);

  const signOut = useCallback(() => {
    localStorage.removeItem(AUTH.token);
    localStorage.removeItem(AUTH.email);
    setUser(null);
  }, []);

  const signIn = useCallback((user: any, token: string) => {
    localStorage.setItem(AUTH.token, token);
    localStorage.setItem(AUTH.email, JSON.stringify(user));
    setUser(user.email);
  }, []);

  useEffect(() => {
    const restoreUser = () => {
      const user = localStorage.getItem(AUTH.email);
      if (user) {
        setUser(user);
      }
    };

    restoreUser();
  }, []);

  const contextValue = useMemo(
    () => ({
      signIn,
      signOut,
      user,
    }),
    [signIn, signOut, user]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUserContext was used outside of its Provider");
  }

  return context;
};

export default UserContextProvider;
