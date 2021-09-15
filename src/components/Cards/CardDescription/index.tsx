import { Image, Text, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import clipboards from "../../../assets/icons/clipboards.svg";
import scienceTools from "../../../assets/icons/science_tools.svg";

interface DescriptionData {
  name: string;
  batch: string;
  made: string;
  category: string;
  class: string;
  id: number;
  concluded: boolean;
  children?: ReactNode;
}

const CardDescription = (data: DescriptionData) => {
  return (
    <Flex m="3" minH="100px">
      <Flex
        w={["5px", "20%", "20%"]}
        minW={["5px", "16px", "16px"]}
        borderLeftRadius="15"
        bg="blue.300"
        p="2"
        align="center"
        justify="center"
      >
        {data.concluded ? (
          <Image
            src={clipboards}
            boxSize={["0", "16", "16"]}
            display={["none", "block", "block"]}
          />
        ) : (
          <Image
            src={scienceTools}
            boxSize={["0", "16", "16"]}
            display={["none", "block", "block"]}
          />
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
        <Flex
          justifyContent="space-between"
          wrap="wrap"
          flexDirection={["column", "row", "row"]}
        >
          <Flex
            flex="1"
            direction={["row", "column", "row"]}
            wrap="wrap"
            pl="2"
            align={["center", "start", "center"]}
          >
            <Text fontSize="sm" fontWeight="semibold">
              Nome da amostra:
            </Text>
            <Text pl="2"> {data.name}</Text>
          </Flex>
          <Flex
            flex="1"
            direction={["row", "column", "row"]}
            wrap="wrap"
            pl="2"
            align={["center", "start", "center"]}
          >
            <Text fontSize="sm" fontWeight="semibold">
              Lote:
            </Text>
            <Text pl="2"> {data.batch}</Text>
          </Flex>
          <Flex
            flex="1"
            direction={["row", "column", "row"]}
            wrap="wrap"
            pl="2"
            align={["center", "start", "center"]}
          >
            <Text fontSize="sm" fontWeight="semibold">
              Fabricado em:
            </Text>
            <Text pl="2"> {data.made}</Text>
          </Flex>
        </Flex>
        <Flex
          justifyContent="space-between"
          wrap="wrap"
          flexDirection={["column", "row", "row"]}
        >
          <Flex
            flex="1"
            direction={["row", "column", "row"]}
            wrap="wrap"
            pl="2"
            align={["center", "start", "center"]}
          >
            <Text fontSize="sm" fontWeight="semibold">
              Categoria:
            </Text>
            <Text pl="2"> {data.category}</Text>
          </Flex>
          <Flex
            flex="1"
            direction={["row", "column", "row"]}
            wrap="wrap"
            pl="2"
            align={["center", "start", "center"]}
          >
            <Text fontSize="sm" fontWeight="semibold">
              Classe de produto:
            </Text>
            <Text pl="2"> {data.class}</Text>
          </Flex>
          <Flex
            flex="1"
            direction={["row", "column", "row"]}
            wrap="wrap"
            pl="2"
            align={["center", "start", "center"]}
          >
            <Text fontSize="sm" fontWeight="semibold">
              ID:
            </Text>
            <Text pl="2"> {data.id}</Text>
          </Flex>
        </Flex>
        {data.children && (
          <Flex direction="row" w="100%" justify="end">
            {data.children}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default CardDescription;
