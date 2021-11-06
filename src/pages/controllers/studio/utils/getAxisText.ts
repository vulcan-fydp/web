import { ControllerAxis } from "backend-types";

export function getAxisText(axis: ControllerAxis | null): string {
  if (axis === null) {
    return "Unset";
  }

  return "Unknown";
}
