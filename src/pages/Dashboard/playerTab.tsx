import { Stack, Heading, Button, Flex, Image } from "@chakra-ui/react";
import profile from "./profile.png";
import controller from "./controller.png";

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
]);

const controllerToPlayer = new Map(
  Array.from(playerToController, ([k, v]) => [v, k])
);

export function PlayerTab() {
  return (
    <Stack direction="column">
      <Heading as="h3" size="md">
        Connected Players
      </Heading>
      {connectedPlayers.map((player) => {
        return (
          <Player
            player={player}
            controller={playerToController.get(player.name)!}
          />
        );
      })}
    </Stack>
  );
}

interface PlayerProperties {
  player: PlayerInfo;
  controller: Controller;
}

const Player = (playerProps: PlayerProperties) => {
  return (
    <Flex
      flexFlow="row nowrap"
      flexDirection="row"
      borderWidth="2px"
      borderColour="white"
      borderRaidus="2px"
      padding="8px 16px 8px 16px"
      justifyContent="space-between"
      w="100%"
      maxWidth="1000px"
    >
      <PlayerModal playerName={playerProps.player.name} />
      <ControllerModal controller={playerProps.controller} />
      <ModerationModal />
    </Flex>
  );
};

interface PlayerModalI {
  playerName: String;
}

const PlayerModal: React.FC<PlayerModalI> = ({ playerName }) => {
  return (
    <Stack direction="row" alignItems="center">
      <Image src={profile} />
      <Heading as="h2" size="md">
        {playerName}
      </Heading>
    </Stack>
  );
};

interface ControllerModalI {
  controller: Controller;
}

const ControllerModal: React.FC<ControllerModalI> = ({ controller }) => {
  return (
    <Stack direction="row" alignItems="center">
      <Heading as="h2" size="md">
        {controller}
      </Heading>
      <Image src={controller} />
      <Button sz="md" bg="#9F7AEA" color="white" _hover={{ bg: "#733BE7" }}>
        Edit
      </Button>
    </Stack>
  );
};

const ModerationModal = () => {
  return (
    <Stack direction="row" alignItems="center">
      <Button sz="md" bg="#9F7AEA" color="white" _hover={{ bg: "#733BE7" }}>
        Kick
      </Button>
    </Stack>
  );
};
