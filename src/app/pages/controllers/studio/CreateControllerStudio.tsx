import { ControllerAxis, ControllerButton } from "app/backend-types";
import { useJsonSearchParam, useStringSearchParam } from "lib/useSearchParam";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [buttons, setButtons] = useJsonSearchParam<(ControllerButton | null)[]>(
    buttonsQueryParam.name
  );
  const [axes, setAxes] = useJsonSearchParam<(ControllerAxis | null)[]>(
    axesQueryParam.name
  );
  const [name, setName] = useStringSearchParam(nameQueryParam.name);
  const [controllerType, setControllerType] = useState(INITIAL_CONTROLLER_TYPE);

  const [createControllerMutation] = useCreateControllerMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (buttons === undefined || buttons.length === 0) {
      setButtons(new Array(17).fill(null));
    }
  }, [buttons, setButtons]);

  useEffect(() => {
    if (axes === undefined || axes.length === 0) {
      setAxes(new Array(4).fill(null));
    }
  }, [axes, setAxes]);

  const onButtonChange = useCallback(
    (buttonNumber: number, button: ControllerButton | null) => {
      if (buttons) {
        setButtons([
          ...buttons.slice(0, buttonNumber),
          button,
          ...buttons.slice(buttonNumber + 1),
        ]);
      }
    },
    [setButtons, buttons]
  );

  const onAxisChange = useCallback(
    (axisNumber: number, axis: ControllerAxis | null) => {
      if (axes) {
        setAxes([
          ...axes.slice(0, axisNumber),
          axis,
          ...axes.slice(axisNumber + 1),
        ]);
      }
    },
    [setAxes, axes]
  );

  const onControllerTypeChange = useCallback(
    (controllerType: ControllerType) => {
      setButtons(new Array(17).fill(null));
      setAxes(new Array(4).fill(null));
      setControllerType(controllerType);
    },
    [setButtons, setAxes]
  );

  const onNameChange = useCallback(
    (name) => {
      setName(name);
    },
    [setName]
  );

  const onCreate = useCallback(async () => {
    const response = await createControllerMutation({
      variables: {
        name: name ?? "",
        buttons: (buttons ?? []).map(toButtonInput),
        axes: (axes ?? []).map(toAxisInput),
      },
    });

    switch (response.data?.createController?.__typename) {
      case "Controller":
        navigate(
          ControllersRouter.userController(response.data.createController.id)
        );
        break;
      case "ControllerError":
        break;
      default:
        throw new Error("Unhandled case");
    }
  }, [name, buttons, axes, createControllerMutation, navigate]);

  const onDiscard = useCallback(() => {
    setButtons([]);
    setAxes([]);
    setName("");

    setControllerType(INITIAL_CONTROLLER_TYPE);
  }, [setButtons, setAxes, setName, setControllerType]);

  return (
    <>
      <ControllerStudio
        primaryButtonText="Create controller"
        secondaryButtonText="Clear"
        buttons={buttons ?? []}
        axes={axes ?? []}
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
