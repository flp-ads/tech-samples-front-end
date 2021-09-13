import { Flex, Button, Box, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { GlobalHeader } from "../../components/GlobalHeader";
import api from "../../services/api";

interface addNewClassProps {
  value: String
}

interface classesTypes {
  name: String
}

const AdminProductClass = () => {

  const [className, setClassName] = useState<string>('')
  const [classes, setClasses] = useState<classesTypes[]>([] as classesTypes[])
  const addNewClass = (value: any) => {
    api.post('/classes', value).then((response) => console.log(response.data))
  }


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
        marginTop="10"
      >
        <Box fontSize="xl" fontWeight="500" textAlign="center">
          {" "}
          Username, existem 12 classes de produtos cadastrados
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
            onChange={(e)=> setClassName(e.target.value)}
          />
          <Button marginTop="5" variant="default" w="fit-content" onClick={()=> addNewClass(className)}>
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
        marginTop="10"
      >Teste</Flex>
    </div>
  );
};

export default AdminProductClass;
