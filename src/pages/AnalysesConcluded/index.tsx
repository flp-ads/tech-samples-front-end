import GlobalHeader from "../../components/GlobalHeader";
import { Link } from "react-router-dom";
import { Flex, Text, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CardDescription from "../../components/Cards/CardDescription";
import { useAnalyses } from "../../providers/Analyses";
import { useAuth } from "../../providers/Auth";
import { useHistory } from "react-router-dom";

interface AnalysisContent {
  name: string;
  batch: string;
  made: string;
  category: string;
  class: string;
  analyses: [];
  isConcluded: boolean;
  userId: number;
  id: number;
}

const AnalysesConcluded = () => {
  const [data, setData] = useState<AnalysisContent[]>([] as AnalysisContent[]);
  const { analyses, getAllAnalyses, setIdNumber } = useAnalyses();

  const dataFilter = (analyses: AnalysisContent[]) => {
    const dataFiltered = analyses.filter(
      (analysis) => analysis.isConcluded === true
    );
    setData(dataFiltered);
  };

  const { user } = useAuth();
  const history = useHistory();

  const handlePrint = (id: number) => {
    setIdNumber(id);
    history.push(`/certificate/${id}`);
  };

  useEffect(() => {
    getAllAnalyses();
    dataFilter(analyses);
  }, [analyses]);

  return (
    <div>
      <GlobalHeader>
        <Link to="/analyst">Dashboard</Link>
        <Link to="/analyst/concluded">Amostras Finalizadas</Link>
        <Link to="/analyst/pending">Amostras Pendentes</Link>
        <Link to="/analyst/sample_register">Cadastrar Amostra</Link>
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
            <b>{user.username}</b> você tem <b>{data.length}</b> amostras
            pendentes
          </Text>
        </Flex>
      </Flex>
      <Flex
        w="100%"
        align="center"
        justify="center"
        wrap="wrap"
        direction="column"
      >
        <Flex
          w="90%"
          p="4"
          align="center"
          justify="center"
          wrap="wrap"
          boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)"
          borderRadius="2xl"
        >
          {data.map((item) => (
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
                w="150px"
                variant="sucess"
                onClick={() => handlePrint(item.id)}
              >
                Visualizar laudo
              </Button>
            </CardDescription>
          ))}
        </Flex>
      </Flex>
    </div>
  );
};

export default AnalysesConcluded;
