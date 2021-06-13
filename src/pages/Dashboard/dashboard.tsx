import { Navbar } from "../Navbar/navbar";
import { Stack, Heading, Text, Button, Flex, Spacer } from "@chakra-ui/react";
import * as React from "react";
import { gql, useMutation } from "@apollo/client";

const INPUT_WIDTH = "300px";
const FORM_TOP_PADDING = "48px";

// const CREATE_ROOM_QUERY = gql`
//   mutation CreateRoom() {
//     createRoom() {
//     }
//   }
// `;

export const Dashboard = () => {
  // const [createRoom, { data }] = useMutation(CREATE_ROOM_QUERY);
  const [roomCode, setRoomCode] = React.useState("");

  return (
    <Flex
      background="linear-gradient(132.85deg, #30292F 0%, #413F54 100%);"
      alignItems="center"
      padding="0 20px 100px 20px"
      minHeight="100vh"
    >
      <Spacer />
      <Stack spacing="40px" alignItems="center" paddingTop="100px">
        <Heading size="2xl" textAlign="center" minWidth="700px">
          <Text as="span" color="#AEAEAE">
            {roomCode === "" ? "All is quiet..." : "Room code: "}
          </Text>
          {roomCode}
        </Heading>
        <Button
          w="150px"
          sz="lg"
          bg="#9F7AEA"
          color="white"
          marginTop="-0.5"
          onClick={() => {
            if (roomCode === "") {
              // Todo: call grapql api w/ apolloClient
              const roomCode = "cat-fire-graph";
              setRoomCode(roomCode);
            } else {
              setRoomCode("");
            }
          }}
        >
          {roomCode === "" ? "Start a room" : "Close Room"}
        </Button>
      </Stack>
      <Spacer />
    </Flex>
  );
};
