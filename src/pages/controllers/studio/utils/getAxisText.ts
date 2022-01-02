import { Axis, ControllerAxis } from "backend-types";
import { exhaustiveSwitch } from "lib/exhaustiveSwitch";
import { getGamepadAxisText } from "./getGamepadAxisText";

export function getAxisText(axis: ControllerAxis | null): string {
  if (axis === null) {
    return "Unset";
  }

  switch (axis.__typename) {
    case "ControllerKeyboardAxis":
      return `${axis.negativeKeyCode} & ${axis.positiveKeyCode}`;
    case "ControllerMouseAxis":
      switch (axis.axis) {
        case Axis.Horizontal:
          return "Mouse left/right";
        case Axis.Vertical:
          return "Mouse up/down";
        default:
          exhaustiveSwitch(axis.axis);
      }
      break;
    case "ControllerGamepadAxis":
      // @todo: Add hints
      return getGamepadAxisText(axis.axisNumber);
  }

  return "Unknown";
}
