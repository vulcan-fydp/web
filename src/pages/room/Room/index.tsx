import {
  Heading,
  Box,
  Button,
  Image,
  VStack,
  HStack,
  Divider,
  Text,
  Tooltip
} from "@chakra-ui/react";
import {
  useEffect,
  useState,
} from "react";
import {
  Link,
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import { HeroPage } from "components/HeroPage";
import vulcast from "resources/vulcast.png";
import copy from "resources/copy.png";

type DashboardTab = "player" | "controller" | "stream";

// TODO: Replace hardcoded values
const roomCode = "pink-bear-porcupine";
const roomUrl = "vulcan.play/room/" + roomCode;

export const Dashboard = () => {
  const { path } = useRouteMatch();

  return (
      <HeroPage isDashboard={true}>
        <VStack spacing="20px" paddingTop="64px" alignItems="left" w="1000px">
          <ShareAndCloseRoomHeader />
          <TabButtons />
          <Divider borderWidth="1px" borderColor="white" opacity={1} />
          <Switch>
            <Route path={`${path}/players`}>
              <PlayerTab />
            </Route>
            <Route path={`${path}/controller`}>
              <ControllerTab />
            </Route>
            <Route path={`${path}/stream`}>
              <StreamTab />
            </Route>
          </Switch>
        </VStack>
      </HeroPage>
  );
};

const ShareAndCloseRoomHeader = () => {
  return (
    <HStack direction="row" justifyContent="space-between">
      <RoomDetails />
      <EndRoom />
    </HStack>
  );
};

const RoomDetails = () => {
  const [tooltipShowing, setTooltipShowing] = useState(false);
  useEffect(() => {
    if (tooltipShowing) {
      const timerID = setTimeout(() => {
        setTooltipShowing(false);
      }, 1000);
      return () => {
        clearTimeout(timerID);
      };
    }
  }, [tooltipShowing]);

  return (
    <HStack>
      <Image src={vulcast} />
      <VStack justifyContent="space-between" h="100px">
        <Heading as="h3" size="sm" w="320px">
          Send this link to people who you want to play with.
        </Heading>
        <Tooltip label="Copied!" placement="right" isOpen={tooltipShowing} bg="purple" color="white">
          <Button
            variant="solid"
            rightIcon={<Image src={copy}></Image>}
            justifyContent="space-between"
            onClick={() => {
              navigator.clipboard.writeText(roomUrl);
              setTooltipShowing(true);
            }}
          >
            {roomUrl}
          </Button>
        </Tooltip>
      </VStack>
    </HStack>
  );
};

const EndRoom = () => {
  // TODO: Hoist this session status upwards or into a redux store
  const isHost = true;
  return <Button variant="solid">{isHost ? "End Room" : "Leave Room"}</Button>;
};

const TabButtons = () => {
  // TODO: Fix bug where initially landing on a dashboard tab will make the stream tab look selected
  const [tab, setTab] = useState<DashboardTab>("stream");

  return (
    <HStack w="400px" justifyContent="space-between">
      <Link to={`/room/${roomCode}/players`}>
        <Text
          color={tab === "player" ? "purple" : "white"}
          fontWeight="semibold"
          textDecoration="none"
          _hover={{
            color: "purple",
          }}
          onClick={() => setTab("player")}
        >
          Players
        </Text>
      </Link>
      <Link to={`/room/${roomCode}/controller`}>
        <Text
          color={tab === "controller" ? "purple" : "white"}
          fontWeight="semibold"
          textDecoration="none"
          _hover={{
            color: "purple",
          }}
          onClick={() => setTab("controller")}
        >
          Controller Settings
        </Text>
      </Link>
      <Link to={`/room/${roomCode}/stream`}>
        <Text
          color={tab === "stream" ? "purple" : "white"}
          fontWeight="semibold"
          textDecoration="none"
          _hover={{
            color: "purple",
          }}
          onClick={() => setTab("stream")}
        >
          Game Stream
        </Text>
      </Link>
    </HStack>
  );
};

// TODO: Move these tabs into their own file
const PlayerTab = () => {
  return (
    <Box>
      <Heading> Player Tab </Heading>
    </Box>
  );
};

const ControllerTab = () => {
  return (
    <Box>
      <Heading> Controller Tab </Heading>
    </Box>
  );
};

const StreamTab = () => {
  return (
    <Box>
      <Heading> Stream Tab </Heading>
    </Box>
  );
};
