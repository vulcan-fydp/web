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
import { usePlayersInRoomQuery } from "./playersInRoom.generated";

type Controller =
  | "Controller 1"
  | "Controller 2"
  | "Controller 3"
  | "Controller 4"
  | "Controller 5"
  | "Controller 6"
  | "Controller 7"
  | "Controller 8"
  | "Spectator";

const numberToController: Map<Number, Controller> = new Map([
  [1, "Controller 1"],
  [2, "Controller 2"],
  [3, "Controller 3"],
  [4, "Controller 4"],
  [5, "Controller 5"],
  [6, "Controller 6"],
  [7, "Controller 7"],
  [8, "Controller 8"],
]);

const playerLoadingError =
  "There was an error loading players, please try again.";

export function PlayerTab() {
  const { data, loading, error } = usePlayersInRoomQuery();

  if (loading) return <Spinner color="purple" />;
  if (error) return <Heading> {playerLoadingError} </Heading>;

  // TODO: Introduce better error messages and remove the following
  if (!data) return <Heading> No data found </Heading>;
  if (!data.user)  return <Heading> No user found </Heading>;

  return (
    <>
      <Heading size="md">Connected Players</Heading>
      <VStack alignItems="left" spacing="20px">
        {data ? (
          data.user?.vulcasts[0].room?.roomSessions.map(
            ({ nickname, controllerNumber }) => {
              return (
                <Player
                  player={nickname}
                  controller={
                    controllerNumber && numberToController.has(controllerNumber)
                      ? numberToController.get(controllerNumber)!
                      : "Spectator"
                  }
                />
              );
            }
          )
        ) : (
          <Heading> {playerLoadingError} </Heading>
        )}
      </VStack>
    </>
  );
}

interface PlayerProperties {
  player: String;
  controller: Controller;
}

const Player = (playerProps: PlayerProperties) => {
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
      <PlayerModal playerName={playerProps.player} />
      <ControllerModal controller={playerProps.controller} />
      <ModerationModal />
    </HStack>
  );
};

interface PlayerModalProps {
  playerName: String;
}

const PlayerModal: React.FC<PlayerModalProps> = ({ playerName }) => {
  return (
    <HStack direction="row" alignItems="center" width="160px">
      <Image src={profile} />
      <Heading size="sm">{playerName}</Heading>
    </HStack>
  );
};

interface ControllerModalProps {
  controller: Controller;
}

const ControllerModal: React.FC<ControllerModalProps> = ({ controller }) => {
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

const ModerationModal = () => {
  return <Button variant="kickLink">Kick</Button>;
};
