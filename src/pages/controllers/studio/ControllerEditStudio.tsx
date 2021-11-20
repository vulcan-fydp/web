import { ControllerAxis, ControllerButton } from "backend-types";
import { useCallback, useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useEditControllerStudioQuery } from "./editControllerStudio.backend.generated";
import {
  ControllerType,
  INITIAL_CONTROLLER_TYPE,
  isPseudoControllerType,
} from "./enums/controller-type";
import { GameConsole } from "./enums/game-console";
import { ControllerStudio } from "./Studio";
import { getControllerType } from "./utils/getControllerType";

const noop = () => {};

export const ControllerEditStudio = () => {
  const {
    params: { controllerId },
  } = useRouteMatch<{ controllerId: string }>();

  const { data, loading, error } = useEditControllerStudioQuery({
    variables: {
      controllerId,
    },
  });

  const [buttons, setButtons] = useState<(ControllerButton | null)[]>([]);
  const [axes, setAxes] = useState<(ControllerAxis | null)[]>([]);
  const [name, setName] = useState("");
  const [controllerType, setControllerType] = useState(INITIAL_CONTROLLER_TYPE);

  useEffect(() => {
    setButtons([...(data?.controller?.buttons ?? [])]);
    setAxes([...(data?.controller?.axes ?? [])]);
    setName(data?.controller?.name ?? "");

    if (data?.controller) {
      const controllerType = getControllerType(data.controller);
      setControllerType(
        controllerType === ControllerType.EMPTY
          ? INITIAL_CONTROLLER_TYPE
          : controllerType
      );
    } else {
      setControllerType(INITIAL_CONTROLLER_TYPE);
    }
  }, [data?.controller, setButtons, setAxes, setName, setControllerType]);

  const onButtonChange = useCallback(
    (buttonNumber: number, button: ControllerButton | null) => {
      setButtons((buttons) => [
        ...buttons.slice(0, buttonNumber),
        button,
        ...buttons.slice(buttonNumber + 1),
      ]);
    },
    [setButtons]
  );

  const onAxisChange = useCallback(
    (axisNumber: number, axis: ControllerAxis | null) => {
      setAxes((axes) => [
        ...axes.slice(0, axisNumber),
        axis,
        ...axes.slice(axisNumber + 1),
      ]);
    },
    [setAxes]
  );

  const onControllerTypeChange = useCallback(
    (controllerType: ControllerType) => {
      setButtons(new Array(17).fill(null));
      setAxes(new Array(4).fill(null));
      setControllerType(controllerType);
      console.log(controllerType);
    },
    [setButtons, setAxes]
  );

  if (loading) {
    return null;
  }

  if (error) {
    return null;
  }

  if (!data || !data.controller) {
    return null;
  }

  return (
    <>
      <ControllerStudio
        buttons={buttons}
        axes={axes}
        gameConsole={GameConsole.SWITCH}
        controllerType={controllerType}
        name={name}
        onButtonChange={onButtonChange}
        onAxisChange={onAxisChange}
        onGameConsoleChange={noop}
        onControllerTypeChange={onControllerTypeChange}
        onNameChange={setName}
      />
    </>
  );
};
