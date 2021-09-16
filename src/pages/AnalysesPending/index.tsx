import GlobalHeader from "../../components/GlobalHeader";
import { Link, useHistory } from "react-router-dom";
import { Flex, Text, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CardDescription from "../../components/Cards/CardDescription";

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
          isAproved: boolean;
        }
      ];
    }
  ];
  isConcluded: boolean;
  userId: number;
  id: number;
}

const Analyses = () => {
  const analyses = [
    {
      name: "lamen",
      batch: "654987954",
      made: "03-12-2021",
      category: "Produto acabado",
      class: "macarrão",
      analyses: [
        {
          an_name: "fisio-quimicos",
          parameters: [
            {
              name: "umidade",
              vmin: "3",
              vmax: "5",
              unit: "%",
              result: "",
              isAproved: false,
            },
            {
              name: "AW",
              vmin: "0.10",
              vmax: "0.45",
              unit: "P/PO",
              result: "",
              isAproved: false,
            },
          ],
        },
        {
          an_name: "microbiológicos",
          parameters: [
            {
              name: "coliformes",
              vmin: "3",
              vmax: "5",
              unit: "UFC/g",
              result: "",
              isAproved: false,
            },
          ],
        },
      ],
      isConcluded: false,
      userId: 1,
      id: 1,
    },
    {
      name: "baguete",
      batch: "879546549",
      made: "03-12-2021",
      category: "Produto acabado",
      class: "pão",

      analyses: [
        {
          an_name: "fisio-quimicos",
          parameters: [
            {
              name: "umidade",
              vmin: "3",
              vmax: "5",
              unit: "%",
              result: "",
              isAproved: false,
            },
            {
              name: "AW",
              vmin: "0.10",
              vmax: "0.45",
              unit: "P/PO",
              result: "",
              isAproved: false,
            },
          ],
        },
        {
          an_name: "microbiológicos",
          parameters: [
            {
              name: "coliformes",
              vmin: "3",
              vmax: "5",
              unit: "UFC/g",
              result: "",
              isAproved: false,
            },
          ],
        },
      ],

      isConcluded: true,
      userId: 1,
      id: 2,
    },
    {
      name: "aveia",
      batch: "687954954",
      made: "03-12-2021",
      category: "Matéria prima",
      class: "cereal",

      analyses: [
        {
          an_name: "fisio-quimicos",
          parameters: [
            {
              name: "umidade",
              vmin: "3",
              vmax: "5",
              unit: "%",
              result: "",
              isAproved: false,
            },
            {
              name: "AW",
              vmin: "0.10",
              vmax: "0.45",
              unit: "P/PO",
              result: "",
              isAproved: false,
            },
          ],
        },
        {
          an_name: "microbiológicos",
          parameters: [
            {
              name: "coliformes",
              vmin: "3",
              vmax: "5",
              unit: "UFC/g",
              result: "",
              isAproved: false,
            },
          ],
        },
      ],

      isConcluded: false,
      userId: 1,
      id: 3,
    },
  ];

  const [data, setData] = useState<AnalysisContent[]>([] as AnalysisContent[]);

  const dataFilter = (data: AnalysisContent[]) => {
    const dataFiltered = data.filter((item) => item.isConcluded === false);
    setData(dataFiltered);
  };

  useEffect(() => {
    dataFilter(analyses as AnalysisContent[]);
  }, []);

  const history = useHistory();

  const handleAnalysis = (id: number) => {
    history.push(`/analyst/pending/${id}`);
  };

  return (
    <div>
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
          9
        </Text>
        <Text marginRight="2"> amostras pendentes</Text>
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
