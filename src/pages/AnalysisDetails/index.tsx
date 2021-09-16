import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAnalysis } from "../../providers/Analysis";

import { Flex, Box, Text, Input, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import GlobalHeader from "../../components/GlobalHeader";

import AnalysisDetailsInput from "../../components/AnalysisDetailsInput";
import { IAnalysisClass } from "../../providers/Analyses";

interface IdParams {
  id: string;
}

interface AnalysisData {
  name: string;
  batch: string;
  analyses: [
    {
      an_name: string;
      parameters: [
        {
          name: string;
          vmin: string;
          vmax: string;
          unit: string;
          result: string;
          isAproved: boolean;
        }
      ];
    }
  ];
}

const AnalysisDetails = () => {
  const { id } = useParams<IdParams>();
  const { currentAnalysis, currAnalysisData, fetchAnalysis, resetAnalysis } =
    useAnalysis();

  const RefReset = useRef(resetAnalysis);
  const RefFetch = useRef(fetchAnalysis);

  const [currentResults, setCurrentResults] = useState<IAnalysisClass[]>([]);

  useEffect(() => {
    RefFetch.current(id);

    return RefReset.current;
  }, [id]);

  return (
    <>
      <GlobalHeader>
        <Link to="/analyst">Dashboard</Link>
        <Link to="/analyst/concluded">Amostras Finalizadas</Link>
        <Link to="/analyst/pending">Amostras Pendentes</Link>
        <Link to="/analyst/sample_register">Cadastrar Amostra</Link>
      </GlobalHeader>
      <Flex
        boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)"
        borderRadius="2xl"
        p="4"
        w="90vw"
        m="3vw"
        ml="5vw"
        align="center"
        justify="center"
        direction="column"
        bg="blue.600"
        color="white"
      >
        <Box>
          <Flex>
            <Text fontWeight="semibold" mr="2">
              Amostra:
            </Text>
            <Text>{currentAnalysis.name}</Text>
          </Flex>
          <Flex>
            <Text fontWeight="semibold" mr="2">
              Lote:
            </Text>
            <Text>{currentAnalysis.batch}</Text>
          </Flex>
        </Box>
      </Flex>
      <Flex
        boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)"
        borderRadius="2xl"
        p="4"
        w="90vw"
        m="5vw"
        mt="3vw"
        bg="blue.300"
        direction="column"
      >
        {currAnalysisData.map((item, index) => (
          <Flex
            key={index}
            w="100%"
            direction="column"
            align="center"
            color="white"
          >
            <Text
              align="center"
              fontSize="2xl"
              fontWeight="semibold"
              mt="4"
              mb="2"
            >
              Parâmetro {item.an_name}
            </Text>

            <Flex direction={["column", "row", "row"]} w="90%" mb="3">
              <Text
                flex="1"
                align="center"
                borderBottom="2px"
                fontWeight="semibold"
                m="2"
              >
                Análise
              </Text>
              <Text
                flex="1"
                align="center"
                borderBottom="2px"
                fontWeight="semibold"
                m="2"
              >
                V.Min.
              </Text>
              <Text
                flex="1"
                align="center"
                borderBottom="2px"
                fontWeight="semibold"
                m="2"
              >
                V.Max.
              </Text>
              <Text
                flex="1"
                align="center"
                borderBottom="2px"
                fontWeight="semibold"
                m="2"
              >
                Un.
              </Text>
              <Text
                flex="1"
                align="center"
                borderBottom="2px"
                fontWeight="semibold"
                m="2"
              >
                Resultado
              </Text>
            </Flex>
            <Flex arrRef={index} direction="column" color="white" w="90%">
              {item.parameters.map((param) => (
                <Flex direction={["column", "row", "row"]}>
                  <Text
                    flex="1"
                    align="center"
                    borderBottom="2px"
                    fontWeight="semibold"
                    m="2"
                  >
                    {param.name}
                  </Text>
                  <Text
                    flex="1"
                    align="center"
                    borderBottom="2px"
                    fontWeight="semibold"
                    m="2"
                  >
                    {param.vmin}
                  </Text>
                  <Text
                    flex="1"
                    align="center"
                    borderBottom="2px"
                    fontWeight="semibold"
                    m="2"
                  >
                    {param.vmax}
                  </Text>
                  <Text
                    flex="1"
                    align="center"
                    borderBottom="2px"
                    fontWeight="semibold"
                    m="2"
                  >
                    {param.unit}
                  </Text>
                  <Input
                    variant="flushed"
                    flex="1"
                    align="center"
                    borderBottom="2px"
                    fontWeight="semibold"
                    m="2"
                    textAlign="center"
                    // value={param.result}
                    onChange={(e) => {}}
                  />
                  {console.log(param)}
                </Flex>
              ))}
            </Flex>
          </Flex>
        ))}
        <Button
          w="180px"
          bg="blue.600"
          borderRadius="10px"
          mt="5"
          color="white"
        >
          Finalizar análise
        </Button>
      </Flex>
    </>
  );
};
export default AnalysisDetails;
