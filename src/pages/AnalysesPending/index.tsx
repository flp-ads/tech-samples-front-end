import GlobalHeader from "../../components/GlobalHeader";
import { Link, useHistory } from "react-router-dom";
import { Flex, Text, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAnalyses } from "../../providers/Analyses";
import { useAuth } from "../../providers/Auth";
import { useLogout } from "../../providers/Logout";

import CardDescription from "../../components/Cards/CardDescription";

const Analyses = () => {
  const { analyses, getAllAnalyses } = useAnalyses();

  const analysesPending = analyses.filter((item) => item.isConcluded === false);

  useEffect(() => {
    getAllAnalyses();
  }, []); //eslint-disable-line

  const history = useHistory();

  const { user } = useAuth();

  const handleAnalysis = (id: number) => {
    history.push(`/analyst/pending/${id}`);
  };

  const { logout} = useLogout()

  return (
    <div>
      <GlobalHeader>
        <Link to="/analyst">Dashboard</Link>
        <Link to="/analyst/concluded">Amostras Finalizadas</Link>
        <Link to="/analyst/pending">Amostras Pendentes</Link>
        <Link to="/analyst/sample_register">Cadastrar Amostra</Link>
        <Link to="/" onClick={logout}>
            Logout
          </Link>
      </GlobalHeader>
      <Flex w="100vw" align="center" justify="center">
        <Flex
          boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)"
          borderRadius="2xl"
          p="4"
          w="90vw"
          margin="4"
          textAlign="center"
          align="center"
          justify="center"
        >
          <Text marginRight="2">
            <b>{user.username}</b> você tem <b>{analysesPending.length}</b>{" "}
            amostras pendentes
          </Text>
        </Flex>
      </Flex>
      <Flex
        boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)"
        borderRadius="2xl"
        p="4"
        w="90vw"
        marginLeft="5vw"
        align="center"
        justify="center"
        wrap="wrap"
      >
        {analysesPending.map((item) => (
          <CardDescription
            key={item.id}
            category={item.category}
            class={item.class}
            batch={item.batch}
            id={item.id}
            made={item.made}
            name={item.name}
            concluded={item.isConcluded}
          >
            <Button
              w="100px"
              variant="sucess"
              onClick={() => handleAnalysis(item.id)}
            >
              Detalhes
            </Button>
          </CardDescription>
        ))}
      </Flex>
    </div>
  );
};

export default Analyses;
