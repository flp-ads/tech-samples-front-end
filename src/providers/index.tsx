import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import custonTheme from "../styles/theme";

import { AllClassProvider } from "./AllClass";
import { AnalysesProvider } from "./Analyses";
import { AnalysisProvider } from "./Analysis";
import { AuthProvider } from "./Auth";
import { ClassProvider } from "./Class";
import { UsersProvider } from "./Users";
import { UserRegistrationProvider } from "./UserRegistration";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <AuthProvider>
      <UsersProvider>
        <ClassProvider>
          <AllClassProvider>
            <UserRegistrationProvider>
              <AnalysesProvider>
                <AnalysisProvider>
                <ChakraProvider theme={custonTheme}>{children}</ChakraProvider>
                </AnalysisProvider>
              </AnalysesProvider>
            </UserRegistrationProvider>
          </AllClassProvider>
        </ClassProvider>
      </UsersProvider>
    </AuthProvider>
  );
};
