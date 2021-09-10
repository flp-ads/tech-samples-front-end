import { Heading, Button, Box } from "@chakra-ui/react";

import Flask from "../../assets/home_flask.svg";
import Screen from "../../assets/home_screen.svg";
import MobileBG from "../../assets/home_back_mobile.jpg";

const Home = () => {
    return (
        <div>
            {/* <Box boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)" borderRadius="3xl" p="4">
        <Heading variant="h1">teste</Heading>
        <Button variant="disabled">Welcome</Button>
      </Box> */}

            {/* Aqui vai o Header */}
            <Box
                display='flex'
                flexFlow='column nowrap'
                alignItems='center'
                justifyContent='center'
                padding='16px'
                textAlign='center'
                bg='blue.300'>

                <Heading variant='h1' marginBottom='8'>
                    Otimização de processos com inteligência e tecnologia
                </Heading>

                <Box
                    display='flex'
                    flexFlow='row nowrap'
                    alignItems='center'
                    justifyContent='center'>
                    <img width='120px' src={Flask} alt='frasco'></img>
                    <img width='120px' src={Screen} alt='tela'></img>
                </Box>
            </Box>

            <Box
                display='flex'
                flexFlow='column nowrap'
                alignItems='center'
                justifyContent='center'
                padding='16px'
                textAlign='center'
                bgImage={MobileBG}>

                <Box
                    boxShadow='0px 0px 20px rgba(0, 0, 0, 0.1)'
                    borderRadius='3xl'
                    p='4'>
                </Box>
            </Box>
            
            <div className='middleContainer'>
                <Box
                    boxShadow='0px 0px 20px rgba(0, 0, 0, 0.1)'
                    borderRadius='3xl'
                    p='4'></Box>
            </div>
        </div>
    );
};

export default Home;
