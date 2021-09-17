import { Flex, Input, Select, Box, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import GlobalHeader from "../../components/GlobalHeader";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAllClass } from "../../providers/AllClass";
import { useEffect } from "react";
import { useAnalyses } from "../../providers/Analyses";

import { IAnalysis } from "../../providers/Analyses";
import { useLogout } from "../../providers/Logout";

const NewSamples = () => {
  const { allClasses, getAllClasses } = useAllClass();
  const { newAnalysis } = useAnalyses();

  useEffect(() => {
    getAllClasses();
  }, []); //eslint-disable-line

  const formSchema = yup.object().shape({
    name: yup.string().required("Nome obrigatório"),
    batch: yup.string().required("Número do lote obrigatório"),
    made: yup.date().required().typeError("Data fabricação obrigatória"),
    category: yup.string().required("Categoria obrigatória"),
    class: yup.string().required("Classe obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onFormSubmit = (formData: IAnalysis) => {
    newAnalysis(formData);
  };

  const { logout } = useLogout()

  return (
    <div>
      <GlobalHeader>
        <Link to="/analyst">Dashboard</Link>
        <Link to="/analyst/concluded">Amostras Finalizadas</Link>
        <Link to="/analyst/pending">Amostras Pendentes</Link>
        <Link to="/analyst/sample_register">Cadastrar Amostra</Link>
        <Link to="/" onClick={logout}>
            Logout
          </Link>
      </GlobalHeader>
      <Flex
        as="form"
        boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)"
        borderRadius="3xl"
        p="4"
        w="90vw"
        margin="0 auto"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="column"
        flexWrap="wrap"
        marginTop="5"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <Box
          fontSize="2xl"
          fontWeight="semibold"
          width="100%"
          margin="0 auto"
          textAlign="center"
        >
          Cadastrar Amostra
        </Box>
        <Flex
          flexDirection={{ base: "column", sm: "column", md: "row" }}
          flexWrap="wrap"
          width={{ base: "100%", sm: "100%", md: "90%" }}
          justifyContent="space-between"
        >
          <Flex
            flexDir="column"
            width={{ base: "100%", sm: "100%", md: "45%" }}
          >
            <Input
              marginTop={{ base: "4", sm: "4", md: "5" }}
              variant="flushed"
              marginBottom="1px solid"
              borderColor="blue.600"
              placeholder="Nome da Amostra"
              mb="4"
              {...register("name")}
              error={errors.name?.message}
            />
            <Text color="red.600" fontSize={13} h={5}>
              {errors.name?.message}
            </Text>
          </Flex>
          <Box flexDir="column" width={{ base: "100%", sm: "100%", md: "45%" }}>
            <Input
              marginTop={{ base: "4", sm: "4", md: "5" }}
              variant="flushed"
              marginBottom="1px solid"
              borderColor="blue.600"
              placeholder="Nº do Lote"
              mb="4"
              {...register("batch")}
              error={errors.batch?.message}
            />
            <Text color="red.600" fontSize={13} h={5}>
              {errors.batch?.message}
            </Text>
          </Box>
          <Box flexDir="column" width={{ base: "100%", sm: "100%", md: "45%" }}>
            <Input
              marginTop={{ base: "4", sm: "4", md: "5" }}
              variant="flushed"
              marginBottom="1px solid"
              borderColor="blue.600"
              placeholder="Data de Fabricação"
              type="date"
              mb="4"
              {...register("made")}
              error={errors.made?.message}
            />
            <Text color="red.600" fontSize={13} h={5}>
              {errors.made?.message}
            </Text>
          </Box>
          <Box flexDir="column" width={{ base: "100%", sm: "100%", md: "45%" }}>
            <Select
              variant="flushed"
              marginTop={{ base: "4", sm: "4", md: "5" }}
              placeholder="Categoria"
              {...register("category")}
            >
              <option value="Matéria-Prima">Matéria Prima</option>
              <option value="Produto Acabado">Produto Acabado</option>
              <option value="Produtos em Processo">Produtos em Processo</option>
              <option value="Embalagem">Embalagem</option>
              <option value="Outros">Outros</option>
            </Select>
            <Text color="red.600" fontSize={13} h={5}>
              {errors.category?.message}
            </Text>
          </Box>
          <Box
            margin="20px auto"
            flexDir="column"
            width={{ base: "100%", sm: "100%", md: "45%" }}
          >
            <Select
              variant="flushed"
              placeholder="Classe"
              {...register("class")}
            >
              {allClasses.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </Select>
            <Text color="red.600" fontSize={13} h={5}>
              {errors.class?.message}
            </Text>
          </Box>
        </Flex>
        <Button
          marginTop={{ base: "4", sm: "4", md: "5" }}
          variant="default"
          w="fit-content"
          type="submit"
        >
          Cadastrar Amostra
        </Button>
        <Box width="100%" margin="0 auto" textAlign="center"></Box>
      </Flex>
    </div>
  );
};

export default NewSamples;
