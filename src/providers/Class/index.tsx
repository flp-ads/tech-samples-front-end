import { createContext, ReactNode, useContext, useState } from "react";

import api from "../../services/api";

import { INewTypeForm } from "../../components/AdminClassNewType";
import { INewParamsForm } from "../../components/AdminClassNewParams";

import { useAuth } from "../Auth";
import { UseFeedback } from "../UserFeedback";

interface IClassDefaultVals {
  name: "";
  category: "";
  analyses: [];
  userId: -1;
  id: -1;
}

interface IClassAnalysesParams {
  name: string;
  unit: string;
  vmin: string;
  vmax: string;
}

interface IClassAnalyses {
  an_name: string;
  parameters: IClassAnalysesParams[];
}

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
  currentClass: IClass;
  classAnalyses: IClassAnalyses[];
  updateTrigger: boolean;
  fetchClass: (id: string) => void;
  resetClass: () => void;
  removeClassType: (id: string, an_name: string) => void;
  addClassType: (id: string, formData: INewTypeForm) => void;
  addClassTypeParams: (id: string, formData: INewParamsForm) => void;
  removeClassTypeParams: (
    id: string,
    array: IClassAnalysesParams[],
    name: string
  ) => void;
}

const ClassContext = createContext<ClassProviderData>({} as ClassProviderData);

export const ClassProvider = ({ children }: ClassProviderProps) => {
  const [currentClass, setCurrentClass] = useState<IClass>({} as IClass);

  const [classAnalyses, setClassAnalyses] = useState<IClassAnalyses[]>([]);

  const [updateTrigger, setUpdateTrigger] = useState<boolean>(false);

  const { token } = useAuth();

  const { errorFeedback, sucessFeedback } = UseFeedback();

  const fetchClass = (id: string) => {
    api
      .get(`/classes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const sortedAnalyses = response.data.analyses.sort(
          (a: IClassAnalyses, b: IClassAnalyses) => {
            let nameA = a.an_name.toUpperCase();
            let nameB = b.an_name.toUpperCase();
            return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
          }
        );

        setCurrentClass(response.data);
        setClassAnalyses(sortedAnalyses);
      })
      .catch(() => errorFeedback("Erro ao carregar classe!"));
  };

  const resetClass = () => {
    setCurrentClass({} as IClassDefaultVals);
  };

  const removeClassType = (id: string, an_nameToRemove: string) => {
    const newClassAnalyses = classAnalyses.filter(
      (item) => item.an_name !== an_nameToRemove
    );

    api
      .patch(
        `/classes/${id}`,
        {
          analyses: newClassAnalyses,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((_) => {
        setUpdateTrigger(!updateTrigger);
        sucessFeedback("Classe Removida");
      })
      .catch(() => {
        errorFeedback("Erro ao remover classe!");
      });
  };

  const addClassType = (id: string, formData: INewTypeForm) => {
    const alreadyListedTypes = classAnalyses.map((item) => item.an_name);
    const { an_name } = formData;

    const newClassType = {
      an_name: an_name,
      parameters: [],
    };

    const newClassAnalyses = [...classAnalyses, newClassType].sort();

    if (!alreadyListedTypes.includes(an_name)) {
      api
        .patch(
          `/classes/${id}`,
          {
            analyses: newClassAnalyses,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((_) => {
          console.log(newClassAnalyses);
          setUpdateTrigger(!updateTrigger);
          sucessFeedback("Classe Adicionada");
        })
        .catch((err) => {
          errorFeedback("Erro ao adicionar classe!");
        });
    } else {
      errorFeedback("Tipo de análise já cadastrada!");
    }
  };

  const addClassTypeParams = (id: string, formData: INewParamsForm) => {
    const { an_name, name, vmin, vmax, unit } = formData;

    const listedParamsNames = [""];
    classAnalyses.forEach((analysis) =>
      analysis.parameters.map((param) => listedParamsNames.push(param.name))
    );

    const removingOldName = classAnalyses.filter(
      (analysis) => analysis.an_name !== an_name
    );

    const classToReplace = classAnalyses.find(
      (analysis) => analysis.an_name === an_name
    );

    const oldParams = classToReplace?.parameters || [null];

    const newParams = {
      name: name,
      unit: unit,
      vmin: vmin,
      vmax: vmax,
    };

    const newAnalysis = {
      an_name: an_name,
      parameters: [...oldParams, newParams],
    };

    const newAnalyses = [...removingOldName, newAnalysis].sort();

    if (!listedParamsNames.includes(name)) {
      api
        .patch(
          `/classes/${id}`,
          {
            analyses: newAnalyses,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((_) => {
          sucessFeedback("Parâmetro cadrastado com sucesso!");
          setUpdateTrigger(!updateTrigger);
        })
        .catch((err) => {
          errorFeedback("Erro ao cadastrar parâmetro!");
        });
    } else {
      errorFeedback("Parâmetro já cadastrado!");
    }
  };

  const removeClassTypeParams = (
    id: string,
    array: IClassAnalysesParams[],
    name: string
  ) => {
    const parentAnalysis = classAnalyses.find(
      (analysis) =>
        JSON.stringify(analysis.parameters) === JSON.stringify(array)
    );

    const parentAnalysisName = parentAnalysis?.an_name || "";

    const newArray = array.filter((param) => param.name !== name);

    const removingOld = classAnalyses.filter(
      (analysis) => analysis.an_name !== parentAnalysisName
    );

    const newAnalysis = {
      an_name: parentAnalysisName,
      parameters: newArray,
    };

    const newAnalyses = [...removingOld, newAnalysis].sort();

    api
      .patch(
        `/classes/${id}`,
        {
          analyses: newAnalyses,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((_) => {
        setUpdateTrigger(!updateTrigger);
        sucessFeedback("Parâmetro Removido");
      })
      .catch((err) => {
        errorFeedback("Erro ao remover parâmetro!");
      });
  };

  return (
    <ClassContext.Provider
      value={{
        currentClass,
        classAnalyses,
        updateTrigger,
        fetchClass,
        resetClass,
        addClassType,
        removeClassType,
        addClassTypeParams,
        removeClassTypeParams,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};

export const useClass = () => useContext(ClassContext);
