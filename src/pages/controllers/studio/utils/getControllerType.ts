import { Controller, ControllerAxis, ControllerButton } from "backend-types";
import { exhaustiveSwitch } from "lib/exhaustiveSwitch";
import { ControllerType } from "../enums/controller-type";

function getControllerTypeForButton(
  button: ControllerButton | null
): ControllerType | undefined {
  if (button === null) {
    return undefined;
  }

  switch (button.__typename) {
    case "ControllerGamepadButton":
      return ControllerType.GAMEPAD;
    case "ControllerKeyboardButton":
      return ControllerType.KEYBOARD_AND_MOUSE;
    case "ControllerMouseButton":
      return ControllerType.KEYBOARD_AND_MOUSE;
    case "ControllerTouchButton":
      return ControllerType.TOUCH;
    case undefined:
      return undefined;
    default:
      return exhaustiveSwitch(button);
  }
}

function getControllerTypeForAxis(
  axis: ControllerAxis | null
): ControllerType | undefined {
  if (axis === null) {
    return undefined;
  }

  switch (axis.__typename) {
    case "ControllerDragAxis":
      return ControllerType.KEYBOARD_AND_MOUSE;
    case "ControllerGamepadAxis":
      return ControllerType.GAMEPAD;
    case "ControllerKeyboardAxis":
      return ControllerType.KEYBOARD_AND_MOUSE;
    case "ControllerMouseAxis":
      return ControllerType.KEYBOARD_AND_MOUSE;
    case "ControllerTouchJoystickAxis":
      return ControllerType.TOUCH;
    case undefined:
      return undefined;
    default:
      return exhaustiveSwitch(axis);
  }
}

export function getControllerType({
  axes,
  buttons,
}: Controller): ControllerType {
  let controllerType: ControllerType = ControllerType.EMPTY;

  for (let button of buttons) {
    const buttonControllerType = getControllerTypeForButton(button);

    if (buttonControllerType !== undefined) {
      if (controllerType === ControllerType.EMPTY) {
        controllerType = buttonControllerType;
      } else if (buttonControllerType !== controllerType) {
        return ControllerType.MIXED;
      }
    }
  }

  for (let axis of axes) {
    const axisControllerType = getControllerTypeForAxis(axis);

    if (axisControllerType !== undefined) {
      if (controllerType === ControllerType.EMPTY) {
        controllerType = axisControllerType;
      } else if (axisControllerType !== controllerType) {
        return ControllerType.MIXED;
      }
    }
  }

  return controllerType;
}
