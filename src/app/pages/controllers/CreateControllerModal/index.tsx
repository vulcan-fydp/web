import { useEffect } from "react";
import { useParams } from "react-router";
import { useQueryParam, useQueryParams, StringParam } from "use-query-params";
import { ControllerTypeModal } from "./ControllerTypeModal";
import { GameConsoleModal } from "./GameConsoleModal";

export const CREATE_CONTROLLER_QUERY_PARAM = "create_controller_modal_step";

export enum CreateControllerModalStep {
  GAME_CONSOLE = "GAME_CONSOLE",
  CONTROLLER_TYPE = "CONTROLLER_TYPE",
}

export const CreateControllerModal = () => {
  const [createControllerModalStep, setCreateControllerModalStep] =
    useQueryParam(CREATE_CONTROLLER_QUERY_PARAM, StringParam);

  // Originally this was a switch conditionally rendering the components but it turns out
  // you don't get the close animation this way
  return (
    <>
      <GameConsoleModal />
      <ControllerTypeModal />
    </>
  );
};
