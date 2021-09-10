import { Image } from "@chakra-ui/image";
import { Flex, Heading } from "@chakra-ui/layout";
import { ReactNode } from "react";
import logo from '../../assets/icons/logo_desktop.svg'


interface NavBarProps {
    children: ReactNode;
  }

export const NavBar = ({ children }: NavBarProps) => {
  return (
    <div>
      <Flex bg="blue.700" height="70px" justifyContent="space-between" alignItems='center'>
        <Heading variant="h1" color="white" marginLeft="5">
          <Image src={logo} alt='logo' boxSize='250px'/>
        </Heading>
        <Flex color='white' alignItems='center' height='fit-content' width='30%' justifyContent='space-evenly' fontFamily='heading' fontWeight='semibold'>
          {children}
        </Flex>
      </Flex>
    </div>
  );
};

export default NavBar;
