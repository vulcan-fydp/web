import { ControllerAxis, ControllerButton } from "app/backend-types";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useQueryParam } from "use-query-params";
import { ControllersRouter } from "..";
import {
  axesQueryParam,
  buttonsQueryParam,
  nameQueryParam,
} from "../queryParams";
import { useCreateControllerMutation } from "./createControllerStudio.backend.generated";
import {
  ControllerType,
  INITIAL_CONTROLLER_TYPE,
} from "./enums/controller-type";
import { GameConsole } from "./enums/game-console";
import { ControllerStudio } from "./Studio";
import { toAxisInput, toButtonInput } from "./utils/toInput";

const noop = () => {};

// @todo: Sharing of non-keyboard and mouse controllers will not work because of controllerType
export const CreateControllerStudio = () => {
  const [buttons, setButtons] = useQueryParam(
    buttonsQueryParam.name,
    buttonsQueryParam.config
  );
  const [axes, setAxes] = useQueryParam(
    axesQueryParam.name,
    axesQueryParam.config
  );
  const [name, setName] = useQueryParam(
    nameQueryParam.name,
    nameQueryParam.config
  );
  const [controllerType, setControllerType] = useState(INITIAL_CONTROLLER_TYPE);

  const [createControllerMutation] = useCreateControllerMutation();

  const history = useHistory();

  useEffect(() => {
    if (buttons.length === 0) {
      setButtons(new Array(17).fill(null), "replaceIn");
    }
  }, [buttons, setButtons]);

  useEffect(() => {
    if (axes.length === 0) {
      setAxes(new Array(4).fill(null), "replaceIn");
    }
  }, [axes, setAxes]);

  const onButtonChange = useCallback(
    (buttonNumber: number, button: ControllerButton | null) => {
      setButtons(
        (buttons) => [
          ...buttons.slice(0, buttonNumber),
          button,
          ...buttons.slice(buttonNumber + 1),
        ],
        "replaceIn"
      );
    },
    [setButtons]
  );

  const onAxisChange = useCallback(
    (axisNumber: number, axis: ControllerAxis | null) => {
      setAxes(
        (axes) => [
          ...axes.slice(0, axisNumber),
          axis,
          ...axes.slice(axisNumber + 1),
        ],
        "replaceIn"
      );
    },
    [setAxes]
  );

  const onControllerTypeChange = useCallback(
    (controllerType: ControllerType) => {
      setButtons(new Array(17).fill(null), "replaceIn");
      setAxes(new Array(4).fill(null), "replaceIn");
      setControllerType(controllerType);
    },
    [setButtons, setAxes]
  );

  const onNameChange = useCallback(
    (name) => {
      setName(name, "replaceIn");
    },
    [setName]
  );

  const onCreate = useCallback(async () => {
    const response = await createControllerMutation({
      variables: {
        name: name ?? "",
        buttons: buttons.map(toButtonInput),
        axes: axes.map(toAxisInput),
      },
    });

    switch (response.data?.createController?.__typename) {
      case "Controller":
        history.push(
          ControllersRouter.userController(response.data.createController.id)
        );
        break;
      case "ControllerError":
        break;
      default:
        throw new Error("Unhandled case");
    }
  }, [name, buttons, axes, createControllerMutation, history]);

  const onDiscard = useCallback(() => {
    setButtons([], "replaceIn");
    setAxes([], "replaceIn");
    setName("", "replaceIn");

    setControllerType(INITIAL_CONTROLLER_TYPE);
  }, [setButtons, setAxes, setName, setControllerType]);

  return (
    <>
      <ControllerStudio
        primaryButtonText="Create controller"
        secondaryButtonText="Clear"
        buttons={buttons}
        axes={axes}
        gameConsole={GameConsole.SWITCH}
        controllerType={controllerType}
        name={name ?? ""}
        onButtonChange={onButtonChange}
        onAxisChange={onAxisChange}
        onGameConsoleChange={noop}
        onControllerTypeChange={onControllerTypeChange}
        onNameChange={onNameChange}
        onPrimaryButtonClick={onCreate}
        onSecondaryButtonClick={onDiscard}
      />
    </>
  );
};
