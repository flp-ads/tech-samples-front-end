import { Heading, Button, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";

const Home = () => {

  return (
    <div>
      <NavBar>
        <Link to='/aboutUs'>Sobre Nós</Link>
        <Link to='/searchSample'>Pesquisar Análises</Link>
      </NavBar>
      <Box boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)" borderRadius="3xl" p="4" textAlign="center" width='50%'>
        <Heading variant="h1">teste</Heading>
        <Button variant="default">Welcome</Button>
      </Box>
    </div>
  );
};

export default Home;
