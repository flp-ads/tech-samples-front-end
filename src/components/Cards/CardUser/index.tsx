import { Flex, Spacer } from "@chakra-ui/layout";
import { FaUserTie, FaUserMinus, FaUserEdit } from "react-icons/fa";
import { Icon, Text } from "@chakra-ui/react";

interface UserData {
  username: string;
  email: string;
  isAdmin?: boolean;
}

const CardUser = (data: UserData) => {
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
        <Icon as={FaUserTie} boxSize={12} color="blue.700" />
      </Flex>
      <Flex flex="1" bg="blue.700" flexDirection="column" p="2" color="gray.50">
        <Flex wrap="wrap">
          <Text fontSize="xl" fontWeight="semibold">
            {data.username}
          </Text>
        </Flex>
        <Spacer />
        <Flex wrap="wrap">Email: {data.email}</Flex>
      </Flex>
      <Flex
        borderRightRadius="15"
        bg="blue.700"
        p="2"
        w="10"
        flexDirection="column"
        justify="space-between"
      >
        {data.isAdmin && (
          <>
            <Icon as={FaUserEdit} boxSize={6} color="blue.300" />
            <Icon as={FaUserMinus} boxSize={6} color="blue.300" />
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default CardUser;
