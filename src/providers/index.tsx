import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import custonTheme from "../styles/theme";
import { AuthProvider } from "./Auth";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <AuthProvider>
      <ChakraProvider theme={custonTheme}>{children}</ChakraProvider>
    </AuthProvider>
  );
};
