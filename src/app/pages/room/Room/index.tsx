import {
  Box,
  Button,
  Heading,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
  VStack,
} from "@chakra-ui/react";
import {
  Navigate,
  NavLink,
  Outlet,
  useNavigate,
  useParams,
} from "react-router-dom";
import { HeroPage } from "app/components/HeroPage";
import { ShareRoomLink } from "app/components/ShareRoomLink";
import { PlayerTab } from "app/pages/room/Room/PlayerTab";
import { StreamTab } from "app/pages/room/Room/StreamTab";
import { makeLocalStorageBackedVar } from "lib/makeLocalStorageBackedVar";
import { useCallback } from "react";
import { ControllerTab } from "./ControllerTab";
import { JoinAnotherRoomModal } from "./JoinAnotherRoomModal";
import { useLeaveRoomMutation } from "./leaveRoom.backend.generated";
import { useEndRoomMutation } from "./endRoom.backend.generated";
import { usePlayerIsHostQuery } from "./roomSession.backend.generated";

type DashboardTab = "player" | "controller" | "stream";

export const controllerIdVar = makeLocalStorageBackedVar("CONTROLLER_ID");

export const Dashboard = () => {
  const { roomId } = useParams<{ roomId?: string }>();

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

  if (!roomId) {
    return <Heading> Room ID not found </Heading>;
  }
  if (!data) {
    return <Heading> No data found </Heading>;
  }
  if (!data.roomSession) {
    return <Navigate to="../" replace={true} />;
  }

  return (
    <HeroPage isDashboard={true}>
      {/* This should call leave room on the user and also navigate them to /room or /room/another-room */}
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
          <EndRoom isHost={data.roomSession.isHost} roomId={roomId} />
        </HStack>
        <Outlet />
      </VStack>
    </HeroPage>
  );
};

const RoomDetails = () => {
  const { roomId } = useParams<{ roomId?: string }>();

  if (roomId === undefined) {
    return null;
  }

  return (
    <Box maxW="400px" flex="1 1 auto">
      <Heading size="sm" mb="10px">
        Share the room code!
      </Heading>
      <ShareRoomLink roomId={roomId} />
    </Box>
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
  const navigate = useNavigate();
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
        navigate("/");
        return;
    }
  }, [endRoomMutation, navigate, toast]);

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
        navigate("/");
        return;
    }
  }, [leaveRoomMutation, navigate, toast]);

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

export const DashboardTabContainer: React.FC<TabContainerProps> = ({ tab }) => {
  const { roomId } = useParams<{ roomId?: string }>();
  const dashboardTabs: DashboardTab[] = ["stream", "player", "controller"];
  return (
    <Tabs isLazy variant="line" defaultIndex={dashboardTabs.indexOf(tab)}>
      <TabList>
        <Tab as={NavLink} to={`/room/${roomId}/stream`}>
          Game Stream
        </Tab>
        <Tab as={NavLink} to={`/room/${roomId}/players`}>
          Players
        </Tab>
        <Tab as={NavLink} to={`/room/${roomId}/controller`}>
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
