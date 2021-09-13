import { Flex, Button, Box, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { GlobalHeader } from "../../components/GlobalHeader";
import api from "../../services/api";
import CardClass from "../../components/Cards/CardClass";
import { useEffect } from "react";
import { FaUserEdit } from "react-icons/fa";
import { useClass } from "../../providers/Class";
import { useAuth } from "../../providers/Auth";


const AdminProductClass = () => {
  const { allClasses, getAllClasses } = useClass()
  const { token } = useAuth()
  const tokenTeste = localStorage.getItem("token") || "[]";
  const [className, setClassName] = useState<string>("");

  useEffect(() => {
    getAllClasses()
  }, [allClasses]);

  const addNewClass = (value: any) => {
    api
      .post(
        "/classes",
        { name: value, userId: 3 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => console.log(response.data));
    setClassName("");
  };

  return (
    <div>
      <GlobalHeader>
        <Link to="/adminProductClass">Cadastrar Produto</Link>
        <Link to="">Editar Parâmetros</Link>
        <Link to="">Cadastrar Usuário</Link>
        <Link to="">Logout</Link>
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
          {" "}
          Username, existem <strong>{allClasses.length}</strong> classes de
          produtos cadastrados
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
          <Button
            marginTop="5"
            variant="default"
            w="fit-content"
            onClick={() => addNewClass(className)}
          >
            Nova Classe
          </Button>
        </Flex>
      </Flex>
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
        overflowY="auto"
        height="60vh"
        overflowX="hidden"
        css={{
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#0a369d",
            borderRadius: "24px",
          },
        }}
      >
        {allClasses.map((item) => (
          <CardClass key={item.id} name={item.name} id={item.id}>
            <Link to=''><FaUserEdit /></Link>
          </CardClass>
        ))}
      </Flex>
    </div>
  );
};

export default AdminProductClass;
