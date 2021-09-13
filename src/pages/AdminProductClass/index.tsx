import { Flex, Button, Box, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { GlobalHeader } from "../../components/GlobalHeader";

const AdminProductClass = () => {
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
        flexDirection={{ base: "column", sm: "column", md: "column" }}
        marginTop="10"
      >
        <Box fontSize="xl" fontWeight="500" textAlign="center">
          {" "}
          Username, existem 12 classes de produtos cadastrados
        </Box>
        <Flex flexDirection='row' justifyContent='space-between' alignItems='flex-end'>
          <Input
            variant="flushed"
            marginBottom="1px solid"
            borderColor="blue.600"
            w={{base:'30%', sm:'30%', md:'50%'}}
          />
          <Button marginTop="5" variant="default" w="fit-content" >
            Nova Classe
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default AdminProductClass;
