import { GamepadType } from "../enums/gamepad-type";
import Xbox360Gamepad from "../assets/xbox-360-gamepad.json";

export interface GamepadAxisTextHints {
  gamepadType?: GamepadType;
}

export function getGamepadAxisText(
  axisNumber: number,
  hints: GamepadAxisTextHints = {}
): string {
  return Xbox360Gamepad["axes"][axisNumber];
}
