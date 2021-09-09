import {
  Heading,
  Button,
  Image,
  VStack,
  HStack,
  Tooltip,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { NavLink, Switch, Route, useRouteMatch } from "react-router-dom";
import { HeroPage } from "components/HeroPage";
import { PlayerTab } from "pages/room/Room/PlayerTab";
import { StreamTab } from "pages/room/Room/StreamTab";
import { CopyIcon } from "@chakra-ui/icons";
import { ControllerTab } from "./ControllerTab";
import { makeLocalStorageBackedVar } from "lib/makeLocalStorageBackedVar";
import { JoinAnotherRoomModal } from "./JoinAnotherRoomModal";
import { environment } from "environment";

type DashboardTab = "player" | "controller" | "stream";

export const controllerIdVar = makeLocalStorageBackedVar("CONTROLLER_ID");

export const Dashboard = () => {
  const { path } = useRouteMatch();

  return (
    <HeroPage isDashboard={true}>
      <JoinAnotherRoomModal onLeave={() => null} />
      <VStack
        spacing="20px"
        paddingTop="64px"
        alignItems="left"
        width="100%"
        maxWidth="1040px"
        padding="0 20px"
      >
        <ShareAndCloseRoomHeader />
        <Switch>
          <Route path={`${path}/players`}>
            <TabContainer tab="player" />
          </Route>
          <Route path={`${path}/controller`}>
            <TabContainer tab="controller" />
          </Route>
          <Route path={`${path}/stream`}>
            <TabContainer tab="stream" />
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

  const roomUrl = `${window.location.host}/room/${params.roomId}`;

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
            rightIcon={<CopyIcon />}
            justifyContent="space-between"
            onClick={() => {
              navigator.clipboard.writeText(
                `http${environment.useSecureProtocol ? "s" : ""}://${roomUrl}`
              );
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
}

const TabContainer: React.FC<TabContainerProps> = ({ tab }) => {
  const { params } = useRouteMatch<{ roomId?: string }>();
  const dashboardTabs: DashboardTab[] = ["stream", "player", "controller"];
  return (
    <Tabs isLazy variant="line" defaultIndex={dashboardTabs.indexOf(tab)}>
      <TabList>
        <Tab as={NavLink} to={`/room/${params.roomId}/stream`}>
          Game Stream
        </Tab>
        <Tab as={NavLink} to={`/room/${params.roomId}/players`}>
          Players
        </Tab>
        <Tab as={NavLink} to={`/room/${params.roomId}/controller`}>
          Controller Settings
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <StreamTab />
        </TabPanel>
        <TabPanel>
          <PlayerTab />
        </TabPanel>
        <TabPanel>
          <ControllerTab />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
