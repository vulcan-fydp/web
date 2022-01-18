import { Button } from "@chakra-ui/button";
import { Text, VStack } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useMemo } from "react";
import {
  GameConsole,
  GAME_CONSOLE_DISPLAY_ORDER,
  getGameConsoleName,
} from "../studio/enums/game-console";

export const GAME_CONSOLE_QUERY_PARAM = "game_console";

interface GameConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  setGameConsole: (gc: GameConsole) => void;
}

export const GameConsoleModal: React.FC<GameConsoleModalProps> = ({
  isOpen,
  onClose,
  setGameConsole,
}) => {
  const gameConsoleList = useMemo(() => {
    return GAME_CONSOLE_DISPLAY_ORDER.map((gameConsole) => (
      <Button
        w="100%"
        onClick={() => setGameConsole(gameConsole)}
        key={gameConsole}
      >
        {getGameConsoleName(gameConsole)}
      </Button>
    ));
  }, [setGameConsole]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Game Console</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody>
          <Text>What console is this controller for?</Text>
          <VStack mt="20px">{gameConsoleList}</VStack>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
