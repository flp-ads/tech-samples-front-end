import { Button, Input, Flex, Heading, Text } from "@chakra-ui/react"
import { useClass } from "../../providers/Class"
import { useParams } from "react-router-dom";
import { useEffect, useRef } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export interface INewTypeForm {
    an_name: string,
}

const AdminClassNewType = () => {

    const { id } = useParams<{ id: string }>();
    const { classAnalyses, fetchClass, resetClass, addClassType } = useClass();

    const RefReset = useRef(resetClass);
    const RefFetch = useRef(fetchClass);


    useEffect(() => {
        RefFetch.current(id);
    
        return RefReset.current;
    }, [id, classAnalyses]);

    const formSchema = yup.object().shape({
        an_name: yup
            .string()
            .required('Campo obrigatório'),
    });
    
    const { register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(formSchema)
    })

    const onFormSubmit = ( formData: INewTypeForm ) => {

        addClassType( id, formData )
    }

    return (
        <Flex
            flexFlow='column nowrap'
            justifyContent='center'
            alignItems='center'>
            
            <form
                onSubmit={handleSubmit(onFormSubmit)}>
                <Flex
                    mb='8'>

                    <Input
                        variant="flushed"
                        marginBottom="1px solid"
                        borderColor="blue.600"
                        placeholder='Novo tipo'
                        {...register('an_name')}
                        error={errors.an_name?.message}/>
                    <Button
                        type='submit'
                        variant='default'>
                        Cadastrar
                    </Button>
                </Flex>
            </form>

            <Flex
                flexFlow='column nowrap'
                justifyContent='center'
                alignItems='center'>

                <Heading
                    mb='8'
                    textAlign='center'>
                    Tipos de Análise Cadastradas
                </Heading>
                
                {!!classAnalyses.length && classAnalyses.map(item => 
                    <Text 
                        key={item.an_name}
                        fontSize='24px'>
                        {item.an_name}
                    </Text>)}
            </Flex>


        </Flex>
    )
}

export default AdminClassNewType
