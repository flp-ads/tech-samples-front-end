import { createContext, ReactNode, useContext, useState } from "react";
import api from "../../services/api";
import { useAllClass } from "../AllClass";
interface AnalysisProviderProps {
  children: ReactNode;
}
interface IClass {
  name: string;
  id?: number;
}
interface IAnalysis {
  name: string;
  batch: string;
  made: string;
  category: string;
  class: string;
  analyses: [];
  isConcluded: boolean;
  userId: number;
  id: number;
}
interface AnalysesProviderData {
  analyses: IAnalysis[];
  getAllAnalyses: () => void;
  // setAnalyses: Dispatch<SetStateAction<IAnalysis[]>>;
  newAnalysis: (analysisData: IAnalysis) => void;
}
const AnalysisContext = createContext<AnalysesProviderData>(
  {} as AnalysesProviderData
);
export const AnalysisProvider = ({ children }: AnalysisProviderProps) => {
  const [analyses, setAnalyses] = useState<IAnalysis[]>([] as IAnalysis[]);
  const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZXhAdGVzdGUuY29tIiwiaWF0IjoxNjMxNzM5MjU4LCJleHAiOjE2MzE3NDI4NTgsInN1YiI6IjUifQ.gO0moNOH8WxM0d5hMol3qaj3BNB5P_LdpeGZklrFOVc";
  const getAllAnalyses = () => {
    api
      .get("/analyses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAnalyses(response.data);
      });
  };
  const { allClasses, getAllClasses } = useAllClass();
  const [classe, setClasse] = useState<IClass[]>([] as IClass[]);
  const handleClass = (className: string) => {
    const newClass = allClasses.filter((item) => item.name === className);
    setClasse(newClass);
  };
  const newAnalysis = (analysisData: IAnalysis) => {
    const { name, batch, category, class: IClass, made } = analysisData;
    getAllClasses();
    handleClass(IClass);
    api
      .post(
        "/analyses",
        {
          name: name,
          batch: batch,
          category: category,
          class: IClass,
          isConcluded: false,
          made: made,
          analyses: classe,
          userId: 5,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => console.log(response));
  };
  return (
    <AnalysisContext.Provider value={{ getAllAnalyses, analyses, newAnalysis }}>
      {children}{" "}
    </AnalysisContext.Provider>
  );
};
export const useAnalyses = () => useContext(AnalysisContext);