import { Flex, Spacer, Box, Heading } from "@chakra-ui/react";

interface NavbarProps {
  children?: null;
}

export const Navbar: React.FC<NavbarProps> = ({ children }) => {
  return (
    <Flex
      alignItems="center"
      maxWidth="1000px"
      margin="0 auto"
      padding="40px 20px 0 20px"
      h="50px"
    >
      <Box>
        <Heading size="3xl">V</Heading>
      </Box>
      <Spacer />
      {children !== undefined ? children : <DefaultNavbarContent />}
    </Flex>
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
