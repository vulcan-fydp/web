import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/breadcrumb";
import { Link, useRouteMatch } from "react-router-dom";
import { useDefaultControllerStudioQuery } from "./defaultControllerStudio.backend.generated";
import { ControllerType } from "./enums/controller-type";
import { GameConsole } from "./enums/game-console";
import { ControllerStudio } from "./Studio";

const noop = () => {};

export const DefaultControllerStudio = () => {
  const {
    params: { controllerId },
  } = useRouteMatch<{ controllerId: string }>();

  const { data, loading, error } = useDefaultControllerStudioQuery({
    variables: {
      controllerId,
    },
  });

  if (loading) {
    return null;
  }

  if (error) {
    return null;
  }

  if (!data || !data.controller) {
    return null;
  }

  const controller = data.controller;

  return (
    <>
      <ControllerStudio
        isReadOnly
        buttons={controller.buttons}
        axes={controller.axes}
        gameConsole={GameConsole.SWITCH}
        controllerType={ControllerType.KEYBOARD_AND_MOUSE}
        name={controller.name}
        onButtonChange={noop}
        onAxisChange={noop}
        onGameConsoleChange={noop}
        onControllerTypeChange={noop}
        onNameChange={noop}
      />
    </>
  );
};
