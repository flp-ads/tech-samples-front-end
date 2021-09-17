import { Button, Input, Flex, Select } from "@chakra-ui/react"
import { useAnalysis } from "../../providers/Analysis";

import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


export interface IResultsForm {
    name: string,
    result: string,
}

const AnalysisResults = () => {

    const { id } = useParams<{ id: string }>();
  
    const { fetchAnalysis, resetAnalysis, currentAnalysis, currAnalysisData, handleResult} = useAnalysis()

    const [selectedType, setSelectedType] = useState('')

    const RefReset = useRef(resetAnalysis);
    const RefFetch = useRef(fetchAnalysis);

    useEffect(() => {
        RefFetch.current(id);

        return RefReset.current
    }, [id]);

    const formSchema = yup.object().shape({
        name: yup
            .string()
            .required('Campo obrigatório'),
        result: yup
            .string()
            .required('Campo obrigatório'),
    });

    const { register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(formSchema)
    })

    const onFormSubmit = ( formData: IResultsForm ) => {    

        handleResult(formData, selectedType, id)
    }

    return (
        <Flex
        flexFlow='column nowrap'
        justifyContent='center'
        alignItems='center'>

        <form
            onSubmit={handleSubmit(onFormSubmit)}>
            <Flex
                mb='8'
                flexFlow='column nowrap'
                justifyContent='center'
                alignItems='center'>
                

                <Select
                    variant="flushed"
                    marginBottom="1px solid"
                    borderColor="blue.600"
                    placeholder='Tipo de análise'
                    onChange={e => setSelectedType(e.target.value)}>
                    
                    {!!currAnalysisData.length && currAnalysisData.map(item => 
                        <option key={item.an_name} value={item.an_name}>{item.an_name}</option>)}

                </Select>

                <Select
                    variant="flushed"
                    marginBottom="1px solid"
                    borderColor="blue.600"
                    placeholder='Nome da análise'
                    {...register('name')}
                    error={errors.name?.message}>
                    
                    {!!currAnalysisData.length && currAnalysisData
                    .filter((item) => item.an_name === selectedType)
                    .map(item => item.parameters.map((item) => 
                    <option key={item.name} value={item.name}>{item.name}</option>)
                    )}

                </Select>
                        
                
                <Input
                    variant="flushed"
                    marginBottom="1px solid"
                    borderColor="blue.600"
                    placeholder='Valor máximo'
                    {...register('result')}
                    error={errors.result?.message}/>

                <Button
                    type='submit'
                    variant='default'
                    mt='8'>
                    Cadastrar
                </Button>
            </Flex>
        </form>

    </Flex>
    )
}

export default AnalysisResults
