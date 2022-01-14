import { Navbar } from "components/Navbar";
import {
  Box,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";
import { JoinRoomForm } from "components/JoinRoomForm";

export const Home = () => {
  return (
    <Flex
      background="linear-gradient(132.41deg, #3E1460 0%, #13041F 100%);"
      alignItems="center"
      minHeight="100vh"
    >
      <Navbar />
      <Flex flexDirection="column" justifyContent="center" flex="2">
        <Stack spacing="40px" alignItems="center">
          <Text variant="heading1" w="600px">
            Play with your friends
            <Text as="span" color="#9F54FF">
              {" anywhere."}
            </Text>
          </Text>
          <Heading size="md">
            Vulcan makes it simple to play the
            <Text as="span" color="#FFEF54">
              {" Nintendo Switch "}
            </Text>
            with your friends.
          </Heading>
          <JoinRoomForm />
        </Stack>
      </Flex>
    </Flex>
  );
};
