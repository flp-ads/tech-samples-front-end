import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAnalyses } from "../../providers/Analyses";
import { GlobalHeader } from "../../components/GlobalHeader";
import api from "../../services/api";
import { parseISO, format } from "date-fns";
import { Flex, Box, Text, Heading, Button } from "@chakra-ui/react";
import "../../styles/print.css";

interface AnalysisContent {
  name: string;
  batch: string;
  made: string;
  category: string;
  class: string;
  analyses: [
    {
      an_name: string;
      parameters: [
        {
          name: string;
          unit: string;
          vmin: string;
          vmax: string;
          result: string;
          isApproved: boolean;
        }
      ];
    }
  ];
  isConcluded: boolean;
  userId: number;
  id: number;
  userName: string;
}

const Certificate = () => {
  const [report, setReport] = useState<AnalysisContent[]>(
    [] as AnalysisContent[]
  );

  const { idNumber } = useAnalyses();
  const a_id = idNumber;

  useEffect(() => {
    api
      .get(`/analyses?id=${a_id}`)
      .then((res) => setReport(res.data))
      .catch((err) => console.log(`erro!: ${err}`));
  }, []);

  const formatedDate = (date: string) => {
    const newDate = format(parseISO(date), "dd/MM/yyyy");

    return newDate;
  };

  console.log(report);

  return (
    <>
      <div className="no-print">
        <GlobalHeader>
          <Link to="/search">Pesquisar análise</Link>
        </GlobalHeader>
      </div>
      {report.length > 0 ? (
        <>
          <Flex
            w="100%"
            h="100%"
            direction="column"
            align="center"
            bg="gray.500"
          >
            <Box w="90%" textAlign="right" m="4" className="no-print">
              <Button variant="default" onClick={() => window.print()}>
                Imprimir laudo
              </Button>
            </Box>
            <Flex
              w="794px"
              minH="1000px"
              bg="white"
              borderRadius="xl"
              textAlign="center"
              direction="column"
              align="center"
            >
              <Heading m="10" as="h1" fontSize="5xl">
                Nome da empresa
              </Heading>
              <Heading as="h2" fontSize="3xl">
                Dados da amostra
              </Heading>

              <Flex
                m="6"
                w="90%"
                boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)"
                borderRadius="xl"
                borderColor="blue.300"
                border="1px solid"
                direction="column"
                p="3"
              >
                <Flex direction="row">
                  <Flex w="60%" direction="row">
                    <Text as="span" fontWeight="bold" fontSize="xl">
                      Produto:
                      <Text ml="2" as="span" fontWeight="normal" fontSize="md">
                        {report[0].name}
                      </Text>
                    </Text>
                  </Flex>
                  <Flex w="40%">
                    <Text fontWeight="bold" fontSize="xl">
                      Laudo N°
                      <Text ml="2" as="span" fontWeight="normal" fontSize="md">
                        {report[0].id}
                      </Text>
                    </Text>
                  </Flex>
                </Flex>
                <Flex direction="row">
                  <Flex w="60%">
                    <Text fontWeight="bold" fontSize="xl">
                      Lote:
                      <Text ml="2" as="span" fontWeight="normal" fontSize="md">
                        {report[0].batch}
                      </Text>
                    </Text>
                  </Flex>
                  <Flex w="40%">
                    <Text fontWeight="bold" fontSize="xl">
                      Data de análise:
                      <Text ml="2" as="span" fontWeight="normal" fontSize="md">
                        {formatedDate(report[0].made)}
                      </Text>
                    </Text>
                  </Flex>
                </Flex>
              </Flex>

              {report[0].analyses.map((name, index) => (
                <Flex
                  direction="column"
                  w="100%"
                  align="center"
                  key={name.an_name}
                >
                  <Heading as="h2" fontSize="3xl" mt="4">
                    {name.an_name}
                  </Heading>
                  <Flex
                    m="6"
                    w="90%"
                    boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)"
                    borderRadius="xl"
                    borderColor="blue.300"
                    border="1px solid"
                    direction="column"
                    p="3"
                  >
                    {name.parameters.map((parameter, index) => (
                      <Flex direction="row" key={parameter.name}>
                        <Flex w="35%" direction="row">
                          <Text as="span" fontWeight="bold" fontSize="md">
                            Análise:
                            <Text
                              ml="2"
                              as="span"
                              fontWeight="normal"
                              fontSize="0.875rem"
                            >
                              {parameter.name}
                            </Text>
                          </Text>
                        </Flex>
                        <Flex w="25%">
                          <Text fontWeight="bold" fontSize="md">
                            Resultado:
                            <Text
                              ml="2"
                              as="span"
                              fontWeight="normal"
                              fontSize="0.875rem"
                            >
                              {parameter.result}
                            </Text>
                          </Text>
                        </Flex>
                        <Flex w="17%">
                          <Text fontWeight="bold" fontSize="md">
                            Un.:
                            <Text
                              ml="2"
                              as="span"
                              fontWeight="normal"
                              fontSize="0.875rem"
                            >
                              {parameter.unit}
                            </Text>
                          </Text>
                        </Flex>
                        <Flex w="23%">
                          <Text fontWeight="bold" fontSize="md">
                            Parecer:
                            <Text
                              ml="2"
                              as="span"
                              fontWeight="normal"
                              fontSize="0.875rem"
                            >
                              {parameter.isApproved === false
                                ? "Reprovado"
                                : "Aprovado"}
                            </Text>
                          </Text>
                        </Flex>
                      </Flex>
                    ))}
                  </Flex>
                </Flex>
              ))}
              <Flex
                textAlign="left"
                align="initial"
                direction="column"
                mt="12"
                w="90%"
              >
                <Text fontWeight="bold" fontSize="lg">
                  Referências / métodos utilizados
                </Text>
                <Flex>
                  <Text fontWeight="bold" fontSize="">
                    Físico-químicos:
                    <Text
                      ml="2"
                      as="span"
                      fontWeight="normal"
                      fontSize="0.875rem"
                    >
                      AOAC official methods of analysis
                    </Text>
                  </Text>
                </Flex>
                <Flex>
                  <Text fontWeight="bold" fontSize="md">
                    Microbiológicos:
                    <Text
                      ml="2"
                      as="span"
                      fontWeight="normal"
                      fontSize="0.875rem"
                    >
                      Compendium of Methods for the Microbiological Examination
                      of Foods
                    </Text>
                  </Text>
                </Flex>
              </Flex>
              <Flex
                mt="12"
                w="90%"
                boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)"
                borderRadius="xl"
                borderColor="blue.300"
                border="1px solid"
                direction="column"
                p="3"
              >
                <Flex>
                  <Text fontWeight="bold" fontSize="lg">
                    Responsável técnico:
                    <Text
                      ml="2"
                      as="span"
                      fontWeight="normal"
                      fontSize="0.875rem"
                    >
                      {report[0].userName}
                    </Text>
                  </Text>
                </Flex>
              </Flex>
              <Flex width="90%" mt="2">
                <Text fontSize="0.60rem" textAlign="left" pb="6">
                  <b>Legenda:</b> considerar unidade de medida como <b>Un.</b>,
                  Não aplicável como <b>NA</b>, para análises sensoriais
                  considerar
                  <b> 1</b> como melhor que o padrão,
                  <b> 2</b> igual ao padrão e <b> 3</b> diferente do padrão.
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </>
      ) : (
        <Flex>
          <Text>Aguarde</Text>
        </Flex>
      )}
    </>
  );
};

export default Certificate;
