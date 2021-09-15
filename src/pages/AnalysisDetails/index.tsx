import { Flex, Box, Link, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import GlobalHeader from "../../components/GlobalHeader";

interface Params {
  id: string;
}

const AnalysisDetails = () => {
  const { id } = useParams<Params>();

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

  const analysis = analyses.filter((item) => item.id === Number(id));

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
        margin="3vw"
        marginLeft="5vw"
        align="center"
        justify="center"
        direction="column"
        bg="blue.600"
        color="white"
      >
        <Box>
          <Flex>
            <Text fontWeight="semibold" marginRight="2">
              Amostra:
            </Text>
            <Text>{analysis[0].name}</Text>
          </Flex>
          <Flex>
            <Text fontWeight="semibold" marginRight="2">
              Lote:
            </Text>
            <Text>{analysis[0].batch}</Text>
          </Flex>
        </Box>
      </Flex>
      <Flex
        boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)"
        borderRadius="2xl"
        p="4"
        w="90vw"
        margin="5vw"
        marginTop="3vw"
        align="center"
        justify="center"
        direction="column"
        bg="blue.300"
        color="white"
      ></Flex>
    </>
  );
};
export default AnalysisDetails;
