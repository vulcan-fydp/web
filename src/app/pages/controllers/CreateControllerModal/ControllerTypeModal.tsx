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
import { useCallback } from "react";
import { NavLink } from "react-router-dom";
import { useQueryParam, StringParam } from "use-query-params";
import { CreateControllerModalStep, CREATE_CONTROLLER_QUERY_PARAM } from ".";
import { ControllersRouter } from "..";
import {
  ControllerType,
  CONTROLLER_TYPE_DISPLAY_ORDER,
  getControllerTypeName,
} from "../studio/enums/controller-type";
import { GameConsole } from "../studio/enums/game-console";
import { GAME_CONSOLE_QUERY_PARAM } from "./GameConsoleModal";

export const CONTROLLER_TYPE_QUERY_PARAM = "controller_type";

export const ControllerTypeModal = () => {
  const [createControllerModalStep, setCreateControllerModalStep] =
    useQueryParam(CREATE_CONTROLLER_QUERY_PARAM, StringParam);
  const [, setControllerType] = useQueryParam(
    CONTROLLER_TYPE_QUERY_PARAM,
    StringParam
  );
  const [gameConsole] = useQueryParam(GAME_CONSOLE_QUERY_PARAM, StringParam);

  const onClose = useCallback(() => {
    setCreateControllerModalStep(undefined, "push");
  }, [setCreateControllerModalStep]);

  return (
    <Modal
      isOpen={
        createControllerModalStep === CreateControllerModalStep.CONTROLLER_TYPE
      }
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Controller Type</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody>
          <Text>How do you want to control this controller?</Text>
          <VStack mt="20px">
            {CONTROLLER_TYPE_DISPLAY_ORDER.map((controllerType) => (
              <Button
                w="100%"
                as={NavLink}
                to={ControllersRouter.createUserController({
                  gameConsole: gameConsole as GameConsole,
                  controllerType,
                })}
              >
                {getControllerTypeName(controllerType)}
              </Button>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
