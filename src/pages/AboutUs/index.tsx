import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";

const AboutUs = () => {

  return (
    <div>
      <NavBar>
        <Link to='/'>Home</Link>
      </NavBar>
      {/* <Box boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)" borderRadius="3xl" p="4" textAlign="center">
        <Heading variant="h1">teste</Heading>
        <Button variant="disabled">Welcome</Button>
      </Box> */}
    </div>
  );
};

export default AboutUs;