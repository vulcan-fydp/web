import {
  Stack,
  Heading,
  Text,
  Button,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { useCreateRoomMutation } from "./dashboard.generated";

export const Dashboard = () => {
  // TODO: hardcode that the user is logged in
  // TODO: vulcastGuid will be passed in as a param
  const vulcastGuid = "guid";
  const [createRoomMutation, { data, loading, error }] = useCreateRoomMutation({
    variables: {
      vulcastGuid: vulcastGuid,
    },
  });
  const [roomCode, setRoomCode] = useState("");

  // Accessing the data
  if (data?.createRoom.__typename === "Room") {
    setRoomCode(data.createRoom.guid);
  }

  return (
    <Center
      background="linear-gradient(132.85deg, #30292F 0%, #413F54 100%);"
      alignItems="center"
      padding="0 20px 100px 20px"
      minHeight="100vh"
    >
      <Stack spacing="40px" alignItems="center" paddingTop="100px">
        <Heading size="xl" textAlign="center" minWidth="80vw">
          <Text as="span" color="#AEAEAE">
            {roomCode === "" ? "All is quiet..." : "Room code: "}
          </Text>
          {roomCode}
        </Heading>
        {loading ? (
          <Spinner />
        ) : (
          <Button
            w="150px"
            sz="lg"
            bg="#9F7AEA"
            color="white"
            marginTop="-0.5"
            onClick={() => {
              if (roomCode === "") {
                createRoomMutation();
              } else {
                // TODO: call api to close the room
                setRoomCode("");
              }
            }}
          >
            {roomCode === "" ? "Start a room" : "Close Room"}
          </Button>
        )}
      </Stack>
    </Center>
  );
};
