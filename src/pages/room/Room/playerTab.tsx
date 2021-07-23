import {
  HStack,
  VStack,
  Heading,
  Button,
  Image,
  Spinner,
} from "@chakra-ui/react";
import profile from "resources/profile.png";
import controllerIcon from "resources/controller.png";
import spectatorIcon from "resources/spectator.png";
import { usePlayersInRoomQuery } from "./playersInRoom.backend.generated";

function getControllerText(controller: number | null | undefined) {
  if (controller === null || controller === undefined) {
    return "Spectator";
  }
  return `Controller ${controller}`;
}

const playerLoadingError =
  "There was an error loading players, please try again.";

export function PlayerTab() {
  const { data, loading, error } = usePlayersInRoomQuery();

  if (loading) {
    return <Spinner color="purple" />;
  }
  if (error) {
    return <Heading> {playerLoadingError} </Heading>;
  }

  // TODO: Introduce better error messages/handling and remove the following
  if (!data) {
    return <Heading> No data found </Heading>;
  }
  if (!data.user) {
    return <Heading> No user found </Heading>;
  }

  return (
    <>
      <Heading size="md">Connected Players</Heading>
      <VStack alignItems="left" spacing="20px">
        {(data.user.vulcasts[0].room?.roomSessions ?? []).map(
          ({ nickname, controllerNumber }) => {
            return (
              <Player
                key={nickname}
                nickname={nickname}
                controller={controllerNumber}
              />
            );
          }
        )}
      </VStack>
    </>
  );
}

interface PlayerProps {
  nickname: String;
  controller: number | null | undefined;
}

const Player = ({ nickname, controller }: PlayerProps) => {
  return (
    <HStack
      borderWidth="1px"
      borderColour="white"
      borderRadius="2px"
      padding="8px 16px 8px 16px"
      justifyContent="space-between"
      alignItems="center"
      maxWidth="1000px"
    >
      <PlayerInfo nickname={nickname} />
      <ControllerWidget controller={getControllerText(controller)} />
      <ModerationWidget />
    </HStack>
  );
};

interface PlayerModalProps {
  nickname: String;
}

const PlayerInfo: React.FC<PlayerModalProps> = ({ nickname }) => {
  return (
    <HStack direction="row" alignItems="center" width="160px">
      <Image src={profile} />
      <Heading size="sm">{nickname}</Heading>
    </HStack>
  );
};

interface ControllerModalProps {
  controller: String;
}

const ControllerWidget: React.FC<ControllerModalProps> = ({ controller }) => {
  return (
    <HStack direction="row" alignItems="center">
      <HStack width="160px">
        <Image
          src={controller === "Spectator" ? spectatorIcon : controllerIcon}
        />
        <Heading size="sm">{controller}</Heading>
      </HStack>
      <Button variant="solidSmall">Edit</Button>
    </HStack>
  );
};

const ModerationWidget = () => {
  return <Button variant="kickLink">Kick</Button>;
};
