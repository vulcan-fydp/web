import { ControllerAxis, ControllerButton } from "backend-types";
import { useCallback, useEffect, useState } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import {
  useQueryParam,
  JsonParam,
  QueryParamConfig,
  StringParam,
} from "use-query-params";
import { ControllersRouter } from "..";
import { useCreateControllerMutation } from "./createControllerStudio.backend.generated";
import {
  useEditControllerMutation,
  useEditControllerStudioQuery,
} from "./editControllerStudio.backend.generated";
import {
  ControllerType,
  INITIAL_CONTROLLER_TYPE,
  isPseudoControllerType,
} from "./enums/controller-type";
import { GameConsole } from "./enums/game-console";
import { ControllerStudio } from "./Studio";
import { getControllerType } from "./utils/getControllerType";
import { toAxisInput, toButtonInput } from "./utils/toInput";

const noop = () => {};

function TypedJsonParam<T>(): QueryParamConfig<T[]> {
  return {
    encode: (buttons) => JSON.stringify(buttons),
    decode: (buttonsJson) => {
      if (typeof buttonsJson !== "string") {
        return [];
      }

      return JSON.parse(buttonsJson);
    },
  };
}

export const CreateControllerStudio = () => {
  const [buttons, setButtons] = useQueryParam(
    "buttons",
    TypedJsonParam<ControllerButton | null>()
  );
  const [axes, setAxes] = useQueryParam(
    "axes",
    TypedJsonParam<ControllerAxis | null>()
  );
  const [name, setName] = useQueryParam("name", StringParam);
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
      console.log(controllerType);
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

  // if (loading) {
  //   return null;
  // }

  // if (error) {
  //   return null;
  // }

  // if (!data || !data.controller) {
  //   return null;
  // }

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