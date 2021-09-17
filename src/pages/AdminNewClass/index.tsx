import { Flex, Button, Box, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { GlobalHeader } from "../../components/GlobalHeader";
import CardClass from "../../components/Cards/CardClass";
import { useEffect } from "react";
import { FaUserEdit } from "react-icons/fa";
import { useAllClass } from "../../providers/AllClass";
import { useAuth } from "../../providers/Auth";

const NewClass = () => {
  const { allClasses, getAllClasses, addNewClass } = useAllClass();
  const { user } = useAuth();
  const [className, setClassName] = useState<string>("");

  useEffect(() => {
    getAllClasses();
  }, [allClasses]); //eslint-disable-line

  return (
    <div>
      <GlobalHeader>
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/classes">Cadastrar Classe</Link>
        <Link to="/admin/users">Todos Usuários</Link>
        <Link to="/admin/user_register">Cadastrar Usuário</Link>
      </GlobalHeader>
      <Flex
        boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)"
        borderRadius="3xl"
        p="4"
        w="90vw"
        margin="0 auto"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="column"
        marginTop="5"
      >
        <Box fontSize="xl" fontWeight="500" textAlign="center">
          <b>{user.username}</b>, existem <strong>{allClasses.length}</strong>{" "}
          classes de produtos cadastrados
        </Box>
        <Flex
          flexDirection={{ base: "column", sm: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ base: "center", sm: "center", md: "flex-end" }}
        >
          <Input
            variant="flushed"
            marginBottom="1px solid"
            borderColor="blue.600"
            w={{ base: "70%", sm: "70%", md: "50%" }}
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="Nome da Classe"
          />
          {className === "" ? (
            <Button marginTop="5" variant="disabled" disabled w="fit-content">
              Nova Classe
            </Button>
          ) : (
            <Button
              marginTop="5"
              variant="default"
              w="fit-content"
              onClick={() => {
                addNewClass(className, user.id);
                setClassName("");
              }}
            >
              Nova Classe
            </Button>
          )}
        </Flex>
      </Flex>
      <Flex
        boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)"
        borderRadius="3xl"
        p="4"
        w="90vw"
        margin="0 auto"
        alignItems="center"
        flexDirection="column"
        marginTop="5"
      >
        <Flex w="90vw" p="4" direction="column">
          {allClasses.map((item) => (
            <CardClass key={item.id} name={item.name} id={item.id}>
              <Link to={`/admin/classes/${item.id}/`}>
                <FaUserEdit />
              </Link>
            </CardClass>
          ))}
        </Flex>
      </Flex>
    </div>
  );
};

export default NewClass;
