import {
  Heading,
  Box,
  Button,
  ButtonGroup,
  Image,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { HeroPage } from "components/HeroPage";
import vulcast from "resources/vulcast.png";
import copy from "resources/copy.png";
import ReactTooltip from "react-tooltip";

type DashboardTab = "player" | "controller" | "stream";

interface TabState {
  tab: DashboardTab;
}

type TabAction =
  | { type: "player" }
  | { type: "controller" }
  | { type: "stream" };

function tabReducer(state: TabState, action: TabAction) {
  return { tab: action.type };
}

const initialTabState: TabState = {
  tab: "player",
};

const DashboardContext = createContext<{
  state: TabState;
  dispatch: React.Dispatch<TabAction>;
}>({ state: initialTabState, dispatch: () => null });

export const Dashboard = () => {
  const dashboardTabs = {
    player: <PlayerTab />,
    controller: <ControllerTab />,
    stream: <StreamTab />,
  };

  // Create state and dispatch for the tab state
  const [state, dispatch] = useReducer(tabReducer, initialTabState);
  // Keep the object reference stable if nothing in the state has changed
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <DashboardContext.Provider value={contextValue}>
      <HeroPage isDashboard={true}>
        <VStack spacing="20px" paddingTop="64px" alignItems="left" w="1000px">
          <ShareAndCloseRoomHeader />
          <TabButtons />
          <Divider borderWidth="1px" borderColor="white" opacity={1} />
          {dashboardTabs[state.tab]}
        </VStack>
      </HeroPage>
    </DashboardContext.Provider>
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
  const roomLink = "vulcan.play/pink-bear-porcupine";
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
        <Heading as="h3" size="sm" w="320px">
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
          {roomLink}
        </Button>
        <ReactTooltip
          // TODO: style this tooltip with styled components
          place="right"
          type="light"
          effect="solid"
          globalEventOff="click"
          afterShow={() => {
            navigator.clipboard.writeText(roomLink);
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
  const { state, dispatch } = useContext(DashboardContext);
  return (
    <ButtonGroup paddingTop="40px" w="400px" justifyContent="space-between">
      <Button
        variant="link"
        color={state.tab === "player" ? "normPurple" : "white"}
        onClick={() => {
          dispatch({ type: "player" });
        }}
      >
        Players
      </Button>
      <Button
        variant="link"
        color={state.tab === "controller" ? "normPurple" : "white"}
        onClick={() => {
          dispatch({ type: "controller" });
        }}
      >
        Controller Settings
      </Button>
      <Button
        variant="link"
        color={state.tab === "stream" ? "normPurple" : "white"}
        onClick={() => {
          dispatch({ type: "stream" });
        }}
      >
        Game Stream
      </Button>
    </ButtonGroup>
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
