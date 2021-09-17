import { createContext, ReactNode, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { UseFeedback } from "../UserFeedback";

interface UserLoginData {
  email: string;
  password: string;
}

interface Props {
  children: ReactNode;
}

interface UserLocalData {
  email: string;
  username: string;
  isAdmin: true;
  id: number;
}

interface AuthProviderData {
  token: string;
  setAuth: (value: string) => void;
  login: (
    userData: UserLoginData,
    errorMessage: string,
    successMessage: string
  ) => void;
  user: UserLocalData;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: Props) => {
  const token = localStorage.getItem("@TechSamples/token") || "";
  const [auth, setAuth] = useState<string>(token);
  const localUser = localStorage.getItem("@TechSamples/user") || "";
  const [user, setUser] = useState(() => {
    if (localUser) {
      return JSON.parse(localUser);
    }
    return {};
  });
  const { errorFeedback, successFeedback } = UseFeedback();
  const history = useHistory();

  const login = (
    userData: UserLoginData,
    errorMessage: string,
    successMessage: string
  ) => {
    api
      .post("/login", userData)
      .then((response) => {
        localStorage.setItem("@TechSamples/token", response.data.accessToken);
        setAuth(response.data.accessToken);
        localStorage.setItem(
          "@TechSamples/user",
          JSON.stringify(response.data.user)
        );
        setUser(response.data.user);
        successFeedback(successMessage);
        history.push("/admin");
      })
      .catch((err) => {
        errorFeedback(errorMessage);
      });
  };

  return (
    <AuthContext.Provider value={{ token: auth, setAuth, login, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
