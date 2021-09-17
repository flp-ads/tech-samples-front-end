import { Button, Input, Flex, Select, Text } from "@chakra-ui/react";
import { useClass } from "../../providers/Class";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useRef } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface INewParamsForm {
  an_name: string;
  name: string;
  unit: string;
  vmin: string;
  vmax: string;
}

const AdminClassNewParams = () => {
  const { id } = useParams<{ id: string }>();
  const {
    classAnalyses,
    fetchClass,
    resetClass,
    addClassTypeParams,
    updateTrigger,
  } = useClass();

  const RefReset = useRef(resetClass);
  const RefFetch = useRef(fetchClass);

  useEffect(() => {
    RefFetch.current(id);

    return RefReset.current;
  }, [id, updateTrigger]);

  const formSchema = yup.object().shape({
    an_name: yup.string().required("Campo obrigatório"),
    name: yup.string().required("Campo obrigatório"),
    unit: yup.string().required("Campo obrigatório"),
    vmin: yup.string().required("Campo obrigatório"),
    vmax: yup.string().required("Campo obrigatório"),
  });
  const history = useHistory();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onFormSubmit = (formData: INewParamsForm) => {
    addClassTypeParams(id, formData);
  };

  return (
    <Flex flexFlow="column nowrap" justifyContent="center" alignItems="center">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Flex
          mb="8"
          flexFlow="column nowrap"
          justifyContent="center"
          alignItems="center"
        >
          <Select
            variant="flushed"
            marginBottom="1px solid"
            borderColor="blue.600"
            placeholder="Tipo de análise"
            {...register("an_name")}
            error={errors.an_name?.message}
          >
            {!!classAnalyses.length &&
              classAnalyses.map((item) => (
                <option key={item.an_name} value={item.an_name}>
                  {item.an_name}
                </option>
              ))}
          </Select>
          <Text color="red.600" fontSize={13} h={5}>
            {errors.an_name?.message}
          </Text>

          <Input
            variant="flushed"
            marginBottom="1px solid"
            borderColor="blue.600"
            placeholder="Nome"
            {...register("name")}
            error={errors.name?.message}
          />
          <Text color="red.600" fontSize={13} h={5}>
            {errors.name?.message}
          </Text>
          <Input
            variant="flushed"
            marginBottom="1px solid"
            borderColor="blue.600"
            placeholder="Unidade"
            {...register("unit")}
            error={errors.unit?.message}
          />
          <Text color="red.600" fontSize={13} h={5}>
            {errors.unit?.message}
          </Text>
          <Input
            variant="flushed"
            marginBottom="1px solid"
            borderColor="blue.600"
            placeholder="Valor mínimo"
            {...register("vmin")}
            error={errors.vmin?.message}
          />
          <Text color="red.600" fontSize={13} h={5}>
            {errors.vmin?.message}
          </Text>
          <Input
            variant="flushed"
            marginBottom="1px solid"
            borderColor="blue.600"
            placeholder="Valor máximo"
            {...register("vmax")}
            error={errors.vmax?.message}
          />
          <Text color="red.600" fontSize={13} h={5}>
            {errors.vmax?.message}
          </Text>
          <Button type="submit" variant="default" mt="8">
            Cadastrar
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default AdminClassNewParams;
