import { Heading, Button, Box, Input, UnorderedList, ListItem } from "@chakra-ui/react";

import Flask from "../../assets/home_flask.svg";
import Screen from "../../assets/home_screen.svg";
import MobileBG from "../../assets/home_back_mobile.jpg";
import DesktopBG from "../../assets/home_back.jpg";
import Or from "../../assets/home_or.png";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Link } from "react-router-dom";
import { GlobalHeader } from "../../components/GlobalHeader";

interface IFormData {
  username: string,
  password: string,
}

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

  const onFormSubmit = ( formData: IFormData ) => {
    console.log( formData )
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

        {/* UPPER */}
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


        {/* MIDDLE */}
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
            boxShadow='0px 0px 20px  rgba(0, 0, 0, 0.5)'
            borderRadius='3xl'
            p='10px'>

            <Heading variant='h4' mb='8'>
              Digite suas credenciais
            </Heading>

            <form
              id='mobile_form'
              onSubmit={handleSubmit(onFormSubmit)}>

              <Input
                variant='flushed'
                marginBottom='1px solid'
                borderColor='blue.600'
                placeholder='Usuário'
                mb='4'
                {...register('username')}
                error={errors.username?.message}/>

              <Input
                variant='flushed'
                marginBottom='1px solid'
                borderColor='blue.600'
                placeholder='Senha'
                mb='4'
                {...register('password')}
                error={errors.password?.message}/>
            </form>

            <Box
              display='flex'
              flexFlow='column nowrap'
              alignItems='center'
              justifyContent='center'>

              <Button w='260px' variant='default' mb='4' mt='4' form='mobile_form' type='submit'>
                Entrar
              </Button>

              <img width='32px' src={Or} alt='frasco'></img>

              <Button w='260px' variant='default' mb='4' mt='4'>
                Pesquise uma amostra
              </Button>
            </Box>
          </Box>
        </Box>


        {/* LOWER */}
        <Box
          display='flex'
          flexFlow='column nowrap'
          alignItems='center'
          justifyContent='center'
          padding='16px'
          textAlign='center'
          bg='blue.300'
          pb='8'>
          
          <Heading as='h1' mb='4' color='gray.50'>
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

        {/* MAIN */}
        <Box
          minH='calc(100vh - 70px)'
          display='flex'
          flexFlow='row nowrap'
          alignItems='center'
          justifyContent='center'
          bgImage={DesktopBG}
          bgSize='cover'
          p='30px'>
          
          {/* LEFT */}
          <Box
            flex='1'
            display='flex'
            flexFlow='column nowrap'
            alignItems='center'
            justifyContent='center'>
              

              <Box
                display='flex'
                flexFlow='column nowrap'
                alignItems='center'
                justifyContent='center'
                mb='32'>

                <Heading as='h1' marginBottom='8' textAlign='center'>
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
                justifyContent='center'>

                <Heading as='h2' mb='4' color='gray.50' textAlign='center'>
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
          
          {/* RIGHT */}
          <Box
            flex='1'
            display='flex'
            flexFlow='column nowrap'
            alignItems='center'
            justifyContent='center'>
            

            {/* FORM */}
            <Box
              display='flex'
              flexFlow='column nowrap'
              alignItems='center'
              justifyContent='center'
              bgColor='gray.50'
              w='350px'
              boxShadow='0px 0px 20px  rgba(0, 0, 0, 0.5)'
              borderRadius='3xl'
              p='24px'
              h='600px'>

              <Heading variant='h4' mb='12' textAlign='center'>
                Digite suas credenciais
              </Heading>


              {/* FORM CONTAINER */}

              <Box
                display='flex'
                flexFlow='column nowrap'
                alignItems='center'
                justifyContent='center'
                maxW='260px'>

                <form
                  id='desk_form'
                  onSubmit={handleSubmit(onFormSubmit)}>

                  <Input
                    variant='flushed'
                    marginBottom='1px solid'
                    borderColor='blue.600'
                    placeholder='Usuário'
                    mb='4'
                    {...register('username')}
                    error={errors.username?.message}/>

                  <Input
                    variant='flushed'
                    marginBottom='1px solid'
                    borderColor='blue.600'
                    placeholder='Senha'
                    mb='12'
                    {...register('password')}
                    error={errors.password?.message}/>
                </form>
              </Box>

              <Box
                display='flex'
                flexFlow='column nowrap'
                alignItems='center'
                justifyContent='center'>

                <Button w='260px' variant='default' mb='4' mt='4' form='desk_form' type='submit'>
                  Entrar
                </Button>

                <img width='32px' src={Or} alt='frasco'></img>

                <Button w='260px' variant='default' mb='4' mt='4'>
                  Pesquise uma amostra
                </Button>
              </Box>
            </Box>
              
          </Box>

        </Box>
       

      </Box>
    </div>
  );
};

export default Home;
