import { Heading, Button, Box } from "@chakra-ui/react";

const Home = () => {
  return (
    <div>
      <Box boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)" borderRadius="3xl" p="4">
        <Heading variant="h1">teste</Heading>
        <Button variant="disabled">Welcome</Button>
      </Box>
    </div>
  );
};

export default Home;
