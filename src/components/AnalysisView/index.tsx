import { useParams, useHistory } from "react-router-dom";
import { useAnalysis } from "../../providers/Analysis";
import { useAuth } from "../../providers/Auth";

import { useEffect, useRef, useState } from "react";

import { Flex, Box, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";


const AnalysisView = () => {

  const { id } = useParams<{ id: string }>();
  const { user } = useAuth()
  const history = useHistory()

  const { fetchAnalysis, resetAnalysis, handleFinished, currentAnalysis, currAnalysisData} = useAnalysis()

  const RefReset = useRef(resetAnalysis);
  const RefFetch = useRef(fetchAnalysis);

  const numPedingAnalysis = currAnalysisData.map((item) => item.parameters.map((item) => item.result)).flat().filter(el => el !== '').length

  const numAllAnalysis = currAnalysisData.map((item) => item.parameters.map((item) => item.result)).flat().length 

  useEffect(() => {
    RefFetch.current(id);

    return RefReset.current;
  }, [id]);

  return (
    <div>
      <Flex
        p='4'
        w='90vw'
        m='0 auto'
        flexFlow='column nowrap'
        justifyContent='center'
        alignItems='center'>
        <Heading as='h5' mb='8' textAlign='center'>
          {currentAnalysis.name}
        </Heading>

        <Flex flexFlow={["column nowrap"]}>
          {!!currAnalysisData.length &&
            currAnalysisData.map((item) => (
              <div key={item.an_name}>
                <Flex
                  flexFlow={["column nowrap", "row nowrap", "row nowrap"]}
                  justifyContent='center'
                  alignItems='center'
                  mb='8'>
                  <Heading as='h4'>{item.an_name}</Heading>
                </Flex>

                <Flex
                  flexFlow='column nowrap'
                  justifyContent='center'
                  alignItems='center'>
                  {!!item.parameters.length && (
                    <Flex
                      display={["none", "none", "flex"]}
                      flexFlow='row nowrap'
                      justifyContent='space-between'
                      minW='600px'
                      mb='4'>
                      <Box
                        minW='132px'
                        textAlign='center'
                        fontWeight='bold'
                        m='0 10px'
                        borderBottom='2px solid'>
                        An??lise
                      </Box>

                      <Box
                        minW='92px'
                        textAlign='center'
                        fontWeight='bold'
                        m='0 10px'
                        borderBottom='2px solid'>
                        V.M??n.
                      </Box>

                      <Box
                        minW='92px'
                        textAlign='center'
                        fontWeight='bold'
                        m='0 10px'
                        borderBottom='2px solid'>
                        V.M??x.
                      </Box>

                      <Box
                        minW='92px'
                        textAlign='center'
                        fontWeight='bold'
                        m='0 10px'
                        borderBottom='2px solid'>
                        Un.
                      </Box>

                      <Box
                        minW='92px'
                        textAlign='center'
                        fontWeight='bold'
                        m='0 10px'
                        borderBottom='2px solid'>
                        Resultado
                      </Box>

                    </Flex>
                  )}

                  {item.parameters.map((item, index, array) => (
                    <Flex
                      key={index}
                      mb={["8", "8", "8"]}
                      justifyContent='center'>
                      <Flex
                        display={["flex", "flex", "none"]}
                        flexFlow='column nowrap'
                        mr='4'>
                        <Box
                          minW='112px'
                          textAlign='left'
                          fontWeight='bold'
                          m='0 10px'
                          borderBottom='2px solid'>
                          An??lise
                        </Box>
                        <Box
                          minW='112px'
                          textAlign='left'
                          fontWeight='bold'
                          m='0 10px'
                          borderBottom='2px solid'>
                          V.M??n.
                        </Box>
                        <Box
                          minW='112px'
                          textAlign='left'
                          fontWeight='bold'
                          m='0 10px'
                          borderBottom='2px solid'>
                          V.M??x.
                        </Box>
                        <Box
                          minW='112px'
                          textAlign='left'
                          fontWeight='bold'
                          m='0 10px'
                          borderBottom='2px solid'>
                          Un.
                        </Box>
                        <Box
                          minW='112px'
                          textAlign='left'
                          fontWeight='bold'
                          m='0 10px'
                          borderBottom='2px solid'>
                          Resultado
                        </Box>
                      </Flex>

                      <Flex
                        flexFlow={[
                          "column nowrap",
                          "column nowrap",
                          "row nowrap",
                        ]}
                        justifyContent='space-between'
                        alignItems='center'
                        minW={["auto", "auto", "600px"]}
                        textAlign={["center", "center", "inherit"]}>
                        <Box
                          minW={["92px", "92px", "132px"]}
                          textAlign='center'
                          m='0 10px'
                          borderBottom='2px solid'
                          color='blue.300'>
                          {item.name}
                        </Box>
                        <Box
                          minW='92px'
                          textAlign='center'
                          m='0 10px'
                          borderBottom='2px solid'
                          color='blue.300'>
                          {item.vmin}
                        </Box>
                        <Box
                          minW='92px'
                          textAlign='center'
                          m='0 10px'
                          borderBottom='2px solid'
                          color='blue.300'>
                          {item.vmax}
                        </Box>
                        <Box
                          minW='92px'
                          textAlign='center'
                          m='0 10px'
                          borderBottom='2px solid'
                          color='blue.300'>
                          {item.unit}
                        </Box>
                        <Box
                          minW='92px'
                          minH='26px'
                          textAlign='center'
                          m='0 10px'
                          borderBottom='2px solid'
                          color='blue.300'>
                          {item.result}
                        </Box>

                      </Flex>
                    </Flex>
                  ))}
                </Flex>
              </div>
            ))}
        </Flex>
        

        {numPedingAnalysis === numAllAnalysis ? 
        (<Button
            variant='default'
            onClick={
                () => {
                    handleFinished(id, user.username)
                    history.push('/analyst/pending')}}
          >
            Finalizar An??lise
        </Button>) :
        (<Button
            variant='disabled'
            disabled>
                Finalizar An??lise
        </Button>)}

      </Flex>
    </div>
  );
};

export default AnalysisView;
