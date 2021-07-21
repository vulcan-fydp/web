import { Navbar } from "components/Navbar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Stack, Heading, Text, Input, Button } from "@chakra-ui/react";

// TODO: possibly pull these out into the theme
const INPUT_WIDTH = "300px";
const FORM_TOP_PADDING = "48px";

export const Home = () => {
  return (
    <Box
      background="linear-gradient(132.85deg, #30292F 0%, #413F54 100%);"
      alignItems="center"
      padding="0 20px 100px 20px"
      minHeight="100vh"
    >
      <Navbar />
      <Stack spacing="40px" alignItems="center" paddingTop="100px">
        <Heading size="4xl" textAlign="center" maxWidth="675px">
          Play with your friends
          <Text as="span" color="#9F7AEA">
            {" anywhere."}
          </Text>
        </Heading>
        <Heading size="md" textAlign="center">
          Vulcan makes it simple to play the
          <Text as="span" color="#FFF275">
            {" Nintendo Switch "}
          </Text>
          with your friends.
        </Heading>
      </Stack>
      {/* <MailingListForm /> */}
      <JoinRoomForm />
    </Box>
  );
};

const MailingListForm = () => {
  const [email, setEmail] = useState("");
  return (
    <Stack spacing="32px" alignItems="center">
      <Heading as="h3" size="md" textAlign="center">
        Sign up for our mailing list to catch our latest updates!
      </Heading>
      <Input
        placeholder="Email"
        variant="Filled"
        bg="black"
        color="white"
        w={INPUT_WIDTH}
        sz="lg"
        marginRight="24px"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      ></Input>
      <Button
        w="100px"
        sz="lg"
        bg="#9F7AEA"
        color="white"
        marginTop="-0.5"
        onClick={() => {
          // Todo: Add email to db
        }}
      >
        Submit
      </Button>
    </Stack>
  );
};

const JoinRoomForm = () => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  return (
    <Stack paddingTop={FORM_TOP_PADDING} spacing="16px" alignItems="center">
      <Input
        placeholder="Nickname"
        variant="Filled"
        bg="black"
        color="white"
        w={INPUT_WIDTH}
        sz="lg"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      ></Input>
      <Input
        placeholder="Room Code"
        variant="Filled"
        bg="black"
        color="white"
        w={INPUT_WIDTH}
        sz="lg"
        value={roomId}
        onChange={(event) => {
          setRoomId(event.target.value);
        }}
      ></Input>
      <Link to={`/room/${roomId}/stream`}>
        <Button w="100px" sz="lg" bg="#9F7AEA" color="white" marginTop="-0.5">
          Play
        </Button>
      </Link>
    </Stack>
  );
};
