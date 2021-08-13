import { Flex, Link, Center, Box, Text, Button } from "@chakra-ui/react";
import { useUserQuery } from "pages/room/JoinOrHostRoom/user.backend.generated";
import { Link as RouterLink, useHistory } from "react-router-dom";

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
        alignItems="center"
        w="100%"
        maxWidth="1040px"
        padding="0 20px"
      >
        <Box>
          <Link as={RouterLink} to="/">
            <Text fontSize="32px" color="purple.400" fontWeight="bold">
              V
            </Text>
          </Link>
        </Box>
        {/* <Box flex="1 auto" /> */}
        {children !== undefined ? children : <DefaultNavbarContent />}
      </Flex>
    </Center>
  );
};

export const DefaultNavbarContent = () => {
  const { data, loading } = useUserQuery();
  const history = useHistory();

  if (loading || !data) {
    return null;
  }

  if (data?.user == null) {
    return (
      <Button
        onClick={() => {
          history.push("/login");
        }}
      >
        Login
      </Button>
    );
  }

  return null;
};
