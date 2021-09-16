import { useState, useEffect } from "react";
import { Flex, Box, Text, Heading, Button, Stack } from "@chakra-ui/react";
import CardUser from "../../components/Cards/CardUser";
import CardClass from "../../components/Cards/CardClass";
import { Link, useHistory } from "react-router-dom";
import NavBar from "../../components/GlobalHeader";
import api from "../../services/api";
import { useAuth } from "../../providers/Auth";

interface userData {
  email: string;
  username: string;
  type: string;
  id: number;
}

interface classData {
  name: string;
  id: number;
}

interface analysisData {
  name: string;
  id: number;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<userData[]>([]);
  const [attPage, setAttPage] = useState<boolean>(false);
  const [classes, setClasses] = useState<classData[]>([]);
  const [analysis, setAnalysis] = useState<analysisData[]>([]);
  const MAX_CARDS = 2;
  const history = useHistory();
  const { token, user } = useAuth();

  const getUsers = () => {
    api
      .get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(`erro!: ${err}`));
  };

  const delUser = (userId: number) => {
    api
      .delete(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => console.log(err));
    setAttPage(!attPage);
  };

  const getClasses = () => {
    api
      .get("/classes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setClasses(res.data))
      .catch((err) => console.log(`erro!: ${err}`));
  };

  const getAnalysis = () => {
    api
      .get("/analyses")
      .then((res) => setAnalysis(res.data))
      .catch((err) => console.log(`erro!: ${err}`));
  };

  useEffect(() => {
    getUsers();
    getClasses();
    getAnalysis();
  }, [attPage]);

  return (
    <>
      <Box textAlign="center" fontSize="xs">
        <NavBar>
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/classes">Cadastrar Classe</Link>
          <Link to="/admin/users">Todos Usuários</Link>
          <Link to="/admin/user_register">Cadastrar Usuário</Link>
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
          Bem vindo, <b>{user.username}</b>
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
                {users.length} usuários cadastrados
              </Text>
            </Text>
            <Text fontSize="2xl" color="blue.300" mt="3">
              O sistêma possui <br />
              <Text fontWeight="semibold" color="blue.600">
                {classes.length} classes de produto
              </Text>
            </Text>
            <Text fontSize="2xl" color="blue.300" mt="3">
              O sistêma possui <br />
              <Text fontWeight="semibold" color="blue.600">
                {analysis.length} amostras cadastradas
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
            {users.slice(0, MAX_CARDS).map((user) => (
              <CardUser
                data={user}
                delUsers={() => delUser(user.id)}
                key={user.id}
              />
            ))}
            <Box textAlign="right" m="4">
              <Button
                variant="link"
                color="blue.600"
                _hover={{ color: "blue.300" }}
                onClick={() => history.push("/admin/users")}
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
            {classes.slice(0, MAX_CARDS).map((classData) => (
              <CardClass
                name={classData.name}
                id={classData.id}
                key={classData.id}
              />
            ))}
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
