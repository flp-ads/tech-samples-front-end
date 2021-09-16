import { createContext, ReactNode, useContext, useState } from "react";

import api from "../../services/api";

import { useAllClass } from "../AllClass";
import { useAuth } from '../Auth'

interface AnalysesProviderProps {
  children: ReactNode;
}

export interface IAnalysis {
  name: string;
  batch: string;
  made: string;
  category: string;
  class: string;
  analyses: [];
  isConcluded: boolean;
  userId: number;
  id: number,
}

interface AnalysesProviderData {
  analyses: IAnalysis[];
  getAllAnalyses: () => void;
  newAnalysis: (analysisData: IAnalysis) => void;
}

const AnalysesContext = createContext<AnalysesProviderData>(
  {} as AnalysesProviderData
);

export const AnalysisProvider = ({ children }: AnalysesProviderProps) => {

  const [analyses, setAnalyses] = useState<IAnalysis[]>([] as IAnalysis[]);
  
  const { allClasses } = useAllClass();
  const { token, user } = useAuth()
 
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

  const newAnalysis = (formData: IAnalysis) => {

    const { name, batch, category, class: clas, made } = formData;

    const formDataClass = allClasses.find((item) => item.name === clas)

    const classAnalyses = formDataClass?.analyses || [null]

    const newAnalysis = {
      name: name,
      made: made,
      batch: batch,
      category: category,
      class: clas,
      analyses: classAnalyses,
      isConcluded: false,
      userId: user.id,
    }

    api
      .post(
        "/analyses/",
        newAnalysis,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => console.log(response));
  };

  return (
    <AnalysesContext.Provider value={{ getAllAnalyses, analyses, newAnalysis }}>
      {children}
    </AnalysesContext.Provider>
  );
};
export const useAnalyses = () => useContext(AnalysesContext);