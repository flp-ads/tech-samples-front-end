import { createContext, ReactNode, useContext, useState } from "react";

import api from "../../services/api";

import { INewTypeForm } from "../../components/AdminClassNewType";
import { INewParamsForm } from "../../components/AdminClassNewParams";

import { toast } from "react-toastify";

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
  currentClass: IClass,
  classAnalyses: IClassAnalyses[],
  fetchClass: (id: string) => void,
  resetClass: () => void,
  removeClassType: (id: string, an_name: string) => void,
  addClassType: ( id: string, formData: INewTypeForm ) => void,
  addClassTypeParams: (id: string, formData: INewParamsForm) => void,
  removeClassTypeParams: ( id: string, array: IClassAnalysesParams[], name: string) => void, 
}

const ClassContext = createContext<ClassProviderData>({} as ClassProviderData);

export const ClassProvider = ({ children }: ClassProviderProps) => {
  const [currentClass, setCurrentClass] = useState<IClass>({} as IClass);

  const [classAnalyses, setClassAnalyses] = useState<IClassAnalyses[]>([]);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQHRlc3RlLmNvbSIsImlhdCI6MTYzMTU2NjU3NiwiZXhwIjoxNjMxNTcwMTc2LCJzdWIiOiIzIn0.6jNhg1ChytAn7RV_9Jf5BCFD_Q_o-vVwlYwD0suyAVo";

  const fetchClass = (id: string) => {
    api
      .get(`/classes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCurrentClass(response.data);
        setClassAnalyses(response.data.analyses);
      })
      .catch((err) => console.log(err));
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
      .then((_) => setClassAnalyses(newClassAnalyses))
      .catch((err) => {
        console.log(err);
      });
  };

  const addClassType = (id: string, formData: INewTypeForm) => {
    const alreadyListedTypes = classAnalyses.map((item) => item.an_name);
    const { an_name } = formData;

    const newClassType = {
      an_name: an_name,
      parameters: [],
    };

    const newClassAnalyses = [...classAnalyses, newClassType];

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
          setClassAnalyses(newClassAnalyses);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Tipo de análise já cadastrada!");
    }
  };

  const addClassTypeParams = (id: string, formData: INewParamsForm) => {
    const { an_name, name, vmin, vmax, unit } = formData;

    const listedParamsNames = ['']
    classAnalyses.forEach(( analysis ) => analysis.parameters.map( param => listedParamsNames.push(param.name)))

    const removingOldName = classAnalyses.filter(analysis => analysis.an_name !== an_name)
    
    const classToReplace = classAnalyses.find((item) => item.an_name === an_name)

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

    const newAnalyses = [...removingOldName, newAnalysis];

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
          console.log(removingOldName);
          console.log(newAnalyses);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const removeClassTypeParams = ( id: string, array: IClassAnalysesParams[], name: string ) => {

    // listar os arrays de parâmetros da classe 
    console.log(array)

    const parentAnalysis = classAnalyses.find((analysis) => JSON.stringify(analysis.parameters) === JSON.stringify(array))

    const parentAnalysisName = parentAnalysis?.an_name || ''

    console.log(parentAnalysis)

    const newArray = array.filter((param) => param.name !== name)

    const removingOldName = classAnalyses.filter(analysis => analysis.an_name !== parentAnalysisName)

    const newAnalysis = {
      an_name: parentAnalysisName,
      parameters: newArray,
    }

    const newAnalyses = [...removingOldName, newAnalysis]

    api
      .patch(`/classes/${id}`, 
      {
        analyses: newAnalyses,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((_) => {
        setClassAnalyses(newAnalyses)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <ClassContext.Provider
      value={{
        currentClass,
        classAnalyses,
        fetchClass,
        resetClass,
        addClassType,
        removeClassType,
        addClassTypeParams,
        removeClassTypeParams,
      }}>
      {children}
    </ClassContext.Provider>
  );
};

export const useClass = () => useContext(ClassContext);
