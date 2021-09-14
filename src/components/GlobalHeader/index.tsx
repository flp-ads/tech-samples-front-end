import { HamburgerIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuList } from "@chakra-ui/menu";
import { ReactNode } from "react";
import logo from "../../assets/icons/logo_desktop.svg";
import logoMobile from "../../assets/icons/logo_mobile.svg";

interface NavBarProps {
  children: ReactNode;
}

export const GlobalHeader = ({ children }: NavBarProps) => {
  return (
    <Flex
      bg="blue.700"
      height="70px"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box
        color="white"
        marginLeft="5"
        display={{ base: "none", sm: "none", md: "flex" }}
      >
        <Image src={logo} alt="logo" boxSize="250px" />
      </Box>
      <Box
        color="white"
        marginLeft="5"
        display={{ base: "flex", sm: "flex", md: "none" }}
      >
        <Image src={logoMobile} alt="logo" boxSize="50px" />
      </Box>
      <Flex
        color="white"
        alignItems="center"
        height="fit-content"
        width="30%"
        justifyContent="space-evenly"
        fontFamily="heading"
        fontWeight="semibold"
        fontSize="sm"
        marginRight={{ base: "0", sm: "0", md: "5" }}
        
      >
        <Flex
          display={{ base: "none", sm: "none", md: "flex" }}
          w="100%"
          justifyContent="space-evenly"
          textAlign="center"
          alignItems='center'
        >
          {children}
        </Flex>
        <Menu autoSelect={false}>
          <MenuButton
            as={Box}
            variant="outline"
            _hover={{ bg: "blue.600" }}
            display={{ base: "block", sm: "block", md: "none" }}
          >
            <HamburgerIcon w="6" h="6" outline="none" />
          </MenuButton>
          <MenuList
            as={Flex}
            bg="blue.700"
            _selected={{ bg: "blue.600" }}
            flexDirection="column"
            paddingLeft='2'
          >
            {children}
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default GlobalHeader;
