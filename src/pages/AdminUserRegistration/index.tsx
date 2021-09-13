import { Button, Checkbox, Flex, Heading, Icon, Input } from "@chakra-ui/react";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import GlobalHeader from "../../components/GlobalHeader";

const AdminUserRegistration = () => {
  const history = useHistory();
  return (
    <Flex flexDir="column">
      <GlobalHeader>
        <Link to="/">Cadastrar Produto</Link>
        <Link to="/">Editar Parâmetros</Link>
        <Link to="/">
          <strong>Cadastrar Usuário</strong>
        </Link>
        <Link to="/">Logout</Link>
      </GlobalHeader>
      <Flex p={["30px 10px", "30px"]}>
        <Button
          variant="default"
          padding={1}
          w={1}
          borderRadius={15}
          onClick={() => history.push("/users")}
        >
          <Icon as={BsArrowLeftShort} w="30px" h="30px" />
        </Button>
      </Flex>
      <Flex
        flexDirection="column"
        alignSelf="center"
        boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)"
        borderRadius="3xl"
        p="30px 60px"
        w="md"
      >
        <Heading marginBottom="30px">Cadastrar Usuário</Heading>
        <Flex gridGap={5} flexDir="column">
          <Input
            variant="flushed"
            marginBottom="1px solid"
            borderColor="blue.600"
            placeholder="Nome"
            paddingLeft={4}
            //   {...register("name")}
            //   error={errors.name?.message}
          />
          <Input
            variant="flushed"
            marginBottom="1px solid"
            borderColor="blue.600"
            placeholder="Email"
            paddingLeft={4}
            //   {...register("email")}
            //   error={errors.email?.message}
          />
          <Input
            variant="flushed"
            marginBottom="1px solid"
            borderColor="blue.600"
            placeholder="Senha"
            paddingLeft={4}
            //   {...register("password")}
            //   error={errors.password?.message}
          />
          <Input
            variant="flushed"
            marginBottom="1px solid"
            borderColor="blue.600"
            placeholder="Confirmar Senha"
            paddingLeft={4}
            //   {...register("passwordConfirm")}
            //   error={errors.passwordConfirm?.message}
          />
          <Checkbox display="block" margin="20px auto">
            Administrador
          </Checkbox>
          <Button
            variant="default"
            padding={1}
            w={200}
            borderRadius={15}
            m="20px auto"
          >
            Finalizar Cadastro
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AdminUserRegistration;
