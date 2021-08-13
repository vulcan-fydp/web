import {
  HStack,
  VStack,
  Heading,
  Center,
  Image,
  Spinner,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import profile from "resources/profile.png";
import { ControllerIcon } from "resources/controller";
import spectatorIcon from "resources/spectator.png";
import { useClientPlayersInRoomQuery } from "./playersInRoom.backend.generated";

const controllerColors = ["red", "blue", "green", "yellow"];

interface ControllerProps {
  display: string;
  color: string;
}

function getControllerProps(controller: number | null | undefined) {
  if (controller === null || controller === undefined) {
    return { display: "Spectator", color: "white" };
  }
  return {
    display: `Controller ${controller}`,
    color: controller <= 4 ? controllerColors[controller] : "white",
  };
}

const playerLoadingError =
  "There was an error loading players, please try again.";

export const PlayerTab: React.FC = () => {
  const { data, loading, error } = useClientPlayersInRoomQuery();

  if (loading) {
    <Center align="center">
      <Spinner color="purple.400" mt="120px" />
    </Center>;
  }
  if (error) {
    return <Heading> {playerLoadingError} </Heading>;
  }

  // TODO: Introduce better error messages/handling and remove the following
  if (!data) {
    return <Heading> No data found </Heading>;
  }
  if (!data.roomSession) {
    return <Heading> No room session found </Heading>;
  }
  if (data.roomSession.room.roomSessions.length === 0) {
    return <Heading> Nobody is in the room </Heading>;
  }

  const currentPlayerId = data.roomSession?.id;
  return (
    <>
      <Heading size="md" mb="20px">
        Connected Players
      </Heading>
      <VStack alignItems="left" spacing="20px">
        {(data.roomSession.room.roomSessions ?? [])
          .sort((player1, _) => {
            if (player1.id === currentPlayerId) {
              return -1;
            }
            return 1;
          })
          .map(({ nickname, controllerNumber, id }) => {
            const isCurrentPlayer = id === currentPlayerId;
            return (
              <PlayerRow
                key={nickname}
                display={isCurrentPlayer ? `${nickname} (You)` : nickname}
                controllerProps={getControllerProps(controllerNumber)}
                isCurrentPlayer={isCurrentPlayer}
              />
            );
          })}
      </VStack>
    </>
  );
};

interface PlayerRowProps {
  display: String;
  controllerProps: ControllerProps;
  isCurrentPlayer: boolean;
}

const PlayerRow: React.FC<PlayerRowProps> = ({
  display,
  controllerProps,
  isCurrentPlayer,
}) => {
  return (
    <Flex
      padding="15px 25px"
      align="center"
      backgroundColor={isCurrentPlayer ? "whiteAlpha.200" : "whiteAlpha.50"}
      borderRadius="5px"
    >
      <HStack direction="row" alignItems="center" width="300px" spacing={4}>
        <Image src={profile} width="32px" />
        <Text fontSize="lg">{display}</Text>
      </HStack>
      <Box flex="1 1 auto" />
      <HStack minW="154px" spacing={4}>
        {"Spectator" === controllerProps.display ? (
          <Image src={spectatorIcon} />
        ) : (
          <ControllerIcon color={controllerProps.color} />
        )}
        <Text fontSize="lg">{controllerProps.display}</Text>
      </HStack>
    </Flex>
  );
};
