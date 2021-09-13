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
  currentClass: IClass;
  classAnalyses: IClassAnalyses[];
  allClasses: IClass[];
  getAllClasses: () => void;
  fetchClass: (id: string) => void;
  resetClass: () => void;
  removeClassType: (id: string, an_name: string) => void;
  addClassType: (id: string, formData: INewTypeForm) => void;
  addClassTypeParams: (id: string, formData: INewParamsForm) => void;
}

const ClassContext = createContext<ClassProviderData>({} as ClassProviderData);

export const ClassProvider = ({ children }: ClassProviderProps) => {
  const [currentClass, setCurrentClass] = useState<IClass>({} as IClass);
  const [allClasses, setAllClasses] = useState<IClass[]>([] as IClass[]);

  const [classAnalyses, setClassAnalyses] = useState<IClassAnalyses[]>([]);

  const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQHRlc3RlLmNvbSIsImlhdCI6MTYzMTU2Mzk0MiwiZXhwIjoxNjMxNTY3NTQyLCJzdWIiOiIzIn0.s-Z-TwjDQbOXarIrwsyI3c0da2SGon9ocIUTrZ4Pwx8";

  const getAllClasses = () => {
    api
      .get("/classes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setAllClasses(response.data));
  };

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

    const listedParamsNames = [""];
    classAnalyses.forEach((item) =>
      item.parameters.map((item) => listedParamsNames.push(item.name))
    );

    const removingOldName = classAnalyses.filter(
      (item) => item.an_name !== an_name
    );

    const classToReplace = classAnalyses.find(
      (item) => item.an_name === an_name
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
  };

  const removeClassTypeParam = (
    id: string,
    an_name: string,
    name: string
  ) => {};

  return (
    <ClassContext.Provider
      value={{
        currentClass,
        classAnalyses,
        allClasses,
        getAllClasses,
        fetchClass,
        resetClass,
        removeClassType,
        addClassType,
        addClassTypeParams,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};

export const useClass = () => useContext(ClassContext);
