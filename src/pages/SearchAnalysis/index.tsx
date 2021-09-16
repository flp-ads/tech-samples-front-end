import { Flex, Input, Select, Button, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GlobalHeader } from "../../components/GlobalHeader";
import { useAllClass } from "../../providers/AllClass";
import CardDescription from "../../components/Cards/CardDescription";
import { useAnalyses } from "../../providers/Analyses";
import { useHistory } from "react-router-dom";

interface IAnalysis {
  name: string;
  batch: string;
  made: string;
  category: string;
  class: string;
  analyses: [];
  isConcluded: boolean;
  userId: number;
  id: number;
}

const SearchAnalysis = () => {
  const { allClasses, getAllClasses } = useAllClass();
  const { analyses, getAllAnalyses, setIdNumber} = useAnalyses()

  const [errorMsg, setErrorMsg] = useState<boolean>(false);

  const [filtredAnalysis, setFilteredAnalysis] = useState<IAnalysis[]>(
    [] as IAnalysis[]
  );

  const [sampleNameInput, setSampleNameInput] = useState<string>("");
  const [batchInput, setBatchInput] = useState<string>("");
  const [dateInput, setDateInput] = useState<string>("");
  const [idInput, setIdInput] = useState<string>("");
  const [categoryInput, setCategoryInput] = useState<string>("");
  const [classInput, setClassInput] = useState<string>("");
  console.log(dateInput);

  const filterSearch = (
    sampleNameInput: string,
    batchInput: string,
    dateInput: string,
    idInput: string,
    categoryInput: string,
    classInput: string
  ) => {
    const newFiltredAnalysis = analyses.filter(
      (item) =>
        item.name === sampleNameInput ||
        item.batch === batchInput ||
        item.made === dateInput ||
        item.id === Number(idInput) ||
        item.category === categoryInput ||
        item.class === classInput
    );
    if (newFiltredAnalysis.length === 0) {
      setErrorMsg(true);
      setFilteredAnalysis([]);
    } else {
      setErrorMsg(false);
      setFilteredAnalysis(newFiltredAnalysis);
    }
  };

  useEffect(() => {
    getAllAnalyses();
    getAllClasses();
  }, []); //eslint-disable-line

  const history = useHistory()

  const handlePrint = (id: number) => {
    setIdNumber(id);
    history.push(`/certificate/${id}`)
  }

  return (
    <div>
      <GlobalHeader>
        <Link to="/">Login</Link>
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
      >
        <Box
          fontSize="2xl"
          fontWeight="semibold"
          width="100%"
          margin="0 auto"
          textAlign="center"
        >
          Bem vindo! Por gentileza, utilize um dos filtros abaixo
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
            value={sampleNameInput}
            onChange={(e) => setSampleNameInput(e.target.value)}
          />
          <Input
            marginTop={{ base: "4", sm: "4", md: "5" }}
            width={{ base: "100%", sm: "100%", md: "45%" }}
            variant="flushed"
            marginBottom="1px solid"
            borderColor="blue.600"
            placeholder="Nº do Lote"
            mb="4"
            value={batchInput}
            onChange={(e) => setBatchInput(e.target.value)}
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
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
          />
          <Input
            marginTop={{ base: "4", sm: "4", md: "5" }}
            width={{ base: "100%", sm: "100%", md: "45%" }}
            variant="flushed"
            marginBottom="1px solid"
            borderColor="blue.600"
            placeholder="ID da Análise"
            type="text"
            mb="4"
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
          />
          <Select
            variant="flushed"
            marginTop={{ base: "4", sm: "4", md: "5" }}
            width={{ base: "100%", sm: "100%", md: "45%" }}
            placeholder="Categoria"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
          >
            <option value="Matéria-Prima">Matéria Prima</option>
            <option value="Produto Acabado">Produto Acabado</option>
            <option value="Produtos em Processo">Produtos em Processo</option>
            <option value="Embalagem">Embalagem</option>
            <option value="Outros">Outros</option>
          </Select>
          <Select
            variant="flushed"
            marginTop={{ base: "4", sm: "4", md: "5" }}
            width={{ base: "100%", sm: "100%", md: "45%" }}
            placeholder="Classe"
            value={classInput}
            onChange={(e) => setClassInput(e.target.value)}
          >
            {allClasses.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </Select>
        </Flex>
        <Button
          marginTop={{ base: "4", sm: "4", md: "10" }}
          variant="default"
          w="fit-content"
          onClick={() => {
            filterSearch(
              sampleNameInput,
              batchInput,
              dateInput,
              idInput,
              categoryInput,
              classInput
            );
            setSampleNameInput("");
            setBatchInput("");
            setDateInput("");
            setIdInput("");
            setCategoryInput("");
            setClassInput("");
          }}
        >
          Pesquisar Amostra
        </Button>
      </Flex>
      {filtredAnalysis.length > 0 ? (
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
        >
          {filtredAnalysis.map((item) => (
            <CardDescription
              key={item.id}
              category={item.category}
              class={item.class}
              batch={item.batch}
              id={item.id}
              made={item.made}
              name={item.name}
              concluded={item.isConcluded}
            >
              <Button variant="sucess" onClick={() => handlePrint(item.id)}>Imprimir</Button>
            </CardDescription>
          ))}
        </Flex>
      ) : errorMsg ? (
        <Flex
          boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)"
          borderRadius="3xl"
          p="4"
          w="90vw"
          margin="0 auto"
          textAlign="center"
          flexDirection="column"
          flexWrap="wrap"
          marginTop="5"
          color="red.600"
          fontWeight="semibold"
          fontSize="3xl"
        >
          Amostra Não encontrada
        </Flex>
      ) : null}
    </div>
  );
};

export default SearchAnalysis;
