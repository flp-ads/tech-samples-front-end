import { createContext, ReactNode, useContext, useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../Auth";

interface Props {
  children: ReactNode;
}

interface LogoutProviderData {
  logout: () => void;
}

const LogoutContext = createContext<LogoutProviderData>(
  {} as LogoutProviderData
);

export const LogoutProvider = ({ children }: Props) => {
  const { setAuth } = useAuth();
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    setAuth("");

    history.push("/");
  };

  return (
    <LogoutContext.Provider value={{ logout }}>
      {children}
    </LogoutContext.Provider>
  );
};

export const useLogout = () => useContext(LogoutContext);
