import { createContext, ReactNode, useContext, useState } from "react";

import { IAnalysis, IAnalysisClass, IAnalysisClassParams } from "../Analyses";

import { useAuth } from "../Auth";

import api from "../../services/api";


interface IAnalysisDefaultVals {
    name: '';
    batch: '';
    made: '';
    category: '';
    class: '';
    analyses: [];
    isConcluded: false;
    userId: -1;
    id: -1,
}


interface AnalysisProviderProps {
    children: ReactNode;
}

interface AnalysisProviderData {
    currentAnalysis: IAnalysis,
    currAnalysisData: IAnalysisClass[],
    fetchAnalysis: (id: string) => void,
    resetAnalysis: () => void,
}

const AnalysisContext = createContext<AnalysisProviderData>({} as AnalysisProviderData);

export const AnalysisProvider = ({children} : AnalysisProviderProps) => {

    const { token } = useAuth()

    const [currentAnalysis, setCurrentAnalysis] = useState<IAnalysis>({} as IAnalysisDefaultVals)

    const [currAnalysisData, setCurrentAnalysisData] = useState<IAnalysisClass[]>([])

    const fetchAnalysis = (id: string) => {

        api
        .get(`/analyses/${id}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {

            setCurrentAnalysis(response.data)
            setCurrentAnalysisData(response.data.analyses)
            console.log(response.data)

            // const classAnalysesNewParams = classAnalyses.map((item) => (item.parameters.map((item) => console.log(item))))

            //{..., result: '', isApproved: false}

        })
        .catch((err) => console.log(err));
    }

    const resetAnalysis = () => {
        setCurrentAnalysis({} as IAnalysisDefaultVals)
    }


    return (
        <AnalysisContext.Provider
            value={{
                currentAnalysis,
                currAnalysisData,
                fetchAnalysis,
                resetAnalysis,
            }}>
                { children }
        </AnalysisContext.Provider>
    )

}

export const useAnalysis = () => useContext(AnalysisContext);