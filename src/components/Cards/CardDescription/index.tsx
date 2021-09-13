import { Flex } from "@chakra-ui/layout";
import { Image, Text } from "@chakra-ui/react";
import clipboards from "../../../assets/icons/clipboards.svg";
import scienceTools from "../../../assets/icons/science_tools.svg";

interface DescriptionData {
  name: string;
  batch: string;
  made: string;
  category: string;
  class: {
    className: string;
  };
  id: number;
  concluded: boolean;
}

const CardDescription = (data: DescriptionData) => {
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
        bg="blue.700"
        flexDirection="column"
        justifyContent="space-between"
        p="2"
        color="gray.50"
        borderRightRadius="15"
      >
        <Flex
          justifyContent="space-between"
          wrap="wrap"
          flexDirection={{ base: "column", md: "row" }}
        >
          <Text flex="1" fontSize="xl" fontWeight="semibold">
            {data.name}
          </Text>
          <Text flex="1" fontSize="xl" fontWeight="semibold">
            {data.batch}
          </Text>
          <Text flex="1" fontSize="xl" fontWeight="semibold">
            {data.made}
          </Text>
        </Flex>
        <Flex
          justifyContent="space-between"
          wrap="wrap"
          flexDirection={{ base: "column", md: "row" }}
        >
          <Text flex="1" fontSize="xl" fontWeight="semibold">
            {data.category}
          </Text>
          <Text flex="1" fontSize="xl" fontWeight="semibold">
            {data.class.className}
          </Text>
          <Text flex="1" fontSize="xl" fontWeight="semibold">
            ID: {data.id}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CardDescription;
