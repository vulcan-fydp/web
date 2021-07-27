import { Flex, HStack, Text } from "@chakra-ui/react";
import { HeroPage } from "components/HeroPage";
import React from "react";
import { useRouteMatch } from "react-router";
import { Redirect } from "react-router-dom";
import { CreateRoomForm } from "./CreateRoomForm";
import { JoinRoomForm } from "./JoinRoomForm";
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
      <Text
        fontSize={["3xl", "6xl"]}
        fontWeight="bold"
        w="500px"
        maxW="calc(100% - 40px)"
        textAlign="center"
        mb="20px"
      >
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

const JoinAndHostRoom: React.FC<{ vulcastId: string; roomId?: string }> = ({
  vulcastId,
  roomId,
}) => {
  return (
    <Flex>
      <HStack>
        <JoinRoomForm roomId={roomId} />
        {roomId === undefined ? <CreateRoomForm vulcastId={vulcastId} /> : null}
      </HStack>
    </Flex>
  );
};

const JoinAndRegisterVulcast: React.FC = () => {
  return (
    <Flex>
      <HStack>
        <JoinRoomForm />
        <RegisterVulcastForm />
      </HStack>
    </Flex>
  );
};
