import { useState, useEffect } from "react";
import { Flex, Box, Text, Heading, Button } from "@chakra-ui/react";
import CardAnalysis from "../../components/Cards/CardAnalysis";
import { Link, useHistory } from "react-router-dom";
import NavBar from "../../components/GlobalHeader";
import api from "../../services/api";
import { useAuth } from "../../providers/Auth";

interface AnalysisData {
  name: string;
  category: string;
  batch: string;
  concluded: boolean;
}

const AnalistDashboard = () => {
  //   const [user] = useAuth()
  const user = { email: "user1@test.com", id: 1 };

  const [analysis, setAnalysis] = useState<AnalysisData[]>([]);
  const MAX_CARDS = 2;
  const history = useHistory();

  const getAnalysis = () => {
    api
      .get(`/analysis?userID=${user.id}`)
      .then((res) => setAnalysis(res.data))
      .catch((err) => console.log(`erro!: ${err}`));
  };

  const isFinished = analysis.filter((analysi) => analysi.concluded === true);
  const isNotFinished = analysis.filter(
    (analysi) => analysi.concluded === false
  );

  useEffect(() => {
    getAnalysis();
  }, []);

  console.log(analysis);
  console.log(isNotFinished);
  console.log(isFinished);

  return (
    <>
      <Box textAlign="center" fontSize="xs">
        <NavBar>
          <Link to="/">
            Cadastra
            <br /> amostra
          </Link>
          <Link to="/">
            Analisar <br /> amostra
          </Link>
          <Link to="/">
            Pesquisar <br /> amostra
          </Link>
          <Link to="/">Logout</Link>
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
          Bem vindo, <b>UserName</b>
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
                {analysis.length} amostras cadastradas
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
                concluded={analysis.concluded}
                name={analysis.name}
                key={user.id}
              />
            ))}
            <Box textAlign="right" m="4">
              <Button
                variant="link"
                color="blue.600"
                _hover={{ color: "blue.300" }}
                onClick={() => history.push("/")}
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
                concluded={analysis.concluded}
                name={analysis.name}
                key={user.id}
              />
            ))}
            <Box textAlign="right" m="4">
              <Button
                variant="link"
                color="blue.600"
                _hover={{ color: "blue.300" }}
                onClick={() => history.push("/")}
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
