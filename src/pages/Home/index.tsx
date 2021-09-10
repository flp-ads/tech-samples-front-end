import { Heading, Button, Box, Input, UnorderedList, ListItem } from "@chakra-ui/react";

import Flask from "../../assets/home_flask.svg";
import Screen from "../../assets/home_screen.svg";
import MobileBG from "../../assets/home_back_mobile.jpg";
import Or from "../../assets/home_or.png";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Link } from "react-router-dom";
import { GlobalHeader } from "../../components/GlobalHeader";

const Home = () => {

  const formSchema = yup.object().shape({
    username: yup
        .string()
        .required('Usuário obrigatório'),
    password: yup
        .string()
        .required('Senha obrigatória')
  })

  const { register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(formSchema)
  })

  const onFormSubmit = ( ) => {
    
  }

  return (
    <div>
      {/* MOBILE */}
      <Box
        display={{ base: "flex", sm: "flex", md: "none" }}
        flexFlow='column nowrap'>

        <GlobalHeader>
          <Link to="">Pesquisar Análise</Link>
          <Link to="/aboutUs">Sobre Nós</Link>
        </GlobalHeader>

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
          padding='128px 0px'
          textAlign='center'
          bgImage={MobileBG}
          bgSize='cover'>

          <Box
            bgColor='gray.50'
            w='280px'
            boxShadow='0px 0px 20px rgba(0, 0, 0, 0.1)'
            borderRadius='3xl'
            p='10px'>

            <Heading variant='h4' mb='8'>
              Digite suas credenciais
            </Heading>

            <Input
              variant='flushed'
              marginBottom='1px solid'
              borderColor='blue.600'
              placeholder='Usuário'
              mb='4'/>

            <Input
              variant='flushed'
              marginBottom='1px solid'
              borderColor='blue.600'
              placeholder='Senha'
              mb='4'/>

            <Box
              display='flex'
              flexFlow='column nowrap'
              alignItems='center'
              justifyContent='center'>

              <Button w='260px' variant='default' mb='4' mt='4'>
                Entrar
              </Button>

              <img width='32px' src={Or} alt='frasco'></img>

              <Button w='260px' variant='default' mb='4' mt='4'>
                Pesquise uma amostra
              </Button>
            </Box>
          </Box>
        </Box>

        <Box
          display='flex'
          flexFlow='column nowrap'
          alignItems='left'
          justifyContent='center'
          padding='16px'
          textAlign='center'
          bg='blue.300'>
          
          <Heading variant='h4' mb='4' color='gray.50' stroke='1px black'>
            Por quê a TechSamples?
          </Heading>

          <UnorderedList
            color='gray.50'
            textAlign='left'>

            <ListItem>Agilidade</ListItem>
            <ListItem>Disponibilidade</ListItem>
            <ListItem>Garantia de resultados</ListItem>
            <ListItem>Confidenciabilidade</ListItem>
            
          </UnorderedList>
        </Box>

      </Box>

      {/* DESKTOP */}
      <Box
        display={{ base: "none", sm: "none", md: "flex" }}
        flexFlow='column nowrap'>

        
        <GlobalHeader>
          <Link to="">Pesquisar Análise</Link>
          <Link to="/aboutUs">Sobre Nós</Link>
        </GlobalHeader>


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
    </div>
  );
};

export default Home;
