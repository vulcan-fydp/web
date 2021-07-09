import {
  Stack,
  Heading,
  Box,
  Text,
  Button,
  ButtonGroup,
  Center,
  Spinner,
  Input,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { useCreateRoomMutation } from "./dashboard.generated";
import { Link } from "react-router-dom";

import vulcast from "./vulcast.png";
import copy from "./copy.png";

// TODO: Cleanup
const INPUT_WIDTH = "300px";

export const Dashboard = () => {
  const [showDashboard, setShowDashboard] = useState(true);
  return (
    <Center
      background="linear-gradient(132.85deg, #30292F 0%, #413F54 100%);"
      alignItems="center"
      padding="0 20px 100px 20px"
      minHeight="100vh"
    >
      {showDashboard ? <DashboardImpl /> : <PreDashboard />}
    </Center>
  );
};

const DashboardImpl = () => {
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
  const roomTabs = [<PlayerTab />, <ControllerTab />, <StreamTab />];

  return (
    <Stack spacing="40px" alignItems="left" paddingTop="100px">
      <DashboardHeader />
      <TabButtons />
      {roomTabs[0]}
      {/* <Heading size="lg" textAlign="center" minWidth="80vw">
        <Text as="span" color="#AEAEAE">
          {roomCode === ""
            ? "Start a room to start playing with your friends."
            : "Room code: "}
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
              setRoomCode("vulcan.play/room/pink-bear-porcupine");
            } else {
              // TODO: call api to close the room
              setRoomCode("");
            }
          }}
        >
          {roomCode === "" ? "Start a room" : "Close Room"}
        </Button>
        )} */}
    </Stack>
  );
};

const PreDashboard = () => {
  const [vulcastLinked, setVulcastLinked] = useState(true);

  return (
    <Stack direction="row" spacing="240px">
      {vulcastLinked ? <CreateRoom /> : <LinkVulcast />}
      <JoinRoom />
    </Stack>
  );
};

const DashboardHeader = () => {
  return (
    <Stack direction="row">
      <RoomDetails />
      <EndRoom />
    </Stack>
  );
};

const CopyIcon = <Image src={copy}></Image>;
const RoomDetails = () => {
  const roomLink = "vulcan.play/pink-bear-porcupine";

  return (
    <Stack direction="row">
      <Image src={vulcast} />
      <Stack>
        <Heading as="h3" size="medium">
          Send this link to people who you want to play with.
        </Heading>
        <Button
          sz="lg"
          bg="#9F7AEA"
          color="white"
          marginTop="-0.5"
          rightIcon={CopyIcon}
          _hover={{ bg: "#733BE7" }}
        >
          {roomLink}
        </Button>
      </Stack>
    </Stack>
  );
};

const EndRoom = () => {
  const [isHost, setIsHost] = useState(true);
  return (
    <Stack spacing="40px" alignItems="center" paddingTop="34px">
      <Button
        sz="lg"
        bg="#9F7AEA"
        color="white"
        marginTop="-0.5"
        _hover={{ bg: "#733BE7" }}
      >
        {isHost ? "End Room" : "Leave Room"}
      </Button>
    </Stack>
  );
};

const TabButtons = () => {
  return (
    <Box align="left">
      <ButtonGroup>
        <Button
          sz="lg"
          bg="#9F7AEA"
          color="white"
          marginTop="-0.5"
          _hover={{ bg: "#733BE7" }}
        >
          Players
        </Button>
        <Button
          sz="lg"
          bg="#9F7AEA"
          color="white"
          marginTop="-0.5"
          _hover={{ bg: "#733BE7" }}
        >
          Controller Settings
        </Button>
        <Button
          sz="lg"
          bg="#9F7AEA"
          color="white"
          marginTop="-0.5"
          _hover={{ bg: "#733BE7" }}
        >
          Game Stream
        </Button>
      </ButtonGroup>
    </Box>
  );
};

const PlayerTab = () => {
  return (
    <Box>
      <Heading as="h3" size="md">
        Connected Players
      </Heading>
    </Box>
  );
};
const Player = () => {
  return (
    <Box borderWidth="2px" borderColour="white">
      <Heading as="h3" size="md">
        Connected Players
      </Heading>
    </Box>
  );
};

const ControllerTab = () => {
  return <Box></Box>;
};

const StreamTab = () => {
  return <Box></Box>;
};

const LinkVulcast = () => {
  return (
    <Stack spacing="40px" alignItems="center">
      <Heading as="h3" size="lg">
        Link your Vulcast
      </Heading>
      <Button
        w="200px"
        sz="lg"
        bg="#9F7AEA"
        color="white"
        marginTop="-0.5"
        onClick={() => {
          // Call backend to start the room
          // IF ready:
          //   setShowDashboard(true)
          // ELSE:
          //   return an error modal
        }}
      >
        Link Vulcast
      </Button>
    </Stack>
  );
};

const CreateRoom = () => {
  return (
    <Stack spacing="40px" alignItems="center">
      <Heading as="h3" size="lg">
        Host a room
      </Heading>
      <Button w="200px" sz="lg" bg="#9F7AEA" color="white" marginTop="-0.5">
        Start Room
      </Button>
    </Stack>
  );
};

const JoinRoom = () => {
  const [roomCode, setRoomCode] = useState("");
  const [name, setName] = useState("");
  return (
    <Stack spacing="40px" alignItems="center">
      <Heading as="h3" size="lg">
        Join a room
      </Heading>
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
        value={roomCode}
        onChange={(event) => {
          setRoomCode(event.target.value);
        }}
      ></Input>
      <Link to={`/room/${roomCode}`}>
        <Button w="200px" sz="lg" bg="#9F7AEA" color="white" marginTop="-0.5">
          Join Room
        </Button>
      </Link>
    </Stack>
  );
};
