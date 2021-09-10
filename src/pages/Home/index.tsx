import { Heading, Button, Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";

const Home = () => {
  return (
    <div>
      <NavBar>
        <Link to="/aboutUs">Sobre Nós</Link>
        <Link to="/searchSample">Pesquisar Análises</Link>
      </NavBar>
      <Flex
        boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)"
        borderRadius="3xl"
        p="4"
        textAlign="center"
        width={[400, 600, "100%"]}
        flexDirection={{base: 'column', md: 'row', lg: "row"}}
      >
        <Box bg='blue.300' w='400px'>box 1 </Box>
        <Box bg='blue.500' w='400px'>Welcome</Box>
      </Flex>
    </div>
  );
};

export default Home;
