import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import custonTheme from "../styles/theme";
import { AuthProvider } from "./Auth";
import { ClassProvider } from "./Class";
import { UsersProvider } from "./Users";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <AuthProvider>
      <UsersProvider>
        <ClassProvider>
          <ChakraProvider theme={custonTheme}>{children}</ChakraProvider>
        </ClassProvider>
      </UsersProvider>
    </AuthProvider>
  );
};
