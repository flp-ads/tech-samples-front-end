import {
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import api from "../../services/api";

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
  addNewClass: (value: any, userId: number) => void;
}

const AllClassContext = createContext<ClassProviderData>(
  {} as ClassProviderData
);

export const AllClassProvider = ({ children }: ClassProviderProps) => {
  const [allClasses, setAllClasses] = useState<IClass[]>([] as IClass[]);
//   console.log(allClasses)
  // const token = localStorage.getItem("token") || "[]";
  const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZXhAdGVzdGUuY29tIiwiaWF0IjoxNjMxNzA0OTk4LCJleHAiOjE2MzE3MDg1OTgsInN1YiI6IjUifQ.Y3sNhSDQH2r6BJEQ9g6GLWx5qb7YFO5NwKf4jUTyabk";

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
      .then((response) => console.log(response.data));
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
