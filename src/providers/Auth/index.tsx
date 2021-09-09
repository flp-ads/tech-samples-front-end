import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";

interface UserLoginData {
  email: string;
  password: string;
}

interface Props {
  children: ReactNode;
}

const AuthContext = createContext({});

export const AuthProvider = ({ children }: Props) => {
  const token = localStorage.getItem("token") || "";
  const [auth, setAuth] = useState<string>(token);
  const localUser = localStorage.getItem("user") || "";
  const [user, setUser] = useState(JSON.parse(localUser));
  const history = useHistory();

  const login = (
    userData: UserLoginData,
    setError: Dispatch<SetStateAction<boolean>>
  ) => {
    api
      .post("/login", userData)
      .then((response) => {
        localStorage.setItem("token", response.data.accessToken);
        setAuth(response.data.accessToken);
        setUser(response.data.user);
        history.push("/dashboard");
      })
      .catch((err) => setError(true));
  };

  return (
    <AuthContext.Provider value={{ token: auth, setAuth, login, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
