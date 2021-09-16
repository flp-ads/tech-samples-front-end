import { createContext, ReactNode, useContext, useState } from "react";
import {
  Dispatch,
  SetStateAction,
} from "toasted-notes/node_modules/@types/react";

import api from "../../services/api";

import { useAllClass } from "../AllClass";
import { useAuth } from "../Auth";
import { UseFeedback } from "../UserFeedback";

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
  id: number;
}

interface AnalysesProviderData {
  analyses: IAnalysis[];
  getAllAnalyses: () => void;
  newAnalysis: (analysisData: IAnalysis) => void;
  idNumber: number;
  setIdNumber: Dispatch<SetStateAction<number>>;
}

const AnalysesContext = createContext<AnalysesProviderData>(
  {} as AnalysesProviderData
);

export const AnalysisProvider = ({ children }: AnalysesProviderProps) => {
  const [idNumber, setIdNumber] = useState<number>(0);

  const [analyses, setAnalyses] = useState<IAnalysis[]>([] as IAnalysis[]);

  const { allClasses } = useAllClass();
  const { token, user } = useAuth();
  const { errorFeedback, sucessFeedback } = UseFeedback();

  const getAllAnalyses = () => {
    api
      .get("/analyses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAnalyses(response.data);
        sucessFeedback("Análises Carregadas");
      })
      .catch(() => errorFeedback("Erro ao carregar análises!"));
  };

  const newAnalysis = (formData: IAnalysis) => {
    const { name, batch, category, class: clas, made } = formData;

    const formDataClass = allClasses.find((item) => item.name === clas);

    const classAnalyses = formDataClass?.analyses || [null];

    const newAnalysis = {
      name: name,
      made: made,
      batch: batch,
      category: category,
      class: clas,
      analyses: classAnalyses,
      isConcluded: false,
      userId: user.id,
    };

    api
      .post("/analyses/", newAnalysis, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => sucessFeedback("Análise Adicionada"))
      .catch(() => errorFeedback("Erro ao adicionar análise!"));
  };

  return (
    <AnalysesContext.Provider
      value={{ getAllAnalyses, analyses, newAnalysis, idNumber, setIdNumber }}
    >
      {children}
    </AnalysesContext.Provider>
  );
};
export const useAnalyses = () => useContext(AnalysesContext);
