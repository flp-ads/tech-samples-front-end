import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import custonTheme from "../styles/theme";

import { AllClassProvider } from "./AllClass";
import { AnalysesProvider } from "./Analyses";
import { AnalysisProvider } from "./Analysis";
import { AuthProvider } from "./Auth";
import { ClassProvider } from "./Class";
import { UserFeedbackProvider } from "./UserFeedback";
import { LogoutProvider } from "./Logout";
import { UserRegistrationProvider } from "./UserRegistration";
import { UsersProvider } from "./Users";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <UserFeedbackProvider>
      <AuthProvider>
        <UsersProvider>
          <ClassProvider>
            <AllClassProvider>
              <UserRegistrationProvider>
                <AnalysesProvider>
                  <AnalysisProvider>
                    <LogoutProvider>
                      <ChakraProvider theme={custonTheme}>
                        {children}
                      </ChakraProvider>
                    </LogoutProvider>
                  </AnalysisProvider>
                </AnalysesProvider>
              </UserRegistrationProvider>
            </AllClassProvider>
          </ClassProvider>
        </UsersProvider>
      </AuthProvider>
    </UserFeedbackProvider>
  );
};
