import { Box, Button, Flex, Grid, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { FaUserMinus, FaUserPlus, FaUserTie } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import GlobalHeader from "../../components/GlobalHeader";
// import { useAuth } from "../../providers/Auth";
import api from "../../services/api";

interface typeUserData {
  email: string;
  password: string;
  username: string;
  type: string;
  id: number;
}

const AdminAllUsers = () => {
  const [users, setUsers] = useState<typeUserData[]>([]);
  const history = useHistory();
  // const { token } = useAuth();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQHRlc3QuY29tIiwiaWF0IjoxNjMxMzg3NjE4LCJleHAiOjE2MzEzOTEyMTgsInN1YiI6IjEifQ._DuX_vM4pMWf5KspY6ffnlsl_wqCmZDeNNkz8DGjUNY";

  const getUsers = () => {
    api
      .get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(`Não Foi!: ${err}`));
  };

  const delUser = (userId: number) => {
    api
      .delete(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <GlobalHeader>
        <Link to="/">Cadastrar Produto</Link>
        <Link to="/">Editar Parâmetros</Link>
        <Link to="/">
          <strong>Usuários</strong>
        </Link>
        <Link to="/">Logout</Link>
      </GlobalHeader>
      <Grid templateColumns="repeat(5, 1fr)" gap={4} m={30}>
        <Button
          variant="default"
          padding={1}
          w={1}
          borderRadius={15}
          onClick={() => history.push("/dashboard")}
        >
          <BsArrowLeftShort size={30} />
        </Button>
        <Button
          variant="default"
          gridColumnStart={3}
          w={200}
          borderRadius={15}
          onClick={() => history.push("/register")}
        >
          <FaUserPlus />
          <p>Cadastrar Usuário</p>
        </Button>
      </Grid>
      <Flex flexDirection="column" alignItems="center" gridGap={5} p="50">
        {users.map((item) => (
          <Grid
            key={item.id}
            bg="blue.700"
            w="100%"
            h="120"
            borderRadius="20"
            gridGap={0}
            templateColumns="repeat(4, 1fr)"
          >
            <Flex
              gridColumnStart={1}
              bg="blue.300"
              borderLeftRadius={15}
              alignItems="center"
              justifyContent="center"
              h="120"
            >
              <FaUserTie size="45%" />
            </Flex>
            <Flex
              flexDirection="column"
              gridColumnStart={2}
              color="gray.50"
              p={4}
            >
              <Box>{item.username}</Box>
              <Box>{item.email}</Box>
            </Flex>
            <Flex
              gridColumnStart={4}
              justifyContent="flex-end"
              alignItems="flex-end"
              p={4}
            >
              <Icon
                as={FaUserMinus}
                onClick={() => delUser(item.id)}
                color="blue.300"
                cursor="pointer"
                w={6}
                h={6}
              />
            </Flex>
          </Grid>
        ))}
      </Flex>
    </>
  );
};

export default AdminAllUsers;
