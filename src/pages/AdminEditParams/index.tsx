import { Link } from "react-router-dom";
import { useState } from "react";

import { Flex, Heading } from "@chakra-ui/layout";

import GlobalHeader from "../../components/GlobalHeader";
import AdminClassView from "../../components/AdminClassView";
import AdminClassNewType from "../../components/AdminClassNewType";
import AdminClassNewParams from "../../components/AdminClassNewParams";

export const AdminEditParams = () => {

  const [isActiveView, setIsActiveView] = useState(true)
  const [isActiveNewType, setIsActiveNewType] = useState(false)
  const [isActiveNewParams, setIsActiveNewParams] = useState(false)

  const handleNavigationView = () => {
    setIsActiveView(true)
    setIsActiveNewType(false)
    setIsActiveNewParams(false)
  }
  
  const handleNavigationNewType = () => {
    setIsActiveView(false)
    setIsActiveNewType(true)
    setIsActiveNewParams(false)
  }

  const handleNavigationNewParams = () => {
    setIsActiveView(false)
    setIsActiveNewType(false)
    setIsActiveNewParams(true)
  }

  return (
    <div>
      <GlobalHeader>
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/classes">Cadastrar Classe</Link>
        <Link to="/admin/users">Todos Usuários</Link>
        <Link to="/admin/user_register">Cadastrar Usuário</Link>
      </GlobalHeader>

      <Flex
        boxShadow='0px 0px 20px rgba(0, 0, 0, 0.1)'
        borderRadius='3xl'
        p='4'
        w='90vw'
        m='0 auto'
        mt='8'
        flexFlow='column nowrap'
        justifyContent='center'
        alignItems='center'>
        
        <Flex
          flexFlow={['column nowrap', 'column nowrap', 'row nowrap']}
          justifyContent='space-between'
          p='0 8'
          mb='8'
          mt='4'
          textAlign='center'>
            
            { isActiveView ? (
              <Heading fontSize='24px' fontWeight='semibold' m='0 8px' mb={['8px', '12px', '0']}>
                Visualizar
              </Heading>
            ) : (
              <Heading fontSize='24px' fontWeight='regular' m='0 8px' onClick={handleNavigationView} cursor='pointer' mb={['8px', '12px', '0']}>
                Visualizar
              </Heading>
            )}

            { isActiveNewType ? (
              <Heading fontSize='24px' fontWeight='semibold' m='0 8px' mb={['8px', '12px', '0']}>
                Adicionar Tipo
              </Heading>
            ) : (
              <Heading fontSize='24px' fontWeight='regular' m='0 8px' onClick={handleNavigationNewType} cursor='pointer' mb={['8px', '12px', '0']}>
                Adicionar Tipo
              </Heading>
            )}

            { isActiveNewParams ? (
              <Heading fontSize='24px' fontWeight='semibold' m='0 8px' mb={['8px', '12px', '0']}>
                Adicionar Parâmetro
              </Heading>
            ) : (
              <Heading fontSize='24px' fontWeight='regular' m='0 8px' onClick={handleNavigationNewParams} cursor='pointer' mb={['8px', '12px', '0']}>
                Adicionar Parâmetro
              </Heading>
            )}
        </Flex>

        {isActiveView && <AdminClassView />}
        {isActiveNewType && <AdminClassNewType />}
        {isActiveNewParams && <AdminClassNewParams />}

      </Flex>
    </div>
  );
};

export default AdminEditParams;
