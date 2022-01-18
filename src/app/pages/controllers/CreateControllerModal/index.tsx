import { useIsSiteModalTriggered } from "lib/site-modal";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ControllersRouter } from "..";
import { ControllerType } from "../studio/enums/controller-type";
import { GameConsole } from "../studio/enums/game-console";
import { ControllerTypeModal } from "./ControllerTypeModal";
import { GameConsoleModal } from "./GameConsoleModal";

export enum CreateControllerModalStep {
  GAME_CONSOLE = "GAME_CONSOLE",
  CONTROLLER_TYPE = "CONTROLLER_TYPE",
}

interface ClosedState {
  step: undefined;
}

const CLOSED_STATE: ClosedState = {
  step: undefined,
};

interface GameConsoleState {
  step: CreateControllerModalStep.GAME_CONSOLE;
}

const OPEN_STATE: GameConsoleState = {
  step: CreateControllerModalStep.GAME_CONSOLE,
};

interface ControllerTypeState {
  step: CreateControllerModalStep.CONTROLLER_TYPE;
  gameConsole: GameConsole;
}

export const CreateControllerModal = () => {
  const navigate = useNavigate();

  const [modalState, setModalState] = useState<
    ClosedState | GameConsoleState | ControllerTypeState
  >(CLOSED_STATE);

  const closeModal = useCallback(() => {
    setModalState({ step: undefined });
  }, []);

  const setGameConsole = useCallback((gameConsole: GameConsole) => {
    setModalState({
      step: CreateControllerModalStep.CONTROLLER_TYPE,
      gameConsole,
    });
  }, []);

  const setControllerType = useCallback(
    (controllerType: ControllerType) => {
      const { gameConsole } = modalState as ControllerTypeState;
      setModalState(CLOSED_STATE);
      navigate(
        ControllersRouter.createUserController({ gameConsole, controllerType })
      );
    },
    [modalState, navigate, setModalState]
  );

  const [isTriggered, ackTriggered] =
    useIsSiteModalTriggered("CreateController");

  useEffect(() => {
    if (isTriggered) {
      setModalState(OPEN_STATE);
      ackTriggered();
    }
  }, [setModalState, isTriggered, ackTriggered]);

  return (
    <>
      <GameConsoleModal
        isOpen={modalState.step === CreateControllerModalStep.GAME_CONSOLE}
        onClose={closeModal}
        setGameConsole={setGameConsole}
      />
      <ControllerTypeModal
        isOpen={modalState.step === CreateControllerModalStep.CONTROLLER_TYPE}
        onClose={closeModal}
        setControllerType={setControllerType}
      />
    </>
  );
};
