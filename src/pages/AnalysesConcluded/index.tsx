import GlobalHeader from "../../components/GlobalHeader";
import { Link } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CardDescription from "../../components/Cards/CardDescription";
import { useAnalyses } from "../../providers/Analyses";

import { IAnalysis } from '../../providers/Analyses'

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
  const [data, setData] = useState<IAnalysis[]>([]);
  const { analyses, getAllAnalyses } = useAnalyses();

  const dataFilter = (analyses: IAnalysis[]) => {
    const dataFiltered = analyses.filter(
      (analysis) => analysis.isConcluded === true
    );
    setData(dataFiltered);
  };

  useEffect(() => {
    getAllAnalyses();
    dataFilter(analyses);
  }, [analyses]);


  return (
    <div>
      <GlobalHeader>
        <Link to="/analyst/sample_register">Cadastrar amostra</Link>
        <Link to="/analyst/pending">Análises Pendentes</Link>
      </GlobalHeader>
      <Flex
        boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)"
        borderRadius="2xl"
        p="4"
        w="90vw"
        margin="3vw"
        marginLeft="5vw"
        align="center"
        justify="center"
      >
        <Text fontWeight="semibold" marginRight="2">
          Username
        </Text>
        <Text marginRight="2">você tem</Text>
        <Text fontWeight="semibold" marginRight="2">
          {data.length}
        </Text>
        <Text marginRight="2"> amostras concluidas</Text>
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
          ></CardDescription>
        ))}
      </Flex>
    </div>
  );
};

export default AnalysesConcluded;
