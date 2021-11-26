import { ControllerButton } from "backend-types";
import { getMouseButtonText } from "./getMouseButtonText";

export function getButtonText(button: ControllerButton | null): string {
  if (button === null) {
    return "Unset";
  }

  switch (button.__typename) {
    case "ControllerKeyboardButton":
      return `Key ${button.keyCode}`;
    case "ControllerMouseButton":
      return getMouseButtonText(button.buttonNumber);
  }

  return "Unknown";
}
