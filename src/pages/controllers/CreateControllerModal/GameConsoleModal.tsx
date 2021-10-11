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
} from "@chakra-ui/modal";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQueryParam, useQueryParams, StringParam } from "use-query-params";
import { CreateControllerModalStep, CREATE_CONTROLLER_QUERY_PARAM } from ".";
import {
  GameConsole,
  GAME_CONSOLE_DISPLAY_ORDER,
  getGameConsoleName,
} from "../studio/enums/game-console";

export const GAME_CONSOLE_QUERY_PARAM = "game_console";

export const GameConsoleModal: React.FC = () => {
  const [createControllerModalStep, setCreateControllerModalStep] =
    useQueryParam(CREATE_CONTROLLER_QUERY_PARAM, StringParam);
  const [, setGameConsole] = useQueryParam(
    GAME_CONSOLE_QUERY_PARAM,
    StringParam
  );

  const onClose = useCallback(() => {
    setCreateControllerModalStep(undefined, "push");
  }, [setCreateControllerModalStep]);

  const onGameConsoleClick = useCallback(
    (gameConsole: GameConsole) => {
      setCreateControllerModalStep(
        CreateControllerModalStep.CONTROLLER_TYPE,
        "pushIn"
      );
      setGameConsole(gameConsole, "pushIn");
    },
    [setCreateControllerModalStep, setGameConsole]
  );

  const gameConsoleList = useMemo(() => {
    return GAME_CONSOLE_DISPLAY_ORDER.map((gameConsole) => (
      <Button w="100%" onClick={() => onGameConsoleClick(gameConsole)}>
        {getGameConsoleName(gameConsole)}
      </Button>
    ));
  }, [onGameConsoleClick]);

  return (
    <Modal
      isOpen={
        createControllerModalStep === CreateControllerModalStep.GAME_CONSOLE
      }
      onClose={onClose}
    >
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
