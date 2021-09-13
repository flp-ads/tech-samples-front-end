import { Button, Flex, Grid, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import CardUser from "../../components/Cards/CardUser";
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
  const [attPage, setAttPage] = useState<boolean>(false);
  const history = useHistory();
  // const { token } = useAuth();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQHRlc3QuY29tIiwiaWF0IjoxNjMxNTM3NjA4LCJleHAiOjE2MzE1NDEyMDgsInN1YiI6IjEifQ.g0jxWLBy6vzikH0FeNudrr_zsO4fTVEfxpSx_xwzMqs";

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
    setAttPage(!attPage);
  };

  useEffect(() => {
    getUsers();
  }, [attPage]);

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
      <Grid templateColumns="repeat(5, 1fr)" gap={4} p={["30px 10px", "30px"]}>
        <Button
          variant="default"
          padding={1}
          w={1}
          borderRadius={15}
          onClick={() => history.push("/dashboard")}
        >
          <Icon as={BsArrowLeftShort} w="30px" h="30px" />
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
      <Flex
        flexDirection="column"
        alignItems="center"
        gridGap={5}
        p={["10px", "30px"]}
        paddingTop="30px"
      >
        {users.map((user) => (
          <CardUser key={user.id} data={user} delUser={delUser} />
        ))}
      </Flex>
    </>
  );
};

export default AdminAllUsers;
