import { useState, useEffect } from "react";
import { Flex, Box, Text, Heading, Button } from "@chakra-ui/react";
import CardAnalysis from "../../components/Cards/CardAnalysis";
import { Link, useHistory } from "react-router-dom";
import NavBar from "../../components/GlobalHeader";
import api from "../../services/api";
import { useAuth } from "../../providers/Auth";

interface AnalysesData {
  name: string;
  category: string;
  batch: string;
  isConcluded: boolean;
}

const AnalistDashboard = () => {
  const { user } = useAuth();

  const [analyses, setAnalyses] = useState<AnalysesData[]>([]);
  const MAX_CARDS = 2;
  const history = useHistory();

  const getAnalysis = () => {
    api
      .get(`/analyses?userID=${user.id}`)
      .then((res) => setAnalyses(res.data))
      .catch((err) => console.log(`erro!: ${err}`));
  };

  const isFinished = analyses.filter(
    (analysis) => analysis.isConcluded === true
  );
  const isNotFinished = analyses.filter(
    (analysis) => analysis.isConcluded === false
  );

  useEffect(() => {
    getAnalysis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box textAlign="center" fontSize="xs">
        <NavBar>
          <Link to="/analyst">Dashboard</Link>
          <Link to="/analyst/concluded">Amostras Finalizadas</Link>
          <Link to="/analyst/pending">Amostras Pendentes</Link>
          <Link to="/analyst/sample_register">Cadastrar Amostra</Link>
        </NavBar>
      </Box>

      <Flex direction="column">
        <Heading
          as="h1"
          textAlign={["center", "center", "left"]}
          fontWeight="normal"
          mt={["8", "6", "4"]}
          ml={["0", "0", "16"]}
        >
          Bem vindo, <b>{user.username}</b>
        </Heading>
      </Flex>
      <Flex direction="column" align="center">
        <Flex
          w="90vw"
          p={4}
          boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)"
          borderRadius="3xl"
          m="4"
          textAlign="center"
          direction="column"
        >
          <Flex justify="center">
            <Heading as="h3" fontWeight="normal" mb="3">
              Visão global
            </Heading>
          </Flex>
          <Flex
            direction={["column", "column", "row"]}
            justify={["center", "center", "space-around"]}
          >
            <Text fontSize="2xl" color="blue.300" mt="3">
              Você possui <br />
              <Text fontWeight="semibold" color="blue.600">
                {analyses.length} amostras cadastradas
              </Text>
            </Text>
            <Text fontSize="2xl" color="blue.300" mt="3">
              Você possui <br />
              <Text fontWeight="semibold" color="blue.600">
                {isNotFinished.length} amostras pendentes
              </Text>
            </Text>
            <Text fontSize="2xl" color="blue.300" mt="3">
              Você possui <br />
              <Text fontWeight="semibold" color="blue.600">
                {isFinished.length} amostras finalizadas
              </Text>
            </Text>
          </Flex>
        </Flex>
        <Flex direction={["column", "column", "row"]}>
          <Box
            w={["90vw", "90vw", "44vw"]}
            p={4}
            boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)"
            borderRadius="3xl"
            textAlign="center"
            m={["4", "4", "3"]}
          >
            <Heading as="h4" mb="3" fontSize="3xl">
              Amostras pendentes
            </Heading>
            {isNotFinished.slice(0, MAX_CARDS).map((analysis) => (
              <CardAnalysis
                batch={analysis.batch}
                category={analysis.category}
                concluded={analysis.isConcluded}
                name={analysis.name}
                key={user.id}
              />
            ))}
            <Box textAlign="right" m="4">
              <Button
                variant="link"
                color="blue.600"
                _hover={{ color: "blue.300" }}
                onClick={() => history.push("analyst/pending")}
              >
                ver todos
              </Button>
            </Box>
          </Box>
          <Box
            w={["90vw", "90vw", "44vw"]}
            p={4}
            boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)"
            borderRadius="3xl"
            textAlign="center"
            m={["4", "4", "3"]}
          >
            <Heading as="h4" mb="3" fontSize="3xl">
              Amostras finalizadas
            </Heading>
            {isFinished.slice(0, MAX_CARDS).map((analysis) => (
              <CardAnalysis
                batch={analysis.batch}
                category={analysis.category}
                concluded={analysis.isConcluded}
                name={analysis.name}
                key={user.id}
              />
            ))}
            <Box textAlign="right" m="4">
              <Button
                variant="link"
                color="blue.600"
                _hover={{ color: "blue.300" }}
                onClick={() => history.push("analyst/concluded")}
              >
                ver todos
              </Button>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default AnalistDashboard;
