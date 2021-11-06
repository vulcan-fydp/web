import { ControllerButton } from "backend-types";

export function getButtonText(button: ControllerButton | null): string {
  if (button === null) {
    return "Unset";
  }

  switch (button.__typename) {
    case "ControllerKeyboardButton":
      return `Key ${button.keyCode}`;
  }

  return "Unknown";
}
