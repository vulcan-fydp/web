import {
  Heading,
  Box,
  Button,
  Image,
  VStack,
  HStack,
  Divider,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { NavLink, Link, Switch, Route, useRouteMatch } from "react-router-dom";
import { HeroPage } from "components/HeroPage";
import { PlayerTab } from "pages/room/Room/playerTab";
import vulcast from "resources/vulcast.png";
import copy from "resources/copy.png";

type DashboardTab = "player" | "controller" | "stream";

const roomUrl = "localhost:3000/room/";

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
        <Switch>
          <Route path={`${path}/players`}>
            <TabContainer tab="player">
              <PlayerTab />
            </TabContainer>
          </Route>
          <Route path={`${path}/controller`}>
            <TabContainer tab="controller">
              <ControllerTab />
            </TabContainer>
          </Route>
          <Route path={`${path}/stream`}>
            <TabContainer tab="stream">
              <StreamTab />
            </TabContainer>
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
  const { params } = useRouteMatch<{ roomId?: string }>();

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
      <VStack align="left" justifyContent="space-between" h="100px">
        <Heading size="sm" w="320px">
          Send this link to people who you want to play with.
        </Heading>
        <Tooltip
          label="Copied!"
          placement="right"
          isOpen={tooltipShowing}
          bg="purple"
          color="white"
        >
          <Button
            variant="solid"
            rightIcon={<Image src={copy}></Image>}
            justifyContent="space-between"
            onClick={() => {
              navigator.clipboard.writeText(roomUrl + params.roomId);
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
  // TODO: Use the session context
  const isHost = true;
  return <Button variant="solid">{isHost ? "End Room" : "Leave Room"}</Button>;
};

interface TabContainerProps {
  tab: DashboardTab;
  children: React.ReactNode;
}

const TabContainer: React.FC<TabContainerProps> = ({ tab, children }) => {
  const { params } = useRouteMatch<{ roomId?: string }>();
  const purple = "#9F7AEA";
  return (
    <>
      <HStack w="400px" justifyContent="space-between">
        <NavLink to={`/room/${params.roomId}/players`} style={{ color: "white", fontWeight: 600 }} activeStyle={{
          color: `${purple}`
        }}>
            Players
        </NavLink>
        <NavLink to={`/room/${params.roomId}/controller`} style={{ color: "white", fontWeight: 600 }} activeStyle={{
          color: `${purple}`
        }}>
            Controller Settings
        </NavLink>
        <NavLink to={`/room/${params.roomId}/stream`} style={{ color: "white", fontWeight: 600 }} activeStyle={{
          color: `${purple}`
        }}>
            Game Stream
        </NavLink>
      </HStack>
      <Divider borderWidth="1px" borderColor="white" opacity={1} />
      {children}
    </>
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
