import { Flex, Input, Select, Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import GlobalHeader from "../../components/GlobalHeader";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAllClass } from "../../providers/AllClass";
import { useEffect, useState } from "react";

interface IClass {
  name: string;
  id: number;
  userId: number;
}

interface FormProps {
  name: string;
  lote: number;
  fabrication: Date;
  category: string;
  class: IClass;
}

const NewSamples = () => {
  const { allClasses, getAllClasses } = useAllClass();
  const [classe, setClasse] = useState<IClass[]>([] as IClass[]);

  const handleClass = (className: string) => {
    const newClass = allClasses.filter((item) => item.name === className);
    setClasse(newClass);
  };

  useEffect(() => {
    getAllClasses();
  }, [allClasses]);

  const formSchema = yup.object().shape({
    name: yup.string().required(),
    batch: yup.number().required(),
    made: yup.date().required(""),
    category: yup.string().required(""),
    class: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onFormSubmit = (formData: FormProps) => {
    console.log(formData);
  };

  return (
    <div>
      <GlobalHeader>
        <Link to="/analyses">Cadastrar Amostra</Link>
        <Link to="/">Analisar Amostra</Link>
        <Link to="/">Pesquisar Amostra</Link>
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
          <Input
            marginTop={{ base: "4", sm: "4", md: "5" }}
            width={{ base: "100%", sm: "100%", md: "45%" }}
            variant="flushed"
            marginBottom="1px solid"
            borderColor="blue.600"
            placeholder="Nome da Amostra"
            mb="4"
            {...register("name")}
            error={errors.name?.message}
          />
          <Input
            marginTop={{ base: "4", sm: "4", md: "5" }}
            width={{ base: "100%", sm: "100%", md: "45%" }}
            variant="flushed"
            marginBottom="1px solid"
            borderColor="blue.600"
            placeholder="Nº do Lote"
            mb="4"
            {...register("batch")}
            error={errors.batch?.message}
          />
          <Input
            marginTop={{ base: "4", sm: "4", md: "5" }}
            width={{ base: "100%", sm: "100%", md: "45%" }}
            variant="flushed"
            marginBottom="1px solid"
            borderColor="blue.600"
            placeholder="Data de Fabricação"
            type="date"
            mb="4"
            {...register("made")}
            error={errors.made?.message}
          />
          <Select
            variant="flushed"
            marginTop={{ base: "4", sm: "4", md: "5" }}
            width={{ base: "100%", sm: "100%", md: "45%" }}
            placeholder="Categoria"
            {...register("category")}
          >
            <option value="Matéria-Prima">Matéria Prima</option>
            <option value="Produto Acabado">Produto Acabado</option>
            <option value="Produtos em Processo">Produtos em Processo</option>
            <option value="Embalagem">Embalagem</option>
            <option value="Outros">Outros</option>
          </Select>
          <Select
            variant="flushed"
            margin="20px auto"
            width={{ base: "100%", sm: "100%", md: "50%" }}
            placeholder="Classe"
            {...register("class")}
            onChange={(e) => handleClass(e.target.value)}
          >
            {allClasses.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </Select>
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
