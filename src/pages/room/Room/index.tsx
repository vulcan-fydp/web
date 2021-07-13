import {
  Stack,
  Heading,
  Box,
  Button,
  ButtonGroup,
  Center,
  Input,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { useCreateRoomMutation } from "./dashboard.generated";
import { Link } from "react-router-dom";
import { PlayerTab } from "./playerTab";
import vulcast from "resources/vulcast.png";
import copy from "resources/copy.png";

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
      {showDashboard ? <DashboardImpl /> : <JoinOrHostRoom />}
    </Center>
  );
};

type DashboardTab = "player" | "controller" | "stream";

const DashboardImpl = () => {
  const dashboardTab: DashboardTab = "player";
  const dashboardTabs = {
    player: <PlayerTab />,
    controller: <ControllerTab />,
    stream: <StreamTab />,
  };

  return (
    <Stack spacing="40px" alignItems="left" paddingTop="100px">
      <DashboardHeader />
      <TabButtons />
      {dashboardTabs[dashboardTab]}
    </Stack>
  );
};

// TODO: Replace this with the JoinOrHostRoom changes
const JoinOrHostRoom = () => {
  const [vulcastLinked, setVulcastLinked] = useState(true);

  return (
    <Stack direction="row" spacing="240px">
      {vulcastLinked ? <CreateRoom /> : <LinkVulcast />}
      <JoinRoom />
    </Stack>
  );
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
      <Button w="200px" sz="lg" bg="#9F7AEA" color="white">
        Host Room
      </Button>
    </Stack>
  );
};

const JoinRoom = () => {
  const [roomCode, setRoomCode] = useState("");
  const [name, setName] = useState("");

  // TODO: hardcode that the user is logged in
  // TODO: vulcastGuid will be passed in as a param
  // const vulcastGuid = "guid";
  // const [createRoomMutation, { data, loading, error }] = useCreateRoomMutation({
  //   variables: {
  //     vulcastGuid: vulcastGuid,
  //   },
  // });
  // const [roomCode, setRoomCode] = useState("");
  // // Accessing the data
  // if (data?.createRoom.__typename === "Room") {
  //   setRoomCode(data.createRoom.guid);
  // }

  return (
    <Stack spacing="40px" alignItems="center">
      <Heading as="h3" size="lg">
        Join a room
      </Heading>
      {/* TODO: if loading, show spinner instead of join room form */}
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
      />
      <Input
        placeholder="Room Code"
        variant="Filled"
        bg="black"
        color="white"
        w={INPUT_WIDTH}
        sz="lg"
        value={roomCode}
        onChange={(event) => {
          // createRoomMutation();
          setRoomCode(event.target.value);
        }}
      />
      <Link to={`/room/${roomCode}`}>
        <Button w="200px" sz="lg" bg="#9F7AEA" color="white">
          Join Room
        </Button>
      </Link>
    </Stack>
  );
};

const DashboardHeader = () => {
  return (
    <Stack direction="row" align="center">
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
      <Button sz="lg" bg="#9F7AEA" color="white" _hover={{ bg: "#733BE7" }}>
        {isHost ? "End Room" : "Leave Room"}
      </Button>
    </Stack>
  );
};

const grey = "#434343";
const purple = "#9F7AEA";

const TabButtons = () => {
  const [curTab, setCurTab] = useState("player");
  return (
    <Box align="left">
      <ButtonGroup>
        <Button
          sz="lg"
          bg={curTab === "player" ? grey : purple}
          color="white"
          _hover={{ bg: "#733BE7" }}
          onClick={() => {
            setCurTab("player");
          }}
        >
          Players
        </Button>
        <Button
          sz="lg"
          bg={curTab === "controller" ? grey : purple}
          color="white"
          _hover={{ bg: "#733BE7" }}
          onClick={() => {
            setCurTab("controller");
          }}
        >
          Controller Settings
        </Button>
        <Button
          sz="lg"
          bg={curTab === "stream" ? grey : purple}
          color="white"
          _hover={{ bg: "#733BE7" }}
          onClick={() => {
            setCurTab("stream");
          }}
        >
          Game Stream
        </Button>
      </ButtonGroup>
    </Box>
  );
};

const ControllerTab = () => {
  return <Box>Controller Tab</Box>;
};

const StreamTab = () => {
  return <Box>Stream Tab</Box>;
};
