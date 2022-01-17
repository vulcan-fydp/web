import {
  Heading,
  Button,
  VStack,
  HStack,
  Tooltip,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { NavLink, Switch, Route, useRouteMatch } from "react-router-dom";
import { HeroPage } from "app/components/HeroPage";
import { PlayerTab } from "app/pages/room/Room/PlayerTab";
import { StreamTab } from "app/pages/room/Room/StreamTab";
import { CopyIcon } from "@chakra-ui/icons";
import { ControllerTab } from "./ControllerTab";
import { makeLocalStorageBackedVar } from "lib/makeLocalStorageBackedVar";
import { JoinAnotherRoomModal } from "./JoinAnotherRoomModal";
import { environment } from "environment";
import { usePlayerIsHostQuery } from "./roomSession.backend.generated";
import { useLeaveRoomMutation } from "./leaveRoom.backend.generated";
import { useHistory } from "react-router-dom";
import { useEndRoomMutation } from "./endRoom.backend.generated";

type DashboardTab = "player" | "controller" | "stream";

export const controllerIdVar = makeLocalStorageBackedVar("CONTROLLER_ID");

export const Dashboard = () => {
  const { path, params } = useRouteMatch<{ roomId?: string }>();
  const { data, loading, error } = usePlayerIsHostQuery({
    variables: {},
    fetchPolicy: "network-only",
  });

  if (loading) {
    return null;
  }
  if (error) {
    return (
      <Heading>{`Could not determine if user is the host with error: ${error.message}`}</Heading>
    );
  }

  if (!params.roomId) {
    return <Heading> Room ID not found </Heading>;
  }
  if (!data) {
    return <Heading> No data found </Heading>;
  }
  if (!data.roomSession) {
    return (
      <Heading>
        {" "}
        Room{" "}
        <Text as="span" color="#9F7AEA">
          {params.roomId}
        </Text>{" "}
        has ended or does not exist.{" "}
      </Heading>
    );
  }

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
        <HStack direction="row" justifyContent="space-between" flexWrap="wrap">
          <RoomDetails />
          <EndRoom isHost={data.roomSession.isHost} roomId={params.roomId} />
        </HStack>
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

const EndRoom: React.FC<{
  isHost: boolean;
  roomId: string;
}> = ({ isHost, roomId }) => {
  const [endRoomMutation] = useEndRoomMutation({
    variables: {
      roomId,
    },
  });
  const [leaveRoomMutation] = useLeaveRoomMutation({
    variables: {
      roomId,
    },
  });
  const history = useHistory();
  const toast = useToast();

  const onEndRoomClick = useCallback(async () => {
    const result = await endRoomMutation();

    if (!result.data) {
      return;
    }

    switch (result.data.endRoom.__typename) {
      case "AuthenticationError":
        toast({
          title: "Authentication error occured when trying to end the room.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return;
      case "Success":
        history.push("/");
        return;
    }
  }, [endRoomMutation, history, toast]);

  const onLeaveRoomClick = useCallback(async () => {
    const result = await leaveRoomMutation();

    if (!result.data) {
      return;
    }

    switch (result.data.leaveRoom.__typename) {
      case "AuthenticationError":
        toast({
          title: "Authentication error occured when trying to leave the room.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return;
      case "Success":
        history.push("/");
        return;
    }
  }, [leaveRoomMutation, history, toast]);

  if (isHost) {
    return (
      <Button variant="solid" onClick={onEndRoomClick}>
        End Room
      </Button>
    );
  }
  return (
    <Button variant="solid" onClick={onLeaveRoomClick}>
      Leave Room
    </Button>
  );
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
