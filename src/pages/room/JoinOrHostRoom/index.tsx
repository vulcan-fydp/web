import { Center, Flex, HStack, Text } from "@chakra-ui/react";
import { HeroPage } from "components/HeroPage";
import React from "react";
import { useRouteMatch } from "react-router";
import { Redirect } from "react-router-dom";
import { CreateRoomForm } from "./CreateRoomForm";
import { JoinRoomForm } from "components/JoinRoomForm";
import { RegisterVulcastForm } from "./RegisterVulcastForm";
import { useUserQuery } from "./user.backend.generated";

export const JoinOrHostRoom: React.FC = () => {
  const { params } = useRouteMatch<{ roomId?: string }>();

  const { data, loading } = useUserQuery();

  if (loading || !data) {
    return null;
  }

  if (data.room) {
    return <Redirect to={`/room/${data.room.id}/stream`} />;
  }

  if (!data.user || params.roomId !== undefined) {
    return <JoinRoom roomId={params.roomId} />;
  }

  if (data.user.vulcasts.length === 0) {
    return <JoinAndRegisterVulcast />;
  }

  return (
    <JoinAndHostRoom
      vulcastId={data.user.vulcasts[0].id}
      roomId={params.roomId}
    />
  );
};

const JoinRoom: React.FC<{ roomId?: string }> = ({ roomId }) => {
  return (
    <HeroPage>
      <Text variant="heading1" mb="20px" w="500px">
        Join a room to start{" "}
        <Text as="span" color="purple.300">
          playing.
        </Text>
      </Text>
      <Text textAlign="center" mb="40px" w="500px" maxW="calc(100% - 20px)">
        Vulcan makes it easy to play on your friend's{" "}
        <Text as="span" color="yellow.300">
          Nintendo Switch
        </Text>{" "}
        straight from your web browser. No console or even controller required!
      </Text>
      <JoinRoomForm roomId={roomId} />
    </HeroPage>
  );
};

const JoinRoomSmall: React.FC<{ roomId?: string }> = ({ roomId }) => {
  return (
    <>
      <Text variant="heading2" mb="20px">
        Join a room to start{" "}
        <Text as="span" color="purple.300">
          playing.
        </Text>
      </Text>
      <JoinRoomForm roomId={roomId} />
    </>
  );
};

const TwoActionsWrapper: React.FC<{
  firstActionComponent: React.ReactNode;
  secondActionComponent: React.ReactNode;
}> = ({ firstActionComponent, secondActionComponent }) => {
  return (
    <HeroPage>
      <Center paddingTop="140px">
        <HStack alignItems="top" spacing={16}>
          <Flex flexDir="column" align="center" maxW="400px">
            {firstActionComponent}
          </Flex>
          <Flex flexDir="column" align="center" maxW="400px">
            {secondActionComponent}
          </Flex>
        </HStack>
      </Center>
    </HeroPage>
  );
};

const JoinAndHostRoom: React.FC<{ vulcastId: string; roomId?: string }> = ({
  vulcastId,
  roomId,
}) => {
  const createRoom = (
    <>
      <Text variant="heading2" mb="20px">
        Create a room to start{" "}
        <Text as="span" color="purple.300">
          hosting a game.
        </Text>
      </Text>
      {roomId === undefined ? <CreateRoomForm vulcastId={vulcastId} /> : null}
    </>
  );
  return (
    <TwoActionsWrapper
      firstActionComponent={createRoom}
      secondActionComponent={<JoinRoomSmall roomId={roomId} />}
    />
  );
};

const JoinAndRegisterVulcast: React.FC = () => {
  const connectVulcast = (
    <>
      <Text variant="heading2" mb="20px">
        Connect your Vulcast to start{" "}
        <Text as="span" color="purple.300">
          hosting a game.
        </Text>
      </Text>
      <RegisterVulcastForm />
    </>
  );
  return (
    <TwoActionsWrapper
      firstActionComponent={connectVulcast}
      secondActionComponent={<JoinRoomSmall />}
    />
  );
};
