import {
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import api from "../../services/api";

import { useAuth } from "../Auth";
import { UseFeedback } from "../UserFeedback";

interface IClass {
  name: string;
  analyses: [];
  userId: number;
  id: number;
}

interface ClassProviderProps {
  children: ReactNode;
}

interface ClassProviderData {
  allClasses: IClass[];
  getAllClasses: () => void;
  setAllClasses: Dispatch<SetStateAction<IClass[]>>;
  addNewClass: (value: string, userId: number) => void;
}

const AllClassContext = createContext<ClassProviderData>(
  {} as ClassProviderData
);

export const AllClassProvider = ({ children }: ClassProviderProps) => {
  const [allClasses, setAllClasses] = useState<IClass[]>([] as IClass[]);

  const { token } = useAuth();
  const { errorFeedback, sucessFeedback } = UseFeedback();

  const getAllClasses = () => {
    api
      .get("/classes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setAllClasses(response.data));
  };

  const addNewClass = (name: string, userId: number) => {
    api
      .post(
        "/classes",
        { name: name, userId: userId, analyses: [] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => sucessFeedback("Classe Adicionada"))
      .catch(() => errorFeedback("Erro tentar adicionar classe"));
  };

  return (
    <AllClassContext.Provider
      value={{ allClasses, setAllClasses, getAllClasses, addNewClass }}
    >
      {children}
    </AllClassContext.Provider>
  );
};

export const useAllClass = () => useContext(AllClassContext);
