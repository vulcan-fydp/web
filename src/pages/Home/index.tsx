import * as React from "react";
import {
  Center,
  Flex,
  Spacer,
  Box,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

const NavBar = () => (
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

export const Home = () => (
  <Box
    background="linear-gradient(132.85deg, #30292F 0%, #413F54 100%);"
    h="100vh"
    alignItems="center"
  >
    <NavBar />
    <Stack spacing="32px" alignItems="center" paddingTop="100px">
      <Heading as="h1" size="4xl" textAlign="center" maxWidth="675px">
        Play with your friends{" "}
        <Text as="span" color="#9F7AEA">
          anywhere.
        </Text>
      </Heading>
      <Box>
        <Heading as="h3" size="md" textAlign="center">
          Vulcan makes it simple to play the
          <Text as="span" color="#FFF275">
            {" "}
            Nintendo Switch{" "}
          </Text>
          with your friends.
        </Heading>
        <Heading as="h3" size="md" textAlign="center">
          Sign up for our mailing list to catch our latest updates.{" "}
        </Heading>
      </Box>
      <Input
        placeholder="Email"
        variant="Filled"
        bg="black"
        color="white"
        w="300px"
        sz="lg"
      ></Input>
      <Button w="100px" sz="lg" bg="#9F7AEA" color="white">
        Submit
      </Button>
    </Stack>
  </Box>
);
