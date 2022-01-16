import { Navbar } from "components/Navbar";
import { Box, Stack, Heading, Text, Input, Button } from "@chakra-ui/react";
import { JoinRoomForm } from "components/JoinRoomForm";

export const Home = () => {
  return (
    <Box
      backgroundColor="black"
      alignItems="center"
      padding="0 20px 100px 20px"
      minHeight="100vh"
    >
      <Navbar />
      <Stack spacing="40px" alignItems="center" paddingTop="100px" mb="40px">
        <Text variant="heading1" w="675px">
          Play with your friends
          <Text as="span" color="brightPurple.400">
            {" anywhere."}
          </Text>
        </Text>
        <Heading size="md" textAlign="center">
          Vulcan makes it simple to play the
          <Text as="span" color="yellow">
            {" Nintendo Switch "}
          </Text>
          with your friends.
        </Heading>
      </Stack>
      <JoinRoomForm />
    </Box>
  );
};
