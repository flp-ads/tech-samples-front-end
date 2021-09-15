import { Flex } from "@chakra-ui/layout";
import { Image, Text } from "@chakra-ui/react";
import { ReactNode } from "toasted-notes/node_modules/@types/react";
import glasses from "../../../assets/icons/test_glasses.svg";

interface ClassData {
  name: string;
  id: number;
  children?: ReactNode;
}

const CardClass = ({ name, id, children }: ClassData) => {
  return (
    <Flex
      m="3"
      minH="100px"
      minW="250px"
      width={{ base: "20%", sm: "70%", md: "90%" }}
    >
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
            Classe: {name}
          </Text>
        </Flex>
        <Flex wrap="wrap">
          <Text fontWeight="semibold">ID: {id}</Text>
        </Flex>
        <Flex alignSelf="flex-end">{children}</Flex>
      </Flex>
    </Flex>
  );
};

export default CardClass;
