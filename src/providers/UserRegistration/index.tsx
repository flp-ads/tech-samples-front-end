import { createContext, ReactNode, useContext } from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { UseFeedback } from "../UserFeedback";

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
  signup: (user: UserData) => void;
}

const UserRegistrationContext = createContext<UserRegistrationData>(
  {} as UserRegistrationData
);

export const UserRegistrationProvider = ({ children }: Props) => {
  const history = useHistory();
  const { errorFeedback, successFeedback } = UseFeedback();

  const signup = (user: UserData) => {
    api
      .post("/register", user)
      .then(() => {
        successFeedback("Usuário criado com sucesso!");
        history.push("/admin/users");
      })
      .catch(() => {
        errorFeedback("Erro ao criar Usuário");
      });
  };

  return (
    <UserRegistrationContext.Provider value={{ signup }}>
      {children}
    </UserRegistrationContext.Provider>
  );
};

export const useSignup = () => useContext(UserRegistrationContext);
