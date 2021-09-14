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
  category: string;
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
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQHRlc3RlLmNvbSIsImlhdCI6MTYzMTYxNzk3NSwiZXhwIjoxNjMxNjIxNTc1LCJzdWIiOiIzIn0.FAKbFOCq5Uif4wpCojYhrXU6JHA0Z03IYq3OrVGrV8c";

  const getAllClasses = () => {
    api
      .get("/classes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setAllClasses(response.data));
  };

  const addNewClass = (value: any, userId: number) => {
    api
      .post(
        "/classes",
        { name: value, userId: userId },
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
