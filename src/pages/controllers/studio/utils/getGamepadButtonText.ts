import { GamepadType } from "../enums/gamepad-type";
import Xbox360Gamepad from "../assets/xbox-360-gamepad.json";

export interface GamepadButtonTextHints {
  gamepadType?: GamepadType;
}

export function getGamepadButtonText(
  buttonNumber: number,
  hints: GamepadButtonTextHints = {}
): string {
  return Xbox360Gamepad["buttons"][buttonNumber];
}
