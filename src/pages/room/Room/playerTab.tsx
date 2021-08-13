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
import controllerIcon from "resources/controller.png";
import spectatorIcon from "resources/spectator.png";
import { useClientPlayersInRoomQuery } from "./playersInRoom.backend.generated";

function getControllerText(controller: number | null | undefined) {
  if (controller === null || controller === undefined) {
    return "Spectator";
  }
  return `Controller ${controller}`;
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
          .sort((player1, player2) => {
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
                controller={getControllerText(controllerNumber)}
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
  controller: String;
  isCurrentPlayer: boolean;
}

const PlayerRow: React.FC<PlayerRowProps> = ({
  display,
  controller,
  isCurrentPlayer,
}) => {
  return (
    <Flex
      padding="15px 25px"
      align="center"
      backgroundColor={isCurrentPlayer ? "purple.800" : "whiteAlpha.50"}
      borderRadius="5px"
    >
      <HStack direction="row" alignItems="center" width="160px">
        <Image src={profile} />
        <Text fontSize="lg" marginRight="20px">
          {display}
        </Text>
      </HStack>
      <Box flex="1 1 auto" />
      <HStack width="160px">
        <Image
          src={"Spectator" === controller ? spectatorIcon : controllerIcon}
        />
        <Text fontSize="lg">{controller}</Text>
      </HStack>
      {/* <Button variant="solidSmall">Edit</Button> */}
    </Flex>
  );
};
