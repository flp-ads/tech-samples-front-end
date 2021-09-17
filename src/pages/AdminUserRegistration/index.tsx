import {
  Button,
  Checkbox,
  Flex,
  Text,
  Heading,
  Icon,
  Input,
} from "@chakra-ui/react";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import GlobalHeader from "../../components/GlobalHeader";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSignup } from "../../providers/UserRegistration";
import { toast } from "react-toastify";

interface UserFormData {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  type: string;
}

const AdminUserRegistration = () => {
  const { signup } = useSignup();
  const history = useHistory();

  const schema = yup.object().shape({
    username: yup.string().required("Campo obrigatório!"),
    email: yup.string().required("Campo obrigatório!").email("email inválido!"),
    password: yup
      .string()
      .required("Campo obrigatório!")
      .min(6, "Mínimo de 6 caracteres"),
    passwordConfirm: yup
      .string()
      .required("Campo obrigatório!")
      .oneOf([yup.ref("password")], "Senhas divergem!"),
    isAdmin: yup.bool(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitFuntion = ({
    username,
    email,
    password,
    isAdmin,
  }: UserFormData) => {
    const user = { username, email, password, isAdmin };

    signup(user);
  };

  return (
    <Flex flexDir="column">
      <GlobalHeader>
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/classes">Cadastrar Classe</Link>
        <Link to="/admin/users">Todos Usuários</Link>
        <Link to="/admin/user_register">Cadastrar Usuário</Link>
      </GlobalHeader>
      <Flex p={["30px 10px", "30px"]}>
        <Button
          variant="default"
          padding={1}
          w={1}
          borderRadius={15}
          onClick={() => history.push("/admin/users")}
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
        maxW="md"
      >
        <Heading
          marginTop={10}
          marginBottom={[8, 12]}
          fontWeight="medium"
          fontSize={[25, 35]}
          textShadow="0 4px 4px rgba(0, 0, 0, 0.25)"
          textAlign="center"
        >
          Cadastrar Usuário
        </Heading>
        <Flex
          flexDir="column"
          as="form"
          onSubmit={handleSubmit(onSubmitFuntion)}
        >
          <Input
            variant="flushed"
            marginBottom="1px solid"
            borderColor="blue.600"
            placeholder="Nome"
            paddingLeft={4}
            {...register("username")}
            isInvalid={!!errors.username}
          />
          <Text color="red.600" fontSize={13} h={5}>
            {errors.username?.message}
          </Text>
          <Input
            variant="flushed"
            marginBottom="1px solid"
            borderColor="blue.600"
            placeholder="Email"
            paddingLeft={4}
            {...register("email")}
            isInvalid={!!errors.email}
          />
          <Text color="red.600" fontSize={13} h={5}>
            {errors.email?.message}
          </Text>
          <Input
            variant="flushed"
            marginBottom="1px solid"
            borderColor="blue.600"
            placeholder="Senha"
            paddingLeft={4}
            {...register("password")}
            isInvalid={!!errors.password}
          />
          <Text color="red.600" fontSize={13} h={5}>
            {errors.password?.message}
          </Text>
          <Input
            variant="flushed"
            marginBottom="1px solid"
            borderColor="blue.600"
            placeholder="Confirmar Senha"
            paddingLeft={4}
            {...register("passwordConfirm")}
            isInvalid={!!errors.passwordConfirm}
          />
          <Text color="red.600" fontSize={13} h={5}>
            {errors.passwordConfirm?.message}
          </Text>
          <Checkbox display="block" margin="20px auto" {...register("isAdmin")}>
            Administrador
          </Checkbox>
          <Button
            variant="default"
            padding={1}
            w={200}
            borderRadius={15}
            m="20px auto"
            type="submit"
          >
            Finalizar Cadastro
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AdminUserRegistration;
