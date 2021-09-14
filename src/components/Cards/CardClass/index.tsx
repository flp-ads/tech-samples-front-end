import { Flex } from "@chakra-ui/layout";
import { Image, Text } from "@chakra-ui/react";
import { ReactNode } from "toasted-notes/node_modules/@types/react";
import glasses from "../../../assets/icons/test_glasses.svg";

interface ClassData {
  name: string;
  id: number;
  children: ReactNode;
}

const CardClass = (data: ClassData) => {
  return (
    <Flex m="4" minH="100px" maxW="1000px">
      <Flex
        w="20%"
        minW="16"
        borderLeftRadius="15"
        bg="blue.300"
        p="2"
        align="center"
        justify="center"
      >
        <Image src={glasses} boxSize={12} />
      </Flex>
      <Flex flex="1" bg="blue.600" color="gray.50" borderRightRadius="15">
        <Flex flex="1" direction="column" justify="space-between" p="2">
          <Flex wrap="wrap">
            <Text fontSize="xl" fontWeight="semibold">
              Classe: {data.name}
            </Text>
          </Flex>
          <Flex wrap="wrap">
            <Text fontWeight="semibold">ID: {data.id}</Text>
          </Flex>
        </Flex>
        <Flex
          bg="blue.600"
          p="2"
          w="10"
          flexDirection="column"
          justify="end"
          borderRightRadius="15"
        >
          {data.children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CardClass;
