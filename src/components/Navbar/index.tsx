import { Flex, Link, Center, Box, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import logo from "resources/vulcan-transparent.svg";
interface NavbarProps {
  children?: null;
}

export const Navbar: React.FC<NavbarProps> = ({ children }) => {
  return (
    <Center
      bg="black"
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="calc(100% - 50px)"
    >
      <Flex
        justifyContent="space-between"
        w="100%"
        maxWidth="1000px"
        padding="0 100px"
      >
        <Box>
          <Link as={RouterLink} to="/">
            <Image src={logo} />
          </Link>
        </Box>
        {children !== undefined ? children : <DefaultNavbarContent />}
      </Flex>
    </Center>
  );
};

export const DefaultNavbarContent = () => {
  const isLoggedIn = true;
  if (isLoggedIn) {
    return null;
  } else {
    return null;
  }
};
