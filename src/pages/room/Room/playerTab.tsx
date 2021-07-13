import { HStack, VStack, Heading, Button, Image } from "@chakra-ui/react";
import profile from "resources/profile.png";
import controllerIcon from "resources/controller.png";
import spectatorIcon from "resources/spectator.png";

// TODO: Replace this with a backend query
type PlayerInfo = {
  name: String;
};

const connectedPlayers = [
  { name: "Michal" },
  { name: "Gordon" },
  { name: "Robbie" },
  { name: "Ayush" },
];

type Controller =
  | "Spectator"
  | "Controller 1"
  | "Controller 2"
  | "Controller 3"
  | "Controller 4";

const playerToController: Map<String, Controller> = new Map([
  ["Robbie", "Controller 2"],
  ["Gordon", "Controller 3"],
  ["Michal", "Controller 4"],
  ["Ayush", "Spectator"],
]);

export function PlayerTab() {
  return (
    <>
      <Heading size="md">Connected Players</Heading>
      <VStack alignItems="left" spacing="20px">
        {connectedPlayers.map((player) => {
          return (
            <Player
              player={player}
              controller={playerToController.get(player.name)!}
            />
          );
        })}
      </VStack>
    </>
  );
}

interface PlayerProperties {
  player: PlayerInfo;
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
      <PlayerModal playerName={playerProps.player.name} />
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
        <Image src={controller === "Spectator" ? spectatorIcon : controllerIcon} />
        <Heading size="sm">{controller}</Heading>
      </HStack>
      <Button variant="solidSmall">Edit</Button>
    </HStack>
  );
};

const ModerationModal = () => {
  return <Button variant="kickLink">Kick</Button>;
};
