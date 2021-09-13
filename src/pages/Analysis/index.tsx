import GlobalHeader from "../../components/GlobalHeader";
import { Link } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "toasted-notes/node_modules/@types/react";
import {
  Dispatch,
  SetStateAction,
} from "toasted-notes/node_modules/@types/react";

interface AnalysisData {
  setData: Dispatch<SetStateAction<[]>>;
}

const Analysis = () => {
  const analysis = [
    {
      name: "lamen",
      batch: "654987954",
      made: "03-12-2021",
      category: "Produto acabado",
      class: {
        className: "macarrão",
        id: 101,
        parameters: [
          {
            type: "fisio-quimicos",
            umidade: {
              Min: "3",
              Max: "5",
              unidade: "%",
              result: "",
            },
            AW: {
              Min: "0.10",
              Max: "0.45",
              unidade: "P/PO",
              result: "",
            },
          },
          {
            type: "microbiológicos",
            coliformes: {
              Min: "3",
              Max: "5",
              unidade: "UFC/g",
              result: "",
            },
          },
        ],
      },
      concluded: false,
      userId: 1,
      id: 1,
    },
    {
      name: "baguete",
      batch: "879546549",
      made: "03-12-2021",
      category: "Produto acabado",
      class: {
        className: "pão",
        id: 102,
        parameters: [
          {
            type: "fisio-quimicos",
            umidade: {
              Min: "3",
              Max: "5",
              unidade: "%",
              result: "",
            },
            AW: {
              Min: "0.10",
              Max: "0.45",
              unidade: "P/PO",
              result: "",
            },
          },
          {
            type: "microbiológicos",
            coliformes: {
              Min: "3",
              Max: "5",
              unidade: "UFC/g",
              result: "",
            },
          },
        ],
      },
      concluded: true,
      userId: 1,
      id: 2,
    },
    {
      name: "aveia",
      batch: "687954954",
      made: "03-12-2021",
      category: "Matéria prima",
      class: {
        className: "cereal",
        id: 103,
        parameters: [
          {
            type: "fisio-quimicos",
            umidade: {
              Min: "3",
              Max: "5",
              unidade: "%",
              result: "",
            },
            AW: {
              Min: "0.10",
              Max: "0.45",
              unidade: "P/PO",
              result: "",
            },
          },
          {
            type: "microbiológicos",
            coliformes: {
              Min: "3",
              Max: "5",
              unidade: "UFC/g",
              result: "",
            },
          },
        ],
      },
      concluded: false,
      userId: 1,
      id: 3,
    },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    analysis.filter((item) =>
      setData<AnalysisData>(!item.concluded as AnalysisData)
    );
  }, []);
  return (
    <>
      <GlobalHeader>
        <Link to="/">Cadastrar amostra</Link>
        <Link to="/">Analisar amostra</Link>
        <Link to="/">Pesquisar amostra</Link>
      </GlobalHeader>
      <Flex
        boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)"
        borderRadius="3xl"
        p="4"
        w="90vw"
        marginLeft="5vw"
        align="center"
        justify="center"
      >
        <Text> Username</Text>
        <Text> você tem </Text>
        <Text>9</Text>
        <Text> amostras pendentes</Text>
      </Flex>
      <Flex
        boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)"
        borderRadius="3xl"
        p="4"
        w="90vw"
        marginLeft="5vw"
        align="center"
        justify="center"
      ></Flex>
    </>
  );
};

export default Analysis;
