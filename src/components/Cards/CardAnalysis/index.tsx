import { Flex } from "@chakra-ui/layout";
import { Image, Text } from "@chakra-ui/react";
import clipboards from "../../../assets/icons/clipboards.svg";
import scienceTools from "../../../assets/icons/science_tools.svg";

interface AnalysisData {
  name: string;
  category: string;
  batch: string;
  concluded: boolean;
}

const CardAnalysis = (data: AnalysisData) => {
  return (
    <Flex m="3" minH="100px" minW="250px">
      <Flex
        w="20%"
        minW="16"
        borderLeftRadius="15"
        bg="blue.300"
        p="2"
        align="center"
        justify="center"
      >
        {data.concluded ? (
          <Image src={clipboards} boxSize={16} />
        ) : (
          <Image src={scienceTools} boxSize={16} />
        )}
      </Flex>
      <Flex
        flex="1"
        bg="blue.600"
        flexDirection="column"
        justifyContent="space-between"
        p="2"
        color="gray.50"
        borderRightRadius="15"
      >
        <Flex wrap="wrap">
          <Text fontSize="xl" fontWeight="semibold">
            {data.name}
          </Text>
        </Flex>
        <Flex flexDirection="column">
          <Flex wrap="wrap">
            <Text>Categoria: {data.category}</Text>
          </Flex>
          <Flex wrap="wrap">
            <Text>Lote: {data.batch}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CardAnalysis;
