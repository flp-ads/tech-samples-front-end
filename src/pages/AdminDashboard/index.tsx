import { Flex, Box, Text, Heading, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import NavBar from "../../components/GlobalHeader";

const AdminDashboard = () => {
  return (
    <>
      <Box textAlign="center" fontSize="xs">
        <NavBar>
          <Link to="/">
            Cadastra
            <br /> produto
          </Link>
          <Link to="/">
            Editar <br /> parâmetros
          </Link>
          <Link to="/">
            Cadastrar <br /> usuário
          </Link>
          <Link to="/">Logout</Link>
        </NavBar>
      </Box>

      <Flex direction="column">
        <Heading
          as="h1"
          textAlign={["center", "center", "left"]}
          fontWeight="normal"
          mt={["8", "6", "4"]}
          ml={["0", "0", "16"]}
        >
          Bem vindo, <b>UserName</b>
        </Heading>
      </Flex>
      <Flex direction="column" align="center">
        <Flex
          w="90vw"
          p={4}
          boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)"
          borderRadius="3xl"
          m="4"
          textAlign="center"
          direction="column"
        >
          <Flex justify="center">
            <Heading as="h3" fontWeight="normal" mb="3">
              Visão global
            </Heading>
          </Flex>
          <Flex
            direction={["column", "column", "row"]}
            justify={["center", "center", "space-around"]}
          >
            <Text fontSize="2xl" color="blue.300" mt="3">
              O sistêma possui <br />
              <Text fontWeight="semibold" color="blue.600">
                20 usuários cadastrados
              </Text>
            </Text>
            <Text fontSize="2xl" color="blue.300" mt="3">
              O sistêma possui <br />
              <Text fontWeight="semibold" color="blue.600">
                14 classes de produto
              </Text>
            </Text>
            <Text fontSize="2xl" color="blue.300" mt="3">
              O sistêma possui <br />
              <Text fontWeight="semibold" color="blue.600">
                683 amostras finalizadas
              </Text>
            </Text>
          </Flex>
        </Flex>
        <Flex direction={["column", "column", "row"]}>
          <Box
            w={["90vw", "90vw", "44vw"]}
            p={4}
            boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)"
            borderRadius="3xl"
            textAlign="center"
            m={["4", "4", "3"]}
          >
            <Heading as="h4" mb="3" fontSize="3xl">
              Usuários cadastrados
            </Heading>
            <Box
              h="100px"
              m="4"
              bgGradient="linear(to-r, blue.300 , blue.600 70%)"
            ></Box>
            <Box
              h="100px"
              m="4"
              bgGradient="linear(to-r, blue.300 , blue.600 70%)"
            ></Box>
            <Box textAlign="right" m="4">
              <Button
                variant="link"
                color="blue.600"
                _hover={{ color: "blue.300" }}
              >
                ver todos
              </Button>
            </Box>
          </Box>
          <Box
            w={["90vw", "90vw", "44vw"]}
            p={4}
            boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)"
            borderRadius="3xl"
            textAlign="center"
            m={["4", "4", "3"]}
          >
            <Heading as="h4" mb="3" fontSize="3xl">
              Classes de produtos
            </Heading>
            <Box
              h="100px"
              m="4"
              bgGradient="linear(to-r, blue.300 , blue.600 70%)"
            ></Box>
            <Box
              h="100px"
              m="4"
              bgGradient="linear(to-r, blue.300 , blue.600 70%)"
            ></Box>
            <Box textAlign="right" m="4">
              <Button
                variant="link"
                color="blue.600"
                _hover={{ color: "blue.300" }}
              >
                ver todos
              </Button>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default AdminDashboard;
