import {
  Flex,
  Spacer,
  Box,
  Heading,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

export const Navbar = () => (
  <Flex maxWidth="1000px" margin="0 auto" paddingTop="40px">
    <Box>
      <Heading size="3xl">V</Heading>
    </Box>
    <Spacer />
    <Box>
      <ButtonGroup>
        <Button color="white" colorScheme="whitealpha" variant="ghost">
          Blog
        </Button>
        <Button color="white" colorScheme="whitealpha" variant="ghost">
          Sign in
        </Button>
      </ButtonGroup>
    </Box>
  </Flex>
);
