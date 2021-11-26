import { ControllerAxis } from "backend-types";

export function getAxisText(axis: ControllerAxis | null): string {
  if (axis === null) {
    return "Unset";
  }

  switch (axis.__typename) {
    case "ControllerKeyboardAxis":
      return `${axis.negativeKeyCode} & ${axis.positiveKeyCode}`;
  }

  return "Unknown";
}
