import { createContext, ReactNode, useContext } from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";

interface UserData {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

interface Props {
  children: ReactNode;
}

interface UserRegistrationData {
  signup: (
    user: UserData,
    toastFunction: (msg: string, err?: boolean) => void
  ) => void;
}

const UserRegistrationContext = createContext<UserRegistrationData>(
  {} as UserRegistrationData
);

export const UserRegistrationProvider = ({ children }: Props) => {
  const history = useHistory();

  const signup = (
    user: UserData,
    toastFunction: (msg: string, err?: boolean) => void
  ) => {
    api
      .post("/register", user)
      .then((res) => {
        console.log("Usuário criado com sucesso!", res);
        toastFunction("Usuário criado com sucesso!");
        history.push("/users");
      })
      .catch((err) => {
        toastFunction("Erro ao criar Usuário", true);
        console.log(err);
      });
  };

  return (
    <UserRegistrationContext.Provider value={{ signup }}>
      {children}
    </UserRegistrationContext.Provider>
  );
};

export const useSignup = () => useContext(UserRegistrationContext);
