import {
  Axis,
  ControllerAxis,
  ControllerAxisInput,
  ControllerButton,
  ControllerButtonInput,
} from "backend-types";
import { exhaustiveSwitch } from "lib/exhaustiveSwitch";

export function toButtonInput(
  button: ControllerButton | null
): ControllerButtonInput | null {
  if (button === null) {
    return null;
  }

  switch (button.__typename) {
    case "ControllerGamepadButton": {
      const { __typename, ...gamepad } = button;
      return {
        gamepad,
      };
    }
    case "ControllerKeyboardButton": {
      const { __typename, ...keyboard } = button;
      return {
        keyboard,
      };
    }
    case "ControllerMouseButton": {
      const { __typename, ...mouse } = button;
      return {
        mouse,
      };
    }
    case "ControllerTouchButton": {
      const { __typename, ...touch } = button;
      return {
        touch,
      };
    }
    case undefined:
      return null;
    default:
      exhaustiveSwitch(button);
      return null;
  }
}

export function toAxisInput(
  axis: ControllerAxis | null
): ControllerAxisInput | null {
  if (axis === null) {
    return null;
  }

  switch (axis.__typename) {
    case "ControllerDragAxis": {
      const { __typename, ...drag } = axis;
      return {
        drag,
      };
    }
    case "ControllerGamepadAxis": {
      const { __typename, ...gamepad } = axis;
      return {
        gamepad,
      };
    }
    case "ControllerKeyboardAxis": {
      const { __typename, ...keyboard } = axis;
      return {
        keyboard,
      };
    }
    case "ControllerMouseAxis": {
      const { __typename, ...mouse } = axis;
      return {
        mouse,
      };
    }
    case "ControllerTouchJoystickAxis": {
      const { __typename, ...touchJoystick } = axis;
      return {
        touchJoystick: {
          // @todo this shouldn't be hardcoded
          axis: Axis.Horizontal,
          ...touchJoystick,
        },
      };
    }
    case undefined:
      return null;
    default:
      exhaustiveSwitch(axis);
      return null;
  }
}
