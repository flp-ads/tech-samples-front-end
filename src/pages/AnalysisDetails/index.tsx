import { Flex, Box, Text, Heading } from "@chakra-ui/react";
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useParams } from "react-router-dom";
import GlobalHeader from "../../components/GlobalHeader";
import AnalisysView from '../../components/AnalysisView';
import AnalysisResults from '../../components/AnalysisResults';

interface Params {
  id: string;
}

const AnalysisDetails = () => {

  const [isActiveView, setIsActiveView] = useState(true)
  const [isActiveAnalysis, setIsActiveAnalisys] = useState(false)


  const handleNavView = () => {
    setIsActiveView(true)
    setIsActiveAnalisys(false)
  }
  
  const handleNavAnalysis = () => {
    setIsActiveView(false)
    setIsActiveAnalisys(true)
  }


  return (
    <>
      <GlobalHeader>
        <Link to="/analyst">Dashboard</Link>
        <Link to="/analyst/concluded">Amostras Finalizadas</Link>
        <Link to="/analyst/pending">Amostras Pendentes</Link>
        <Link to="/analyst/sample_register">Cadastrar Amostra</Link>
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
              <Heading fontSize='24px' fontWeight='regular' m='0 8px' onClick={handleNavView} cursor='pointer' mb={['8px', '12px', '0']}>
                Visualizar
              </Heading>
            )}

            { isActiveAnalysis ? (
              <Heading fontSize='24px' fontWeight='semibold' m='0 8px' mb={['8px', '12px', '0']}>
                Análise
              </Heading>
            ) : (
              <Heading fontSize='24px' fontWeight='regular' m='0 8px' onClick={handleNavAnalysis} cursor='pointer' mb={['8px', '12px', '0']}>
                Análise
              </Heading>
            )}

        </Flex>

        {isActiveView && <AnalisysView />}
        {isActiveAnalysis && <AnalysisResults />}

      </Flex>
    </>
  );
};
export default AnalysisDetails;
