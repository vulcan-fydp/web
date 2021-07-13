import { HStack, VStack, Heading, Button, Flex, Image } from "@chakra-ui/react";
import profile from "resources/profile.png";
import controllerIcon from "resources/controller.png";

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
    <VStack alignItems="left">
      <Heading size="md">Connected Players</Heading>
      {connectedPlayers.map((player) => {
        return (
          <Player
            player={player}
            controller={playerToController.get(player.name)!}
          />
        );
      })}
    </VStack>
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
      w="100%"
      maxWidth="1000px"
    >
      <PlayerModal playerName={playerProps.player.name} />
      <ControllerModal controller={playerProps.controller} />
      <ModerationModal />
    </HStack>
  );
};

interface PlayerModalI {
  playerName: String;
}

const PlayerModal: React.FC<PlayerModalI> = ({ playerName }) => {
  return (
    <HStack direction="row" alignItems="center" width="160px">
      <Image src={profile} />
      <Heading size="sm">{playerName}</Heading>
    </HStack>
  );
};

interface ControllerModalI {
  controller: Controller;
}

const ControllerModal: React.FC<ControllerModalI> = ({ controller }) => {
  return (
    <HStack direction="row" alignItems="center">
      <HStack width="160px">
        <Image src={controllerIcon} />
        <Heading size="sm">{controller}</Heading>
      </HStack>
      <Button variant="solidSmall">Edit</Button>
    </HStack>
  );
};

const ModerationModal = () => {
  return <Button variant="kickLink">Kick</Button>;
};
