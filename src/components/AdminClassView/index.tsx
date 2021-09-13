import { useParams } from "react-router-dom";
import { useClass } from "../../providers/Class";
import { useEffect, useRef } from "react";

import { Flex, Box, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";

import { FiTrash2 } from "react-icons/fi";

const AdminClassView = () => {
  const { id } = useParams<{ id: string }>();
  const { currentClass, classAnalyses, fetchClass, resetClass, removeClassType } = useClass();

  const RefReset = useRef(resetClass);
  const RefFetch = useRef(fetchClass);

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
          {currentClass.name}
        </Heading>

        <Flex flexFlow={["column nowrap"]}>
          {!!classAnalyses.length &&
            classAnalyses.map((item) => (
              <div key={item.an_name}>
                <Flex
                  flexFlow={["column nowrap", "row nowrap", "row nowrap"]}
                  justifyContent='center'
                  alignItems='center'
                  mb='8'>
                  <Heading as='h4'>{item.an_name}</Heading>

                  <Button ml='4' onClick={() => removeClassType(id, item.an_name)}>
                    <FiTrash2 size={23} />
                  </Button>
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
                        Análise
                      </Box>

                      <Box
                        minW='92px'
                        textAlign='center'
                        fontWeight='bold'
                        m='0 10px'
                        borderBottom='2px solid'>
                        V.Mín.
                      </Box>

                      <Box
                        minW='92px'
                        textAlign='center'
                        fontWeight='bold'
                        m='0 10px'
                        borderBottom='2px solid'>
                        V.Máx.
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
                        minW='55px'
                        textAlign='center'
                        fontWeight='semibold'></Box>
                    </Flex>
                  )}

                  {item.parameters.map((item, index) => (
                    <Flex key={index} mb={["8", "8", "8"]} justifyContent='center'>
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
                          Análise
                        </Box>
                        <Box
                          minW='112px'
                          textAlign='left'
                          fontWeight='bold'
                          m='0 10px'
                          borderBottom='2px solid'>
                          V.Mín.
                        </Box>
                        <Box
                          minW='112px'
                          textAlign='left'
                          fontWeight='bold'
                          m='0 10px'
                          borderBottom='2px solid'>
                          V.Máx.
                        </Box>
                        <Box
                          minW='112px'
                          textAlign='left'
                          fontWeight='bold'
                          m='0 10px'
                          borderBottom='2px solid'>
                          Un.
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

                        <Button w='55px' m='0 0'>
                          <FiTrash2 size={23} />
                        </Button>
                      </Flex>
                    </Flex>
                  ))}
                </Flex>
              </div>
            ))}
        </Flex>
      </Flex>
    </div>
  );
};

export default AdminClassView;
