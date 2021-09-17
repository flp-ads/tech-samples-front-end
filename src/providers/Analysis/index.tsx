import { createContext, ReactNode, useContext, useState } from "react";

import { IAnalysis, IAnalysisClass  } from "../Analyses";

import { useAuth } from "../Auth";

import api from "../../services/api";

import { IResultsForm } from '../../components/AnalysisResults'

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
    handleResult: (formData: IResultsForm , selectedType: string, id: string) => void,
    handleFinished: (id: string, username: string) => void,
}

const AnalysisContext = createContext<AnalysisProviderData>({} as AnalysisProviderData);

export const AnalysisProvider = ({children} : AnalysisProviderProps) => {

    const { token } = useAuth()

    const [currentAnalysis, setCurrentAnalysis] = useState<IAnalysis>({} as IAnalysisDefaultVals)

    const [currAnalysisData, setCurrentAnalysisData] = useState<IAnalysisClass[]>([])

    const [updateTrigger, setUpdateTrigger] = useState<boolean>(false)

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

        })
        .catch((err) => console.log(err));
    }

    const resetAnalysis = () => {
        setCurrentAnalysis({} as IAnalysisDefaultVals)
    }


    const handleResult = (formData: IResultsForm , selectedType: string, id: string) => {

        const { name, result } = formData;

        const analysisToUpdate = currAnalysisData.find(analysis => analysis.an_name === selectedType)

        const paramsToUpdate = analysisToUpdate?.parameters.find((item) => item.name === name)

        const removingOldName = currAnalysisData.filter(analysis => analysis.an_name !== selectedType)

        const oldParams = analysisToUpdate?.parameters.filter((item) => item.name !== name) || [null]

        const approval = 
        Number(paramsToUpdate?.vmin) <= Number(result) &&
        Number(result) <= Number(paramsToUpdate?.vmax) ? true : false  

        const newAnalysisResult = {
            name: paramsToUpdate?.name,
            unit: paramsToUpdate?.unit,
            vmin: paramsToUpdate?.vmin,
            vmax: paramsToUpdate?.vmax,
            result: result,
            isApproved: approval,
        }

        const newAnalysis = {
            an_name: selectedType,
            parameters: [...oldParams, newAnalysisResult],
        };

        const newAnalyses = [...removingOldName, newAnalysis]

        api
            .patch(
                `/analyses/${id}`,
                {
                    analyses: newAnalyses,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            .then((_) => {
                setUpdateTrigger(!updateTrigger)
            })
            .catch((err) => {
                console.log(err)
            });
    }

    const handleFinished = (id: string, userName: string) => {
        
        api
        .patch(
            `/analyses/${id}`,
            {
                isConcluded: true,
                userName: userName,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
        .then((_) => {
            setUpdateTrigger(!updateTrigger)
        })
        .catch((err) => {
            console.log(err)
        });
    }



    return (
        <AnalysisContext.Provider
            value={{
                currentAnalysis,
                currAnalysisData,
                fetchAnalysis,
                resetAnalysis,
                handleResult,
                handleFinished,
            }}>
                { children }
        </AnalysisContext.Provider>
    )

}

export const useAnalysis = () => useContext(AnalysisContext);
