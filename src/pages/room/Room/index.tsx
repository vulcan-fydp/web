import {
  Heading,
  Box,
  Button,
  Image,
  VStack,
  HStack,
  Divider,
  Text,
} from "@chakra-ui/react";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import ReactTooltip from "react-tooltip";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import { HeroPage } from "components/HeroPage";
import { PlayerTab } from "pages/room/Room/playerTab";
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
        <VStack
          spacing="20px"
          paddingTop="64px"
          alignItems="left"
          width="100%"
          maxWidth="1000px"
        >
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
    <HStack direction="row" justifyContent="space-between" flexWrap="wrap">
      <RoomDetails />
      <EndRoom />
    </HStack>
  );
};

const RoomDetails = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [tooltipShowing, setTooltipShowing] = useState(false);
  useEffect(() => {
    if (tooltipShowing) {
      const timerID = setTimeout(() => {
        setTooltipShowing(false);
        if (buttonRef.current !== null) {
          ReactTooltip.hide(buttonRef.current);
        }
      }, 1000);
      return () => {
        clearTimeout(timerID);
      };
    }
  }, [tooltipShowing, buttonRef]);

  return (
    <HStack>
      <Image src={vulcast} />
      <VStack justifyContent="space-between" h="100px">
        <Heading size="sm" w="320px">
          Send this link to people who you want to play with.
        </Heading>
        <Button
          variant="solid"
          rightIcon={<Image src={copy}></Image>}
          justifyContent="space-between"
          ref={buttonRef}
          data-tip="Copied!"
          data-event="click" // data-event overrides the default onClick handler
        >
          {roomUrl}
        </Button>
        <ReactTooltip
          // TODO: style this tooltip with styled components
          place="right"
          type="light"
          effect="solid"
          globalEventOff="click"
          afterShow={() => {
            navigator.clipboard.writeText(roomUrl);
            setTooltipShowing(true);
          }}
        />
      </VStack>
    </HStack>
  );
};

const EndRoom = () => {
  // TODO: Hoist this session status upwards or into a redux store
  const [isHost, setIsHost] = useState(true);
  return <Button variant="solid">{isHost ? "End Room" : "Leave Room"}</Button>;
};

const TabButtons = () => {
  const [tab, setTab] = useState<DashboardTab>("stream");

  return (
    <HStack w="400px" justifyContent="space-between">
      <Link to={`/room/${roomCode}/players`}>
        <Text
          color={tab == "player" ? "purple" : "white"}
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
          color={tab == "controller" ? "purple" : "white"}
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
          color={tab == "stream" ? "purple" : "white"}
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
