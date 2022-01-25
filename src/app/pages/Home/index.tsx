import { DefaultNavbar } from "app/components/Navbar";
import { Box, Stack, Heading, Text } from "@chakra-ui/react";
import { JoinRoomForm } from "app/components/JoinRoomForm";

export const Home = () => {
  return (
    <Box
      background="linear-gradient(132.85deg, #30292F 0%, #413F54 100%);"
      alignItems="center"
      padding="0 20px 100px 20px"
      minHeight="100vh"
    >
      <DefaultNavbar>
        <Stack spacing="40px" alignItems="center" paddingTop="100px" mb="40px">
          <Text variant="heading1" w="675px">
            Play with your friends
            <Text as="span" color="#9F7AEA">
              {" anywhere."}
            </Text>
          </Text>
          <Heading size="md" textAlign="center">
            Vulcan makes it simple to play the
            <Text as="span" color="#FFF275">
              {" Nintendo Switch "}
            </Text>
            with your friends.
          </Heading>
        </Stack>
        <JoinRoomForm />
      </DefaultNavbar>
    </Box>
  );
};
