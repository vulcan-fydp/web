import { ControllerButton } from "backend-types";
import {
  GamepadButtonTextHints,
  getGamepadButtonText,
} from "./getGamepadButtonText";
import { getMouseButtonText } from "./getMouseButtonText";

export interface ButtonTextHints {
  gamepadHints?: GamepadButtonTextHints;
}

export function getButtonText(
  button: ControllerButton | null,
  hints: ButtonTextHints = {}
): string {
  if (button === null) {
    return "Unset";
  }

  switch (button.__typename) {
    case "ControllerKeyboardButton":
      return `Key ${button.keyCode}`;
    case "ControllerMouseButton":
      return getMouseButtonText(button.buttonNumber);
    case "ControllerGamepadButton":
      return getGamepadButtonText(button.buttonNumber);
  }

  return "Unknown";
}
