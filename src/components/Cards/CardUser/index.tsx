import { Flex, Spacer } from "@chakra-ui/layout";
import { FaUserTie, FaUserMinus } from "react-icons/fa";
import { Icon, Text } from "@chakra-ui/react";

interface UserData {
  username: string;
  email: string;
  type: string;
  id: number;
}

interface CardUserData {
  data: UserData;
  delUsers: (userId: number) => void;
}

const CardUser = ({ data, delUsers }: CardUserData) => {
  return (
    <Flex minH="100px" maxW="1000px" m="4">
      <Flex
        w="20%"
        minW="16"
        borderLeftRadius="15"
        bg="blue.300"
        p="2"
        align="center"
        justify="center"
      >
        <Icon as={FaUserTie} boxSize={["8", "12", "12"]} color="blue.600" />
      </Flex>
      <Flex flex="1" bg="blue.600" flexDirection="column" p="2" color="gray.50">
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
        bg="blue.600"
        p="2"
        w="10"
        flexDirection="column"
        justify="flex-end"
      >
        <>
          {/* <Icon as={FaUserEdit} boxSize={6} color="blue.300" cursor="pointer" /> */}
          <Icon
            as={FaUserMinus}
            boxSize={["4", "6", "6"]}
            color="blue.300"
            cursor="pointer"
            onClick={() => delUsers(data.id)}
          />
        </>
      </Flex>
    </Flex>
  );
};

export default CardUser;
