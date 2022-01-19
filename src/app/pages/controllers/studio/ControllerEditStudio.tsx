import { ControllerAxis, ControllerButton } from "app/backend-types";
import { ErrorPage } from "app/components/ErrorPage";
import { LoadingPage } from "app/components/LoadingPage";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ControllersRouter } from "..";
import {
  useEditControllerMutation,
  useEditControllerStudioQuery,
} from "./editControllerStudio.backend.generated";
import {
  ControllerType,
  INITIAL_CONTROLLER_TYPE,
} from "./enums/controller-type";
import { GameConsole } from "./enums/game-console";
import { ControllerStudio } from "./Studio";
import { getControllerType } from "./utils/getControllerType";
import { toAxisInput, toButtonInput } from "./utils/toInput";

const noop = () => {};

export const ControllerEditStudio = () => {
  const { controllerId } = useParams<{ controllerId: string }>();

  const { data, loading, error } = useEditControllerStudioQuery({
    variables: {
      controllerId: controllerId!,
    },
  });

  const [editControllerMutation] = useEditControllerMutation();

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

  const onSave = useCallback(async () => {
    await editControllerMutation({
      variables: {
        controllerId: controllerId!,
        name,
        buttons: buttons.map(toButtonInput),
        axes: axes.map(toAxisInput),
      },
    });
  }, [controllerId, name, buttons, axes, editControllerMutation]);

  const onDiscard = useCallback(() => {
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
  }, [setButtons, setAxes, setName, setControllerType, data]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return (
      <ErrorPage message="An error occured loading controller" isTransient />
    );
  }

  if (!data || !data.controller) {
    return (
      <ErrorPage
        message="Could not find controller"
        goBackTo={ControllersRouter.baseRoute()}
        goBackToMessage="controller list"
      />
    );
  }

  return (
    <>
      <ControllerStudio
        primaryButtonText="Save changes"
        secondaryButtonText="Discard changes"
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
        onPrimaryButtonClick={onSave}
        onSecondaryButtonClick={onDiscard}
      />
    </>
  );
};
