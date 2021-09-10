import { Flex, Heading } from "@chakra-ui/layout";
import { ReactNode } from "react";


interface NavBarProps {
    children: ReactNode;
  }

export const NavBar = ({ children, ...rest }: NavBarProps) => {
  return (
    <div>
      <Flex bg="blue.700" height="60px" justifyContent="space-between" alignItems='center'>
        <Heading variant="h1" color="white" marginLeft="5">
          TechSamples
        </Heading>
        <Flex color='white' alignItems='center' height='fit-content' width='30%' justifyContent='space-evenly' fontFamily='heading' fontWeight='semibold'>
          {children}
        </Flex>
      </Flex>
    </div>
  );
};

export default NavBar;
