import { Flex, Link, Center, Box, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

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
            <Text fontSize="32px" color="purple" fontWeight="bold">
              V
            </Text>
          </Link>
        </Box>
        {children !== undefined ? children : <DefaultNavbarContent />}
      </Flex>
    </Center>
  );
};

export const DefaultNavbarContent = () => {
  const isLoggedIn = true;
  // TODO: Add a more polished menu here
  // TODO: Get roomcode from some global store/apollo
  const roomCode = "pink-bear-porcupine";

  const dashboard = (
    <Link as={RouterLink} to={`/room/${roomCode}/stream`}>
      <Text textAlign="center" height="48px" lineHeight="48px" color="white">
        Dashboard
      </Text>
    </Link>
  );
  if (isLoggedIn) {
    return dashboard;
  } else {
    return dashboard;
  }
};
